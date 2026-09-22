export async function readData<T>(path: string): Promise<T> {
  const embedded = (window as unknown as { __ATLAS_SNAPSHOTS__?: Record<string, unknown> }).__ATLAS_SNAPSHOTS__
  if (embedded?.[path]) return embedded[path] as T
  const response = await fetch(path)
  if (!response.ok) throw new Error(`Could not load the teaching snapshot (${response.status}).`)
  return response.json() as Promise<T>
}
