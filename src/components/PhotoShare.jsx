import React, { useState } from 'react'
import './PhotoShare.css'

const GOOGLE_PHOTOS_LINK = 'https://photos.app.goo.gl/zK3q2hRn7skQ7NaA9'

export default function PhotoShare({ dark }) {
  const [copied, setCopied] = useState(false)
  const d = dark ? 'dark' : ''

  const handleOpen = () => {
    window.open(GOOGLE_PHOTOS_LINK, '_blank')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(GOOGLE_PHOTOS_LINK).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section className="photo-section">
      <div className={`photo-card ${d}`}>

        {/* Top ornament */}
        <div className={`photo-ornament-top ${d}`}>
          <div className="photo-line" />
          <span className="photo-diamond">◆</span>
          <div className="photo-line" />
        </div>

        {/* Camera icon */}
        <div className={`photo-icon-wrap ${d}`}>
          <svg viewBox="0 0 48 48" fill="none" className="photo-icon">
            <path d="M18 8l-3 5H8a3 3 0 00-3 3v22a3 3 0 003 3h32a3 3 0 003-3V16a3 3 0 00-3-3h-7l-3-5H18z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="24" cy="26" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="24" cy="26" r="4.5" stroke="currentColor" strokeWidth="1"/>
            <circle cx="37" cy="19" r="1.5" fill="currentColor"/>
          </svg>
        </div>

        {/* Title */}
        <h3 className={`photo-title ${d}`}>Xatirələrinizi Bizimlə Bölüşün</h3>

        {/* Divider */}
        <div className={`photo-div ${d}`}><div className={`photo-diamond-sm ${d}`} /></div>

        {/* Description */}
        <p className={`photo-desc ${d}`}>
          Nişandan çəkdiyiniz <strong>foto</strong> və <strong>videolar</strong>ı
          Google Photos albomuna yükləyin — bu xatirələr həmişəlik bizimlə qalacaq.
        </p>

        <p className={`photo-sub ${d}`}>
          Aşağıdakı düyməyə toxunun, albom açılacaq və
          şəkil/video əlavə edə biləcəksiniz.
        </p>

        {/* Buttons */}
        <div className="photo-btns">
          <button className={`photo-btn-main ${d}`} onClick={handleOpen}>
            <svg viewBox="0 0 24 24" className="gp-icon" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity=".15"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Alboma Şəkil Yüklə
          </button>

          <button className={`photo-btn-copy ${d}`} onClick={handleCopy}>
            {copied ? '✓ Kopyalandı' : '🔗 Linki Kopyala'}
          </button>
        </div>

        {/* Bottom ornament */}
        <div className={`photo-ornament-top ${d}`} style={{ marginTop: 20, marginBottom: 0 }}>
          <div className="photo-line" />
          <span className="photo-diamond">◆</span>
          <div className="photo-line" />
        </div>

      </div>
    </section>
  )
}