"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useAudio, AudioManager } from '../hooks/useAudio'

interface AudioContextType extends AudioManager {
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [volume, setVolumeState] = useState(1)
  const [isMuted, setIsMutedState] = useState(false)
  
  const audioManager = useAudio(volume, isMuted)

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    audioManager.setVolume(newVolume)
  }

  const setMuted = (muted: boolean) => {
    setIsMutedState(muted)
    audioManager.setMuted(muted)
  }

  const value: AudioContextType = {
    ...audioManager,
    setVolume,
    setMuted,
    volume,
    isMuted
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudioContext() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}