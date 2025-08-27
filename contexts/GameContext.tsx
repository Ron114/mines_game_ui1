"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type GameState = 'idle' | 'active' | 'cashout'

interface GameContextType {
  gameState: GameState
  setGameState: (state: GameState) => void
  tileStates: Record<number, 'diamond' | 'bomb' | null>
  setTileState: (tileIndex: number, state: 'diamond' | 'bomb') => void
  loadingTiles: Set<number>
  setTileLoading: (tileIndex: number, isLoading: boolean) => void
  winAmount: number
  setWinAmount: (amount: number) => void
  resetGame: () => void
  cashOut: () => void
  showWinModal: boolean
  setShowWinModal: (show: boolean) => void
  selectedMines: number
  setSelectedMines: (mines: number) => void
  minePositions: Set<number>
  getTileType: (tileIndex: number) => 'diamond' | 'bomb'
  startNewGame: () => void
  balance: number
  setBalance: (balance: number) => void
  betAmount: number
  setBetAmount: (amount: number) => void
  deductBet: () => void
  showAllTiles: boolean
  setShowAllTiles: (show: boolean) => void
  bombHitTile: number | null
  setBombHitTile: (tile: number | null) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [tileStates, setTileStatesInternal] = useState<Record<number, 'diamond' | 'bomb' | null>>({})
  const [loadingTiles, setLoadingTilesInternal] = useState<Set<number>>(new Set())
  const [winAmount, setWinAmount] = useState(0)
  const [showWinModal, setShowWinModal] = useState(false)
  const [selectedMines, setSelectedMines] = useState(3)
  const [minePositions, setMinePositions] = useState<Set<number>>(new Set())
  const [balance, setBalanceInternal] = useState(1000)
  const [betAmount, setBetAmount] = useState(100)
  const [showAllTiles, setShowAllTiles] = useState(false)
  const [bombHitTile, setBombHitTile] = useState<number | null>(null)

  // Load balance from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('minesGameBalance')
    if (savedBalance) {
      setBalanceInternal(Number.parseFloat(savedBalance))
    }
  }, [])

  // Save balance to localStorage whenever it changes
  const setBalance = (newBalance: number) => {
    setBalanceInternal(newBalance)
    localStorage.setItem('minesGameBalance', newBalance.toString())
  }

  // Deduct bet amount from balance
  const deductBet = () => {
    setBalance(balance - betAmount)
  }

  const setTileLoading = (tileIndex: number, isLoading: boolean) => {
    setLoadingTilesInternal(prev => {
      const newSet = new Set(prev)
      if (isLoading) {
        newSet.add(tileIndex)
      } else {
        newSet.delete(tileIndex)
      }
      return newSet
    })
  }

  // Generate random mine positions when game starts
  const generateMinePositions = (numMines: number) => {
    const positions = new Set<number>()
    const totalTiles = 25
    
    while (positions.size < numMines) {
      const randomPosition = Math.floor(Math.random() * totalTiles)
      positions.add(randomPosition)
    }
    
    setMinePositions(positions)
  }

  // Get tile type based on mine positions
  const getTileType = (tileIndex: number): 'diamond' | 'bomb' => {
    return minePositions.has(tileIndex) ? 'bomb' : 'diamond'
  }

  const setTileState = (tileIndex: number, state: 'diamond' | 'bomb') => {
    setTileStatesInternal(prev => ({ ...prev, [tileIndex]: state }))
    
    // If it's a diamond, set to cashout state with win amount
    if (state === 'diamond') {
      setWinAmount(108.00) // Example win amount
      setGameState('cashout')
    } else if (state === 'bomb') {
      // When bomb is hit, reveal all tiles after explosion
      setBombHitTile(tileIndex)
      setTimeout(() => {
        setShowAllTiles(true)
        // Auto reset after 2 seconds
        setTimeout(() => {
          resetGame()
        }, 2000)
      }, 800) // Wait for explosion animation
    }
  }

  const cashOut = () => {
    setShowWinModal(true)
  }

  const resetGame = () => {
    setGameState('idle')
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setWinAmount(0)
    setShowWinModal(false)
    setShowAllTiles(false)
    setBombHitTile(null)
    // Generate new mine positions for next game
    generateMinePositions(selectedMines)
  }

  // Generate initial mine positions when selectedMines changes or on first load
  const startNewGame = () => {
    generateMinePositions(selectedMines)
    setGameState('active')
  }

  return (
    <GameContext.Provider value={{
      gameState,
      setGameState,
      tileStates,
      setTileState,
      loadingTiles,
      setTileLoading,
      winAmount,
      setWinAmount,
      resetGame,
      cashOut,
      showWinModal,
      setShowWinModal,
      selectedMines,
      setSelectedMines,
      minePositions,
      getTileType,
      startNewGame,
      balance,
      setBalance,
      betAmount,
      setBetAmount,
      deductBet,
      showAllTiles,
      setShowAllTiles,
      bombHitTile,
      setBombHitTile
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