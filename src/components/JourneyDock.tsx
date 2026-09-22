import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Chapter } from './ChapterNav'

export function JourneyDock({ chapters, active }: { chapters: Chapter[]; active: string }) {
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === active))
  const previous = chapters[activeIndex - 1]
  const next = chapters[activeIndex + 1]

  return (
    <aside className="journey-dock" aria-label="Guided studio route">
      <div className="journey-now" aria-live="polite">
        <span>Now · {String(activeIndex + 1).padStart(2, '0')} of {String(chapters.length).padStart(2, '0')}</span>
        <strong>{chapters[activeIndex].label}</strong>
      </div>

      <ol aria-label="Chapter progress">
        {chapters.map((chapter, index) => (
          <li key={chapter.id} className={index === activeIndex ? 'is-active' : index < activeIndex ? 'is-past' : ''}>
            <a href={`#${chapter.id}`} aria-label={`${index + 1}. ${chapter.label}`} aria-current={index === activeIndex ? 'step' : undefined}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="journey-actions">
        {previous ? <a href={`#${previous.id}`} aria-label={`Previous: ${previous.label}`}><ArrowLeft /></a> : <span aria-hidden="true" />}
        {next ? (
          <a className="journey-next" href={`#${next.id}`}>
            <span>Next</span>{next.short}<ArrowRight />
          </a>
        ) : (
          <a className="journey-next" href="#prologue"><span>Return</span>Beginning<ArrowRight /></a>
        )}
      </div>
    </aside>
  )
}
