import { useEffect, useState } from 'react'

export function useDraft<T>(key: string, initial: T, validate?: (value: unknown) => boolean) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return initial
      const candidate: unknown = JSON.parse(stored)
      if (validate) return validate(candidate) ? candidate as T : initial
      if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return initial
      if (!Object.values(candidate).every((entry) => typeof entry === 'string')) return initial
      return { ...initial, ...candidate } as T
    } catch { return initial }
  })
  const [saved, setSaved] = useState(true)
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); setSaved(true) } catch { setSaved(false) }
  }, [key, value])
  return [value, setValue, saved] as const
}

export function downloadText(text: string, filename: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
