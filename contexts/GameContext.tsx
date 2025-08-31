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
  getCurrentMultipliers: () => number[]
  currentCashoutValue: number
  setCurrentCashoutValue: (value: number) => void
  animateValueUpdate: (newValue: number) => void
  getNextPotentialValue: () => number
  formatCurrency: (value: number) => string
  showWinAnimation: boolean
  setShowWinAnimation: (show: boolean) => void
  winAnimationAmount: number
  setWinAnimationAmount: (amount: number) => void
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
  const [showWinAnimation, setShowWinAnimation] = useState(false)
  const [winAnimationAmount, setWinAnimationAmount] = useState(0)
  const [isCashingOut, setIsCashingOut] = useState(false)
  
  const multiplierMappings: Record<number, number[]> = {
    2: [1.03, 1.13, 1.23, 1.36, 1.5, 1.67, 1.86],
    3: [1.08, 1.23, 1.42, 1.64, 1.92, 2.25, 2.68],
    4: [1.13, 1.36, 1.64, 2.01, 2.48, 3.1, 3.93],
    5: [1.19, 1.5, 1.92, 2.48, 3.26, 4.34, 5.89],
    6: [1.25, 1.67, 2.25, 3.1, 4.34, 6.2, 9.06],
    7: [1.32, 1.86, 2.68, 3.93, 5.89, 9.06, 14.35],
    8: [1.4, 2.1, 3.21, 5.05, 8.16, 13.59, 23.48],
    9: [1.48, 2.38, 3.9, 6.6, 11.56, 21.01, 39.92],
    10: [1.58, 2.71, 4.8, 8.8, 16.81, 33.62, 70.97],
    11: [1.7, 3.13, 6, 12.01, 25.21, 56.03, 133.06],
    12: [1.83, 3.65, 7.64, 16.81, 39.22, 98.04, 266.12],
    13: [1.98, 4.32, 9.93, 24.28, 63.73, 182.08, 576.6],
    14: [2.16, 5.18, 13.24, 36.42, 109.25, 364.17, 1380],
    15: [2.38, 6.33, 18.21, 57.23, 200.29, 801.17, 3800],
    16: [2.64, 7.92, 26.01, 95.38, 400.58, 2000, 12680],
    17: [2.97, 10.18, 39.02, 171.68, 901.31, 6000, 57080],
    18: [3.39, 13.57, 62.43, 343.36, 2400, 24030, 456660],
    19: [3.96, 19, 109.25, 801.17, 8410, 168240],
    20: [4.75, 28.5, 218.5, 2400, 50470]
  }

  const multiplierValues = multiplierMappings[selectedMines] || multiplierMappings[3]

  useEffect(() => {
    const savedBalance = localStorage.getItem('minesGameBalance')
    if (savedBalance) {
      setBalanceInternal(Number.parseFloat(savedBalance))
    }
  }, [])

  const setBalance = (newBalance: number) => {
    setBalanceInternal(newBalance)
    localStorage.setItem('minesGameBalance', newBalance.toString())
  }

  const deductBet = () => {
    setBalance(balance - betAmount)
  }

  const animateValueUpdate = (newValue: number) => {
    const startValue = currentCashoutValue
    const increment = (newValue - startValue) / 30
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

  const getNextPotentialValue = () => {
    const nextMultiplierIndex = diamondsFound
    const nextMultiplier = multiplierValues[nextMultiplierIndex] || multiplierValues[multiplierValues.length - 1]
    return betAmount * nextMultiplier
  }

  const formatCurrency = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}k`
    }
    return `$${value.toFixed(2)}`
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

  const generateMinePositions = (numMines: number) => {
    const positions = new Set<number>()
    const totalTiles = 25
    
    while (positions.size < numMines) {
      const randomPosition = Math.floor(Math.random() * totalTiles)
      positions.add(randomPosition)
    }
    
    setMinePositions(positions)
  }

  const getTileType = (tileIndex: number): 'diamond' | 'bomb' => {
    return minePositions.has(tileIndex) ? 'bomb' : 'diamond'
  }

  const setTileState = (tileIndex: number, state: 'diamond' | 'bomb') => {
    setTileStatesInternal(prev => ({ ...prev, [tileIndex]: state }))
    
    if (state === 'diamond') {
      const newDiamondsCount = diamondsFound + 1
      setDiamondsFound(newDiamondsCount)
      
      const multiplier = multiplierValues[newDiamondsCount - 1] || multiplierValues[multiplierValues.length - 1]
      const newCashoutValue = betAmount * multiplier
      
      animateValueUpdate(newCashoutValue)
      setWinAmount(newCashoutValue)
      setGameState('cashout')
    } else if (state === 'bomb') {
      setGameState('idle')
      setCurrentCashoutValue(0)
      setDiamondsFound(0)
      
      setBombHitTile(tileIndex)
      
      setTimeout(() => {
        setShowAllTiles(true)
        setTimeout(() => {
          resetGame()
        }, 2500)
      }, 800)
    }
  }

  const cashOut = () => {
    if (isCashingOut) return
    
    setIsCashingOut(true)
    setWinAnimationAmount(currentCashoutValue)
    setShowWinAnimation(true)
    
    setTimeout(() => {
      setBalance(balance + currentCashoutValue)
      setShowWinModal(true)
      setShowAllTiles(true)
      setShowWinAnimation(false)
      
      setTimeout(() => {
        setShowWinModal(false)
        resetGame()
      }, 2500)
    }, 1500)
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
    setShowWinAnimation(false)
    setWinAnimationAmount(0)
    setIsCashingOut(false)
    generateMinePositions(selectedMines)
  }

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
      getCurrentMultipliers: () => multiplierValues,
      currentCashoutValue,
      setCurrentCashoutValue,
      animateValueUpdate,
      getNextPotentialValue,
      formatCurrency,
      showWinAnimation,
      setShowWinAnimation,
      winAnimationAmount,
      setWinAnimationAmount
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