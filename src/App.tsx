import { ArrowDown, ArrowUpRight, BookOpen, ChevronDown, CirclePause, CirclePlay, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { BridgeLab } from './components/BridgeLab'
import { EvidenceShelf } from './components/EvidenceShelf'
import { FieldReturn } from './components/FieldReturn'
import { InteractionTutorial } from './components/InteractionTutorial'
import { MountainAtlas } from './components/MountainAtlas'
import { PhotoCredit } from './components/PhotoCredit'
import { ReferencesLibrary } from './components/ReferencesLibrary'
import { ValidationLab } from './components/ValidationLab'
import { WaterAtlas } from './components/WaterAtlas'

const chapters = [
  { id: 'tutorial', label: 'Learn the interactions', note: 'Name every action and response' },
  { id: 'evidence', label: 'Meet the evidence', note: 'Look closely at a source' },
  { id: 'water', label: 'Follow the water', note: 'Kunshan, in space and time' },
  { id: 'mountain', label: 'Read the mountain', note: 'Traces of material history' },
  { id: 'bridge', label: 'Build the bridge', note: 'Two places, an open question' },
  { id: 'validate', label: 'Validate the claim', note: 'Check it with someone else' },
  { id: 'return', label: 'Return the question', note: 'Carry it into your project' },
]

function Hero() {
  return (
    <section id="prologue" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Between water<br />&amp; mountains</h1>
        <p className="hero-question">Start in Kunshan. Look toward Mandara. What can a landscape teach us to ask?</p>
        <a className="primary-cta" href="#tutorial">Open the interaction tutorial <ArrowDown aria-hidden="true" /></a>
        <p className="hero-course">An open-data journey for INFOSCI 301</p>
      </div>
      <div className="hero-places">
        <figure className="hero-water">
          <img src="/images/zhouzhuang.webp" alt="Boats, tiled roofs and red lanterns along a canal in Zhouzhuang, Kunshan." width="1280" height="851" fetchPriority="high" />
          <figcaption><span lang="zh-CN">水</span><div><strong>Zhouzhuang</strong><span>Kunshan, China</span></div></figcaption>
        </figure>
        <figure className="hero-mountain">
          <img src="/images/rhumsiki.webp" alt="The rocky peak and surrounding landscape at Rhumsiki in the Mandara region of Cameroon." width="1800" height="475" />
          <figcaption><span lang="zh-CN">山</span><div><strong>Rhumsiki</strong><span>Mandara region, Cameroon</span></div></figcaption>
        </figure>
        <a className="hero-credits" href="#photo-credits">Photographs &amp; credits <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="hero-invitation">
        <p lang="zh-CN">智者乐水，仁者乐山。</p>
        <div><p>A line from the Analects opens our journey.</p><p>We carry a question between these places, while leaving room for what makes each its own.</p></div>
      </div>
    </section>
  )
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState('tutorial')
  const [menuOpen, setMenuOpen] = useState(false)
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const contentsButton = useRef<HTMLButtonElement>(null)

  useEffect(() => { document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off' }, [motionEnabled])
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
      <div className="app-shell">
        <a className="skip-link" href="#tutorial">Skip to interaction tutorial</a>
        <header className="site-header">
          <a className="site-mark" href="#prologue" aria-label="Between Water and Mountains home">
            <strong lang="zh-CN">水山之间</strong><span>Between Water &amp; Mountains</span>
          </a>
          <div className="header-actions">
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
          <Hero />
          <InteractionTutorial motionEnabled={motionEnabled} />
          <EvidenceShelf />
          <WaterAtlas motionEnabled={motionEnabled} />
          <MountainAtlas />
          <BridgeLab />
          <ValidationLab />
          <FieldReturn />
          <ReferencesLibrary />
        </main>
        <footer className="exhibition-footer" id="photo-credits">
          <h2>Every image has an author.</h2>
          <div className="credit-list"><PhotoCredit place="water" /><PhotoCredit place="mountain" /></div>
          <p>These photographs introduce places. They are not records of our fieldwork or images of the excavated sites.</p>
          <div className="footer-close"><span lang="zh-CN">从昆山出发，带着问题回来。</span><a href="#prologue">Back to the beginning <ArrowUpRight aria-hidden="true" /></a></div>
        </footer>
      </div>
    </MotionConfig>
  )
}
