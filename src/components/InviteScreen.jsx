import React, { useState, useEffect, useRef } from 'react'
import { lanternDay, lanternNight, tableSetup, venue } from '../assets'
import VenueSection from './VenueSection'
import './InviteScreen.css'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function InviteScreen({ musicPlaying, onToggleMusic }) {
  const [dark, setDark] = useState(false)
  const [scratchDone, setScratchDone] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const lastPos = useRef(null)
  const totalPx = useRef(0)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollHint(false)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    totalPx.current = canvas.width * canvas.height
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    g.addColorStop(0, '#6b3a1f')
    g.addColorStop(0.5, '#8B5E3C')
    g.addColorStop(1, '#b8943f')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(255,255,255,0.16)'
    ctx.font = 'italic 14px "Cormorant Garamond", serif'
    ctx.textAlign = 'center'
    ctx.fillText('✦  Cızaraq açın  ✦', canvas.width / 2, canvas.height / 2)
  }, [])

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect()
    const t = e.touches ? e.touches[0] : e
    return { x: (t.clientX - r.left) * (canvas.width / r.width), y: (t.clientY - r.top) * (canvas.height / r.height) }
  }

  const draw = (pos) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    if (lastPos.current) ctx.moveTo(lastPos.current.x, lastPos.current.y)
    else ctx.moveTo(pos.x, pos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.lineWidth = 50
    ctx.lineCap = 'round'
    ctx.stroke()
    lastPos.current = pos
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let t = 0
    for (let i = 3; i < d.length; i += 4) if (d[i] < 128) t++
    if (t / totalPx.current > 0.58) setScratchDone(true)
  }

  const startScratch = (e) => {
    e.preventDefault()
    drawing.current = true
    lastPos.current = null
    draw(getPos(e, canvasRef.current))
  }

  const scratch = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    draw(getPos(e, canvasRef.current))
  }

  const stopScratch = () => { drawing.current = false; lastPos.current = null }

  return (
    <div className="invite light">
      {/* Music button */}
      <button className="music-btn" onClick={onToggleMusic}>
        {musicPlaying ? '♪' : '♩'}
      </button>

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="hero-imgs">
          <img src={lanternDay}   alt="" className={`hero-img ${!dark ? 'active' : ''}`} />
          <img src={lanternNight} alt="" className={`hero-img ${dark  ? 'active' : ''}`} />

          {/* Toggle — emoji only */}
          <button className="toggle-btn" onClick={() => setDark(d => !d)}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="hero-text reveal">
          <p className="pre-title">Nişan Dəvətnaməsi</p>
          <h1 className="names">
            <span>Nurlan</span>
            <span className="amp">&amp;</span>
            <span>Türkan</span>
          </h1>
          <div className="g-divider"><div className="g-diamond" /></div>
          <p className="hero-date">30 Avqust 2026 · Bazar günü, saat 19:00</p>
        </div>
      </section>

      {/* Fixed scroll-down indicator — visible until the user starts scrolling */}
      <div className={`scroll-hint ${showScrollHint ? '' : 'hidden'}`} aria-hidden="true">
        <span className="scroll-hint-label">Sürüşdürün</span>
        <div className="scroll-hint-circle">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path d="M12 3v16M12 19l-7-7M12 19l7-7" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── SCRATCH MESSAGE ──────────────────── */}
      <div className="section reveal">
        <p className="sec-label">Bizdən Sizə</p>
        <div className="scratch-wrap">
          <div className="scratch-message">
            <span className="scratch-quote">“</span>
            <p className="scratch-text">
              Sizi böyük məmnuniyyət hissi ilə nişan günümüzün sevincini bizimlə bölüşməyə dəvət edirik
            </p>
            <span className="scratch-quote end">”</span>
          </div>
          <canvas
            ref={canvasRef}
            className={`scratch-canvas ${scratchDone ? 'done' : ''}`}
            onMouseDown={startScratch} onMouseMove={scratch}
            onMouseUp={stopScratch} onMouseLeave={stopScratch}
            onTouchStart={startScratch} onTouchMove={scratch} onTouchEnd={stopScratch}
          />
        </div>
      </div>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── TABLE ────────────────────────────── */}
      <div className="section reveal">
        <p className="sec-label">Ziyafət Məclisi</p>
        <div className="table-wrap">
          <img src={tableSetup} alt="Table" className="table-img" />
          <div className="table-caption">Autumn elegance — qızıl, mis &amp; kakao</div>
        </div>
      </div>

      <div className="ornament reveal">✦ ✦ ✦</div>

      {/* ── VENUE ────────────────────────────── */}
      <div className="reveal">
        <VenueSection venueImg={venue} />
      </div>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="footer reveal">
        <div className="g-divider"><div className="g-diamond" /></div>
        <p className="footer-names">Nurlan &amp; Türkan</p>
        <p className="footer-date">30 · VIII · MMXXVI</p>
        <p className="footer-sub">Sizinlə bu xoşbəxt günü bölüşmək arzusundayıq</p>
      </footer>
    </div>
  )
}