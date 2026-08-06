import React, { useState, useRef, useEffect } from 'react'
import './EnvelopeScreen.css'

export default function EnvelopeScreen({ onOpen }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [tapped, setTapped] = useState(false)

  const handleTap = () => {
    if (ended) return
    if (!playing) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handleEnded = () => {
    setEnded(true)
    setTapped(true)
    setTimeout(() => onOpen(), 900)
  }

  return (
    <div
      className={`env-screen ${tapped ? 'exit' : ''}`}
      onClick={handleTap}
    >
      <div className="env-corner env-tl" />
      <div className="env-corner env-tr" />
      <div className="env-corner env-bl" />
      <div className="env-corner env-br" />

      <video
        ref={videoRef}
        src="/video.mp4"
        playsInline
        muted={false}
        onEnded={handleEnded}
        className="env-video"
      />

      {!playing && (
        <div className="env-hint">
          <span className="env-dot" />
          <span className="env-hint-text">Toxunun</span>
          <span className="env-dot" />
        </div>
      )}
    </div>
  )
}