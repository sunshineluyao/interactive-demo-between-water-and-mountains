export type WaterwayFeature = GeoJSON.Feature<GeoJSON.LineString, {
  osm_id: number
  name: string
  name_en?: string
  waterway: 'river' | 'canal' | 'stream' | string
  source_url: string
}>

export type WaterwayCollection = GeoJSON.FeatureCollection<GeoJSON.LineString, WaterwayFeature['properties']> & {
  metadata: {
    retrieved: string
    source: string
    source_url: string
    license: string
    license_url: string
    attribution: string
    selection: string
    limitations: string
  }
}

export type PrecipitationRecord = {
  year: number
  month: number
  mm_per_day: number
  approx_month_total_mm: number
}

export type PrecipitationData = {
  metadata: {
    title: string
    point: { name: string; latitude: number; longitude: number }
    period: string
    parameter: { units: string; longname: string }
    source: string
    source_model: string[]
    source_url: string
    documentation_url: string
    retrieved: string
    access: string
    limitations: string
  }
  records: PrecipitationRecord[]
  climatology: Array<{ month: number; mean_mm_per_day: number }>
}

export type MandaraData = {
  metadata: {
    title: string
    status: string
    paper_title: string
    authors: string
    paper_url: string
    dataset_url: string
    dataset_doi: string
    download_xlsx: string
    code_url: string
    access: string
    license_statement: string
    coverage: string
    limitations: string
  }
  reported_scale: Record<string, number>
  culture_periods: string[]
  signatures: Array<{ group: string; sites: string; values: number[] }>
  site_642_sequences: Array<{ units: string; sequence: string[] }>
}

export type ValidationStep = {
  id: 'domain' | 'data' | 'idiom' | 'algorithm'
  level: string
  title: string
  question: string
  water: string
  mountain: string
  test: string
  carry: string
}
