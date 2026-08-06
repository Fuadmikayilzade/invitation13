import React, { useState, useRef, useEffect } from 'react'
import EnvelopeScreen from './components/EnvelopeScreen'
import InviteScreen from './components/InviteScreen'
import './styles/App.css'

export default function App() {
  const [screen, setScreen] = useState('envelope')
  const [transitioning, setTransitioning] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    return () => {
      audioRef.current.pause()
    }
  }, [])

  const toggleMusic = () => {
    if (musicPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setMusicPlaying(!musicPlaying)
  }

  const handleOpen = () => {
    if (transitioning) return
    setTransitioning(true)
    audioRef.current.play().catch(() => {})
    setMusicPlaying(true)
    setTimeout(() => {
      setScreen('invite')
      setTransitioning(false)
    }, 800)
  }

  return (
    <div className={`app-root ${transitioning ? 'fading' : ''}`}>
      {screen === 'envelope' && (
        <EnvelopeScreen onOpen={handleOpen} />
      )}
      {screen === 'invite' && (
        <InviteScreen
          musicPlaying={musicPlaying}
          onToggleMusic={toggleMusic}
        />
      )}
    </div>
  )
}