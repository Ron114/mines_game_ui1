"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type GameState = 'idle' | 'active' | 'cashout'

interface AutoPlayConfig {
  numberOfRounds: number
  onWinMode: 'reset' | 'increase'
  onWinAmount: number
  onLossMode: 'reset' | 'increase'
  onLossAmount: number
  stopAtAnyWin: boolean
}

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
  isDimmingCheckout: boolean
  setIsDimmingCheckout: (dimming: boolean) => void
  clearAllAnimations: () => void
  clearCashOutTimers: () => void
  
  // Auto-play functionality
  isAutoPlaying: boolean
  setIsAutoPlaying: (playing: boolean) => void
  autoPlayConfig: AutoPlayConfig
  setAutoPlayConfig: (config: AutoPlayConfig) => void
  selectedTilesForAuto: Set<number>
  setSelectedTilesForAuto: (tiles: Set<number>) => void
  currentRound: number
  setCurrentRound: (round: number) => void
  autoPlayTimers: NodeJS.Timeout[]
  setAutoPlayTimers: (timers: NodeJS.Timeout[]) => void
  clearAutoPlayTimers: () => void
  startAutoPlay: () => void
  stopAutoPlay: () => void
  resetAutoPlayState: () => void
  isAutoMode: boolean
  setIsAutoMode: (auto: boolean) => void
  toggleTileForAutoPlay: (tileIndex: number) => void
  executeAutoPlayRound: () => void
  updateBetAfterResult: (won: boolean) => void
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
  const [isDimmingCheckout, setIsDimmingCheckout] = useState(false)
  const [cashOutTimers, setCashOutTimers] = useState<NodeJS.Timeout[]>([])
  
  // Auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [autoPlayConfig, setAutoPlayConfig] = useState<AutoPlayConfig>({
    numberOfRounds: 0,
    onWinMode: 'reset',
    onWinAmount: 0,
    onLossMode: 'reset', 
    onLossAmount: 0,
    stopAtAnyWin: false
  })
  const [selectedTilesForAuto, setSelectedTilesForAuto] = useState<Set<number>>(new Set())
  const [currentRound, setCurrentRound] = useState(0)
  const [autoPlayTimers, setAutoPlayTimers] = useState<NodeJS.Timeout[]>([])
  const [isAutoMode, setIsAutoMode] = useState(false)
  
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

  const clearCashOutTimers = () => {
    cashOutTimers.forEach(timer => clearTimeout(timer))
    setCashOutTimers([])
  }
  
  const clearAutoPlayTimers = () => {
    autoPlayTimers.forEach(timer => clearTimeout(timer))
    setAutoPlayTimers([])
  }
  
  const resetAutoPlayState = () => {
    clearAutoPlayTimers()
    setIsAutoPlaying(false)
    setCurrentRound(0)
    setSelectedTilesForAuto(new Set())
  }
  
  const toggleTileForAutoPlay = (tileIndex: number) => {
    if (!isAutoMode || gameState !== 'idle') return
    
    setSelectedTilesForAuto(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tileIndex)) {
        newSet.delete(tileIndex)
      } else {
        newSet.add(tileIndex)
      }
      return newSet
    })
  }
  
  const updateBetAfterResult = (won: boolean) => {
    const config = autoPlayConfig
    let newBetAmount = betAmount
    
    if (won && config.onWinMode === 'increase') {
      newBetAmount = betAmount + (betAmount * config.onWinAmount / 100)
    } else if (won && config.onWinMode === 'reset') {
      newBetAmount = 1
    } else if (!won && config.onLossMode === 'increase') {
      newBetAmount = betAmount + (betAmount * config.onLossAmount / 100)
    } else if (!won && config.onLossMode === 'reset') {
      newBetAmount = 1
    }
    
    setBetAmount(Math.max(0.01, Math.min(newBetAmount, balance)))
  }
  
  const executeAutoPlayRound = () => {
    if (selectedTilesForAuto.size === 0) {
      stopAutoPlay()
      return
    }
    
    if (balance < betAmount) {
      stopAutoPlay()
      return
    }
    
    // Clean all tiles and start fresh round
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setShowAllTiles(false)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAmount(0)
    setShowWinModal(false)
    setShowWinAnimation(false)
    generateMinePositions(selectedMines)
    setGameState('active')
    deductBet()
    
    const tilesToClick = Array.from(selectedTilesForAuto)
    let hasBomb = false
    let bombTileIndex = -1
    
    // Check all selected tiles for bombs
    for (const tileIndex of tilesToClick) {
      const result = getTileType(tileIndex)
      if (result === 'bomb') {
        hasBomb = true
        bombTileIndex = tileIndex
        break
      }
    }
    
    // Small delay then reveal all tiles at once (no loading animation)
    setTimeout(() => {
      // Reveal all selected tiles at once
      tilesToClick.forEach(tileIndex => {
        const result = getTileType(tileIndex)
        setTileState(tileIndex, result)
      })
      
      if (hasBomb) {
        // If there's a bomb, update bet for loss
        updateBetAfterResult(false)
        
        // Set bomb hit tile for animation
        setBombHitTile(bombTileIndex)
        
        // Show all tiles after bomb animation
        setTimeout(() => {
          setShowAllTiles(true)
          
          // Reset and continue to next round
          const nextRoundTimer = setTimeout(() => {
            console.log('💥 Bomb: Checking next round', { 
              isAutoPlaying, 
              currentRound, 
              numberOfRounds: autoPlayConfig.numberOfRounds,
              balance,
              betAmount
            })
            
            // Don't call resetGame() here as it might affect isAutoPlaying state
            // Instead, do a targeted reset
            setTileStatesInternal({})
            setLoadingTilesInternal(new Set())
            setShowAllTiles(false)
            setBombHitTile(null)
            setDiamondsFound(0)
            setCurrentCashoutValue(0)
            setWinAmount(0)
            setShowWinModal(false)
            setShowWinAnimation(false)
            generateMinePositions(selectedMines)
            setGameState('idle')
            const nextRound = currentRound + 1
            setCurrentRound(nextRound)
            
            // Continue if: infinity mode (numberOfRounds = 0) OR haven't reached the limit
            const shouldContinue = autoPlayConfig.numberOfRounds === 0 || nextRound < autoPlayConfig.numberOfRounds
            
            console.log('🔄 Bomb: Should continue?', { 
              shouldContinue, 
              nextRound, 
              hasBalance: balance >= betAmount 
            })
            
            if (shouldContinue && balance >= betAmount) {
              console.log('✅ Bomb: Continuing to next round')
              executeAutoPlayRound()
            } else {
              console.log('❌ Bomb: Stopping - no more rounds or insufficient balance')
              stopAutoPlay()
            }
          }, 2000)
          
          setAutoPlayTimers(prev => [...prev, nextRoundTimer])
        }, 800)
      } else {
        // All tiles are diamonds - win!
        updateBetAfterResult(true)
        
        // Calculate win amount
        const multiplier = multiplierValues[tilesToClick.length - 1] || multiplierValues[0]
        const winAmount = betAmount * multiplier
        
        // Update balance, show win modal and win animation all at same time
        setBalance(balance + winAmount)
        setCurrentCashoutValue(winAmount)
        setWinAmount(winAmount)
        setShowWinModal(true)
        setShowAllTiles(true) // Show all tiles at same time as modal
        
        // Show win amount animation (green text rising)
        setWinAnimationAmount(winAmount)
        setShowWinAnimation(true)
        
        // Hide win animation after its duration
        const winAnimTimer = setTimeout(() => {
          setShowWinAnimation(false)
        }, 2700)
        setAutoPlayTimers(prev => [...prev, winAnimTimer])
        
        // Hide modal and continue to next round
        const modalTimer = setTimeout(() => {
          setShowWinModal(false)
        }, 2500)
        setAutoPlayTimers(prev => [...prev, modalTimer])
        
        // Schedule next round
        const nextRoundTimer = setTimeout(() => {
          console.log('🔄 Win: Checking next round', { 
            isAutoPlaying, 
            currentRound, 
            numberOfRounds: autoPlayConfig.numberOfRounds,
            stopAtAnyWin: autoPlayConfig.stopAtAnyWin,
            balance,
            betAmount
          })
          
          // Don't call resetGame() here as it might affect isAutoPlaying state
          // Instead, do a targeted reset
          setTileStatesInternal({})
          setLoadingTilesInternal(new Set())
          setShowAllTiles(false)
          setBombHitTile(null)
          setDiamondsFound(0)
          setCurrentCashoutValue(0)
          setWinAmount(0)
          setShowWinModal(false)
          setShowWinAnimation(false)
          generateMinePositions(selectedMines)
          setGameState('idle')
          
          // Check if should stop on win
          if (autoPlayConfig.stopAtAnyWin) {
            console.log('❌ Win: Stopping - stopAtAnyWin is enabled')
            stopAutoPlay()
            return
          }
          
          const nextRound = currentRound + 1
          setCurrentRound(nextRound)
          
          // Continue if: infinity mode (numberOfRounds = 0) OR haven't reached the limit
          const shouldContinue = autoPlayConfig.numberOfRounds === 0 || nextRound < autoPlayConfig.numberOfRounds
          
          console.log('🔄 Win: Should continue?', { 
            shouldContinue, 
            nextRound, 
            hasBalance: balance >= betAmount 
          })
          
          if (shouldContinue && balance >= betAmount) {
            console.log('✅ Win: Continuing to next round')
            executeAutoPlayRound()
          } else {
            console.log('❌ Win: Stopping - no more rounds or insufficient balance')
            stopAutoPlay()
          }
        }, 3000)
        
        setAutoPlayTimers(prev => [...prev, nextRoundTimer])
      }
    }, 300) // Small delay for smooth reveal
  }
  
  const startAutoPlay = () => {
    // Check if we have tiles selected and sufficient balance
    if (selectedTilesForAuto.size === 0 || balance < betAmount) {
      return
    }
    
    setIsAutoPlaying(true)
    setCurrentRound(0)
    
    // Execute the first round after state updates
    setTimeout(() => {
      executeAutoPlayRound()
    }, 50)
  }
  
  const stopAutoPlay = () => {
    // Clear all timers immediately
    clearAutoPlayTimers()
    setIsAutoPlaying(false)
    
    // Reset tiles immediately but let modal disappear on its own
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setShowAllTiles(false)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAmount(0)
    
    // Reset game state
    setGameState('idle')
    
    // Modal will disappear on its own timer if it's showing
    // Don't force close it immediately
  }

  const cashOut = () => {
    if (isCashingOut) return
    
    clearCashOutTimers()
    
    setIsCashingOut(true)
    setIsDimmingCheckout(true)
    
    const timers: NodeJS.Timeout[] = []
    
    timers.push(setTimeout(() => {
      setIsDimmingCheckout(false)
      setGameState('idle')
    }, 400))
    
    timers.push(setTimeout(() => {
      setWinAnimationAmount(currentCashoutValue)
      setShowWinAnimation(true)
      setBalance(balance + currentCashoutValue)
      setShowWinModal(true)
    }, 500))
    
    timers.push(setTimeout(() => {
      setShowAllTiles(true)
    }, 600))
    
    timers.push(setTimeout(() => {
      setShowWinAnimation(false)
    }, 2850))
    
    timers.push(setTimeout(() => {
      setShowWinModal(false)
      resetGame()
    }, 2650))
    
    setCashOutTimers(timers)
  }

  const clearAllAnimations = () => {
    clearCashOutTimers()
    setShowWinModal(false)
    setShowWinAnimation(false)
    setShowAllTiles(false)
    setIsCashingOut(false)
    setIsDimmingCheckout(false)
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAmount(0)
    setWinAnimationAmount(0)
  }

  const resetGame = () => {
    clearAllAnimations()
    setGameState('idle')
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setWinAmount(0)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAnimationAmount(0)
    generateMinePositions(selectedMines)
  }

  const startNewGame = () => {
    clearAllAnimations()
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
      setWinAnimationAmount,
      isDimmingCheckout,
      setIsDimmingCheckout,
      clearAllAnimations,
      clearCashOutTimers,
      
      isAutoPlaying,
      setIsAutoPlaying,
      autoPlayConfig,
      setAutoPlayConfig,
      selectedTilesForAuto,
      setSelectedTilesForAuto,
      currentRound,
      setCurrentRound,
      autoPlayTimers,
      setAutoPlayTimers,
      clearAutoPlayTimers,
      startAutoPlay,
      stopAutoPlay,
      resetAutoPlayState,
      isAutoMode,
      setIsAutoMode,
      toggleTileForAutoPlay,
      executeAutoPlayRound,
      updateBetAfterResult
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