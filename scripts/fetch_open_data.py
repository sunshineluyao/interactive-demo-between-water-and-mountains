#!/usr/bin/env python3
"""Refresh the two bundled open-data snapshots used by the atlas.

The script intentionally keeps source-specific licenses separate:
OpenStreetMap waterways remain ODbL; NASA POWER metadata is preserved
with the point time series. No Mandara rows are synthesized here.
"""

from __future__ import annotations

import calendar
import json
import math
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

USER_AGENT = "INFOSCI301-Between-Water-and-Mountains/1.0 (teaching demo)"


def request_json(url: str, data: bytes | None = None) -> dict:
    request = urllib.request.Request(
        url,
        data=data,
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.load(response)


def line_score(geometry: list[dict]) -> float:
    score = 0.0
    for start, end in zip(geometry, geometry[1:]):
        dx = (end["lon"] - start["lon"]) * math.cos(math.radians(start["lat"]))
        dy = end["lat"] - start["lat"]
        score += math.hypot(dx, dy)
    return score


def simplify(points: list[list[float]], tolerance: float = 0.00012) -> list[list[float]]:
    """Small Ramer–Douglas–Peucker simplifier for browser-friendly GeoJSON."""
    if len(points) <= 2:
        return points

    first, last = points[0], points[-1]
    dx, dy = last[0] - first[0], last[1] - first[1]
    denominator = dx * dx + dy * dy
    max_distance, index = 0.0, 0
    for i, point in enumerate(points[1:-1], start=1):
        if denominator == 0:
            distance = math.hypot(point[0] - first[0], point[1] - first[1])
        else:
            t = max(0.0, min(1.0, ((point[0] - first[0]) * dx + (point[1] - first[1]) * dy) / denominator))
            projection = [first[0] + t * dx, first[1] + t * dy]
            distance = math.hypot(point[0] - projection[0], point[1] - projection[1])
        if distance > max_distance:
            index, max_distance = i, distance

    if max_distance > tolerance:
        left = simplify(points[: index + 1], tolerance)
        right = simplify(points[index:], tolerance)
        return left[:-1] + right
    return [first, last]


def fetch_osm() -> None:
    bbox = "31.08,120.78,31.43,121.10"
    query = f'[out:json][timeout:90];way["waterway"~"river|canal|stream"]({bbox});out tags geom;'
    endpoints = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
    ]
    last_error: Exception | None = None
    payload = urllib.parse.urlencode({"data": query}).encode()
    for endpoint in endpoints:
        try:
            raw = request_json(endpoint, data=payload)
            break
        except Exception as exc:  # pragma: no cover - network fallback
            last_error = exc
    else:
        raise RuntimeError(f"All Overpass endpoints failed: {last_error}")

    ways = [element for element in raw["elements"] if len(element.get("geometry", [])) > 1]
    ways.sort(
        key=lambda element: (
            bool(element.get("tags", {}).get("name")),
            element.get("tags", {}).get("waterway") == "river",
            line_score(element["geometry"]),
        ),
        reverse=True,
    )
    selected = ways[:420]
    features = []
    for element in selected:
        tags = element.get("tags", {})
        coordinates = simplify([[point["lon"], point["lat"]] for point in element["geometry"]])
        features.append(
            {
                "type": "Feature",
                "id": f"way/{element['id']}",
                "properties": {
                    "osm_id": element["id"],
                    "name": tags.get("name") or tags.get("name:zh") or "Unnamed waterway",
                    "name_en": tags.get("name:en"),
                    "waterway": tags.get("waterway", "waterway"),
                    "source_url": f"https://www.openstreetmap.org/way/{element['id']}",
                },
                "geometry": {"type": "LineString", "coordinates": coordinates},
            }
        )

    geojson = {
        "type": "FeatureCollection",
        "name": "Kunshan-area waterways teaching snapshot",
        "bbox": [120.78, 31.08, 121.10, 31.43],
        "metadata": {
            "retrieved": date.today().isoformat(),
            "source": "OpenStreetMap contributors via Overpass API",
            "source_url": "https://www.openstreetmap.org/",
            "query_bbox_south_west_north_east": bbox,
            "license": "Open Data Commons Open Database License (ODbL) 1.0",
            "license_url": "https://opendatacommons.org/licenses/odbl/1-0/",
            "attribution": "© OpenStreetMap contributors",
            "selection": "Named, river-class, and longest ways prioritized; 420 ways retained and geometry simplified.",
            "limitations": "A volunteered geographic-information snapshot; completeness and tagging vary. It is not a water-quality or hydrological-flow dataset.",
        },
        "features": features,
    }
    (DATA_DIR / "kunshan-waterways.geojson").write_text(
        json.dumps(geojson, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
    )


def fetch_nasa_power() -> None:
    point = {"name": "Kunshan", "latitude": 31.39, "longitude": 120.98}
    params = {
        "parameters": "PRECTOTCORR",
        "community": "AG",
        "longitude": point["longitude"],
        "latitude": point["latitude"],
        "start": 2001,
        "end": 2025,
        "format": "JSON",
    }
    source_url = "https://power.larc.nasa.gov/api/temporal/monthly/point?" + urllib.parse.urlencode(params)
    raw = request_json(source_url)
    values = raw["properties"]["parameter"]["PRECTOTCORR"]
    records = []
    for key, value in values.items():
        year, month = int(key[:4]), int(key[4:])
        if not 1 <= month <= 12 or value == raw["header"]["fill_value"]:
            continue
        records.append(
            {
                "year": year,
                "month": month,
                "mm_per_day": value,
                "approx_month_total_mm": round(value * calendar.monthrange(year, month)[1], 2),
            }
        )

    climatology = []
    for month in range(1, 13):
        month_values = [record["mm_per_day"] for record in records if record["month"] == month]
        climatology.append(
            {
                "month": month,
                "mean_mm_per_day": round(sum(month_values) / len(month_values), 3),
            }
        )

    output = {
        "metadata": {
            "title": "Kunshan monthly corrected precipitation",
            "point": point,
            "period": "2001–2025",
            "parameter": raw["parameters"]["PRECTOTCORR"],
            "source": "NASA POWER",
            "source_model": raw["header"]["sources"],
            "source_url": source_url,
            "documentation_url": "https://power.larc.nasa.gov/docs/services/api/temporal/monthly/",
            "retrieved": date.today().isoformat(),
            "access": "Free, globally available climate data via NASA POWER API",
            "limitations": "MERRA-2-derived monthly values at source resolution; this point series is not a gauge, flood record, or water-quality measure.",
        },
        "records": records,
        "climatology": climatology,
    }
    (DATA_DIR / "kunshan-precipitation.json").write_text(
        json.dumps(output, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
    )


if __name__ == "__main__":
    fetch_osm()
    fetch_nasa_power()
    print("Refreshed Kunshan waterways and precipitation snapshots.")
