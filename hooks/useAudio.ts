import { useRef, useCallback } from 'react'

export interface AudioManager {
  playSound: (soundPath: string) => void
  setMuted: (muted: boolean) => void
  setVolume: (volume: number) => void
  isMuted: boolean
  volume: number
}

export function useAudio(initialVolume: number = 1, initialMuted: boolean = false) {
  const volumeRef = useRef(initialVolume)
  const mutedRef = useRef(initialMuted)
  const audioContextRef = useRef<{ [key: string]: HTMLAudioElement }>({})

  const playSound = useCallback((soundPath: string) => {
    if (mutedRef.current || volumeRef.current === 0) return

    try {
      if (!audioContextRef.current[soundPath]) {
        audioContextRef.current[soundPath] = new Audio(soundPath)
        audioContextRef.current[soundPath].preload = 'auto'
      }

      const audio = audioContextRef.current[soundPath]
      audio.volume = volumeRef.current
      audio.currentTime = 0
      audio.play().catch(() => {})
    } catch (error) {
      console.warn('Audio playback failed:', error)
    }
  }, [])

  const setMuted = useCallback((muted: boolean) => {
    mutedRef.current = muted
  }, [])

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = Math.max(0, Math.min(1, volume))
  }, [])

  return {
    playSound,
    setMuted,
    setVolume,
    get isMuted() { return mutedRef.current },
    get volume() { return volumeRef.current }
  }
}