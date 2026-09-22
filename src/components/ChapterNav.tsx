import { motion } from 'framer-motion'

export type Chapter = { id: string; short: string; label: string }

export function ChapterNav({ chapters, active }: { chapters: Chapter[]; active: string }) {
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === active))
  return (
    <nav className="chapter-nav" aria-label="Atlas chapters">
      <div className="chapter-track" aria-hidden="true">
        <motion.span
          animate={{ scaleY: (activeIndex + 1) / chapters.length }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id} className={chapter.id === active ? 'is-active' : ''}>
            <a href={`#${chapter.id}`} aria-current={chapter.id === active ? 'step' : undefined}>
              <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="chapter-short">{chapter.short}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
