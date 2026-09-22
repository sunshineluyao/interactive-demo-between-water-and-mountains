import { ArrowDown, ArrowUpRight, BookOpen, ChevronDown, CirclePause, CirclePlay, Languages, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { BridgeLab } from './components/BridgeLab'
import { EvidenceShelf } from './components/EvidenceShelf'
import { FieldReturn } from './components/FieldReturn'
import { GlobalOrientation } from './components/GlobalOrientation'
import { InteractionTutorial } from './components/InteractionTutorial'
import { MountainAtlas } from './components/MountainAtlas'
import { PhotoCredit } from './components/PhotoCredit'
import { QuestionLensIntro } from './components/QuestionLensIntro'
import { ReferencesLibrary } from './components/ReferencesLibrary'
import { ValidationLab } from './components/ValidationLab'
import { WaterAtlas } from './components/WaterAtlas'
import { communityQuestionLenses, type QuestionLensId } from './lib/communityQuestions'
import { usePageTranslation, type LanguageMode } from './lib/i18n'

const chapters = [
  { id: 'orientation', label: 'Orient the journey', note: 'Locate both places and their sources' },
  { id: 'questions', label: 'Choose a question', note: 'Begin with community, not controls' },
  { id: 'tutorial', label: 'Learn the interactions', note: 'Name every action and response' },
  { id: 'evidence', label: 'Meet the evidence', note: 'Look closely at a source' },
  { id: 'water', label: 'Follow the water', note: 'Kunshan, in space and time' },
  { id: 'mountain', label: 'Read the mountain', note: 'Traces of material history' },
  { id: 'bridge', label: 'Build the bridge', note: 'Two places, an open question' },
  { id: 'validate', label: 'Validate the claim', note: 'Check it with someone else' },
  { id: 'return', label: 'Return the question', note: 'Carry it into your project' },
]

export default function App() {
  const appRoot = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState('orientation')
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<LanguageMode>(() => {
    try {
      const stored = localStorage.getItem('atlas-language-v1') as LanguageMode | null
      return stored === 'en' || stored === 'zh' || stored === 'bilingual' ? stored : 'bilingual'
    } catch { return 'bilingual' }
  })
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [activeLens, setActiveLens] = useState<QuestionLensId>(() => {
    try {
      const stored = localStorage.getItem('atlas-question-lens-v1') as QuestionLensId | null
      return communityQuestionLenses.some((lens) => lens.id === stored) ? stored as QuestionLensId : 'movement'
    } catch { return 'movement' }
  })
  const contentsButton = useRef<HTMLButtonElement>(null)

  usePageTranslation(appRoot, language)
  useEffect(() => { document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off' }, [motionEnabled])
  useEffect(() => { try { localStorage.setItem('atlas-language-v1', language) } catch { /* storage is optional */ } }, [language])
  useEffect(() => { try { localStorage.setItem('atlas-question-lens-v1', activeLens) } catch { /* storage is optional */ } }, [activeLens])
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = () => { if (preference.matches) setMotionEnabled(false) }
    preference.addEventListener('change', listener)
    return () => preference.removeEventListener('change', listener)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveChapter(entry.target.id)
    }, { rootMargin: '-20% 0px -60% 0px' })
    document.querySelectorAll('[data-chapter]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion={motionEnabled ? 'user' : 'always'} transition={{ duration: motionEnabled ? 0.24 : 0 }}>
      <div ref={appRoot} key={language} className={`app-shell language-${language}`}>
        <a className="skip-link" href="#questions">Skip to community questions</a>
        <header className="site-header">
          <a className="site-mark" href="#orientation" aria-label="Between Water and Mountains home">
            <strong lang="zh-CN">水山之间</strong><span>Between Water &amp; Mountains</span>
          </a>
          <div className="header-actions">
            <div className="language-control" role="group" aria-label="Language / 语言" data-no-translate>
              <Languages aria-hidden="true" />
              <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
              <button type="button" aria-pressed={language === 'bilingual'} onClick={() => setLanguage('bilingual')}>双语</button>
              <button type="button" aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>中文</button>
            </div>
            <a className="tutorial-shortcut" href="#tutorial">Tutorial</a>
            <button className="motion-control" type="button" aria-label={motionEnabled ? 'Pause motion' : 'Enable motion'} onClick={() => setMotionEnabled((value) => !value)} aria-pressed={!motionEnabled}>
              {motionEnabled ? <CirclePause aria-hidden="true" /> : <CirclePlay aria-hidden="true" />}
              <span>{motionEnabled ? 'Pause motion' : 'Enable motion'}</span>
            </button>
            <button ref={contentsButton} className="contents-trigger" type="button" aria-expanded={menuOpen} aria-controls="chapter-contents" onClick={() => setMenuOpen((value) => !value)}>
              Explore {menuOpen ? <X aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
            </button>
          </div>
          {menuOpen && (
            <nav id="chapter-contents" className="contents-menu" aria-label="Chapters" onKeyDown={(event) => {
              if (event.key === 'Escape') { setMenuOpen(false); contentsButton.current?.focus() }
            }}>
              {chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={chapter.id === activeChapter ? 'location' : undefined} onClick={() => setMenuOpen(false)}><strong>{chapter.label}</strong><span>{chapter.note}</span><ArrowDown aria-hidden="true" /></a>)}
              <a href="#references" onClick={() => setMenuOpen(false)}><BookOpen aria-hidden="true" />Full references &amp; credits</a>
            </nav>
          )}
        </header>
        <main>
          <GlobalOrientation motionEnabled={motionEnabled} />
          <QuestionLensIntro activeLens={activeLens} onChange={setActiveLens} />
          <InteractionTutorial motionEnabled={motionEnabled} activeLens={activeLens} />
          <EvidenceShelf />
          <WaterAtlas motionEnabled={motionEnabled} />
          <MountainAtlas />
          <BridgeLab activeLens={activeLens} onChangeLens={setActiveLens} />
          <ValidationLab />
          <FieldReturn activeLens={activeLens} />
          <ReferencesLibrary />
        </main>
        <footer className="exhibition-footer" id="photo-credits">
          <h2>Every image has an author.</h2>
          <div className="credit-list"><PhotoCredit place="water" /><PhotoCredit place="mountain" /></div>
          <p>These photographs introduce places. They are not records of our fieldwork or images of the excavated sites.</p>
          <div className="footer-close"><span lang="zh-CN">从昆山出发，带着问题回来。</span><a href="#orientation">Back to the beginning <ArrowUpRight aria-hidden="true" /></a></div>
        </footer>
      </div>
    </MotionConfig>
  )
}
