"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type GameState = 'idle' | 'active' | 'cashout'

interface GameContextType {
  gameState: GameState
  setGameState: (state: GameState) => void
  tileStates: Record<number, 'diamond' | 'bomb' | null>
  setTileState: (tileIndex: number, state: 'diamond' | 'bomb') => void
  winAmount: number
  setWinAmount: (amount: number) => void
  resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [tileStates, setTileStatesInternal] = useState<Record<number, 'diamond' | 'bomb' | null>>({})
  const [winAmount, setWinAmount] = useState(0)

  const setTileState = (tileIndex: number, state: 'diamond' | 'bomb') => {
    setTileStatesInternal(prev => ({ ...prev, [tileIndex]: state }))
    
    // If it's a diamond, set to cashout state with win amount
    if (state === 'diamond') {
      setWinAmount(108.00) // Example win amount
      setGameState('cashout')
    }
  }

  const resetGame = () => {
    setGameState('idle')
    setTileStatesInternal({})
    setWinAmount(0)
  }

  return (
    <GameContext.Provider value={{
      gameState,
      setGameState,
      tileStates,
      setTileState,
      winAmount,
      setWinAmount,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}