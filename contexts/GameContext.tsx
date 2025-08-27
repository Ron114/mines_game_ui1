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
  diamondsFound: number
  multiplierValues: number[]
  currentCashoutValue: number
  setCurrentCashoutValue: (value: number) => void
  animateValueUpdate: (newValue: number) => void
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
  const [betAmount, setBetAmount] = useState(1)
  const [showAllTiles, setShowAllTiles] = useState(false)
  const [bombHitTile, setBombHitTile] = useState<number | null>(null)
  const [diamondsFound, setDiamondsFound] = useState(0)
  const [currentCashoutValue, setCurrentCashoutValue] = useState(0)
  
  // Multiplier progression based on diamonds found
  const multiplierValues = [1.8, 2.4, 3.2, 4.5, 5.8, 6.9, 7.5, 9.2, 11.5, 14.8, 18.9, 24.2, 31.8, 42.3, 58.7, 82.4, 118.6, 174.3, 261.5, 402.7, 645.2, 1085.3, 1953.6, 3906.2]

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

  // Animate cashout value update
  const animateValueUpdate = (newValue: number) => {
    const startValue = currentCashoutValue
    const increment = (newValue - startValue) / 30 // 30 steps for smooth animation
    let step = 0
    
    const animate = () => {
      if (step <= 30) {
        const currentValue = startValue + (increment * step)
        setCurrentCashoutValue(currentValue)
        step++
        requestAnimationFrame(animate)
      } else {
        setCurrentCashoutValue(newValue)
      }
    }
    
    animate()
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
    
    // If it's a diamond, calculate new multiplier and update cashout value
    if (state === 'diamond') {
      const newDiamondsCount = diamondsFound + 1
      setDiamondsFound(newDiamondsCount)
      
      // Calculate new cashout value based on bet amount and current multiplier
      const multiplier = multiplierValues[newDiamondsCount - 1] || multiplierValues[multiplierValues.length - 1]
      const newCashoutValue = betAmount * multiplier
      
      // Animate the value update
      animateValueUpdate(newCashoutValue)
      setWinAmount(newCashoutValue)
      setGameState('cashout')
    } else if (state === 'bomb') {
      // When bomb is hit, immediately reset game state and button
      setGameState('idle')
      setCurrentCashoutValue(0)
      setDiamondsFound(0)
      
      // Set bomb hit tile for explosion animation
      setBombHitTile(tileIndex)
      
      // Show all tiles after explosion animation (visual only)
      setTimeout(() => {
        setShowAllTiles(true)
        // Auto reset after 2.5 seconds 
        setTimeout(() => {
          resetGame()
        }, 2500)
      }, 800) // Wait for explosion animation
    }
  }

  const cashOut = () => {
    // Add winnings to balance
    setBalance(balance + currentCashoutValue)
    setShowWinModal(true)
    
    // Auto-close modal and reset game after 2.5 seconds
    setTimeout(() => {
      setShowWinModal(false)
      resetGame()
    }, 2500)
  }

  const resetGame = () => {
    setGameState('idle')
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setWinAmount(0)
    setShowWinModal(false)
    setShowAllTiles(false)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
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
      setBombHitTile,
      diamondsFound,
      multiplierValues,
      currentCashoutValue,
      setCurrentCashoutValue,
      animateValueUpdate
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