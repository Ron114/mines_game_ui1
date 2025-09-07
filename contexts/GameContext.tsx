"use client"

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react'

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
  animatingTiles: Set<number>
  setAnimatingTiles: (tiles: Set<number> | ((prev: Set<number>) => Set<number>)) => void
  diamondsFound: number
  multiplierValues: number[]
  getCurrentMultipliers: () => number[]
  currentCashoutValue: number
  setCurrentCashoutValue: (value: number) => void
  modalWinData: { winAmount: number; betAmount: number; multiplier: number } | null
  setModalWinData: (data: { winAmount: number; betAmount: number; multiplier: number } | null) => void
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
  showAlert: boolean
  setShowAlert: (show: boolean) => void
  alertMessage: string
  setAlertMessage: (message: string) => void
  
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
  // hello
  startAutoPlay: () => void
  stopAutoPlay: () => void
  resetAutoPlayState: () => void
  isAutoMode: boolean
  setIsAutoMode: (auto: boolean) => void
  toggleTileForAutoPlay: (tileIndex: number) => void
  executeAutoPlayRound: () => void
  updateBetAfterResult: (won: boolean, currentBetAmount?: number) => number
  initialBetAmount: number
  setInitialBetAmount: (amount: number) => void
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
  const [animatingTiles, setAnimatingTiles] = useState<Set<number>>(new Set())
  const [diamondsFound, setDiamondsFound] = useState(0)
  const [currentCashoutValue, setCurrentCashoutValue] = useState(0)
  const [modalWinData, setModalWinData] = useState<{ winAmount: number; betAmount: number; multiplier: number } | null>(null)
  const [showWinAnimation, setShowWinAnimation] = useState(false)
  const [winAnimationAmount, setWinAnimationAmount] = useState(0)
  const [isCashingOut, setIsCashingOut] = useState(false)
  const [isDimmingCheckout, setIsDimmingCheckout] = useState(false)
  const [cashOutTimers, setCashOutTimers] = useState<NodeJS.Timeout[]>([])
  const [bombResetTimers, setBombResetTimers] = useState<NodeJS.Timeout[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  
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
  const [initialBetAmount, setInitialBetAmount] = useState(1)
  
  // Refs to track current values for closure issues
  const balanceRef = useRef(balance)
  const betAmountRef = useRef(betAmount)
  const currentRoundRef = useRef(currentRound)
  
  // Update refs when values change
  useEffect(() => {
    balanceRef.current = balance
  }, [balance])
  
  useEffect(() => {
    betAmountRef.current = betAmount
  }, [betAmount])
  
  useEffect(() => {
    currentRoundRef.current = currentRound
  }, [currentRound])
  
  const multiplierMappings: Record<number, number[]> = {
    2: [
      1.03, 1.13, 1.23, 1.36, 1.5, 1.67, 1.86,
      2.1, 2.38, 2.71, 3.13, 3.65, 4.32, 5.18,
      6.33, 7.92, 10.18, 13.57, 19, 28.5,
      47.5, 95, 285
    ],    
    
    3: [
      1.08, 1.23, 1.42, 1.64, 1.92, 2.25, 2.68,
      3.21, 3.9, 4.8, 6, 7.64, 9.93, 13.24,
      18.21, 26.01, 39.02, 62.43, 109.25,
      218.5, 546.25, 2180
    ],    
    4: [
      1.13, 1.36, 1.64, 2.01, 2.48, 3.1, 3.93, 5.05,
      6.6, 8.8, 12.01, 16.81, 24.28, 36.42, 57.23,
      95.38, 171.68, 343.36, 801.17, 2400, 12010
    ],
    5: [
      1.19, 1.5, 1.92, 2.48, 3.26, 4.34, 5.89,
      8.16, 11.56, 16.81, 25.21, 39.22, 63.73,
      109.25, 200.29, 400.58, 901.31, 2400,
      8410, 50470
    ],    
    6: [
      1.25, 1.67, 2.25, 3.1, 4.34, 6.2, 9.06,
      13.59, 21.01, 33.62, 56.03, 98.04,
      182.08, 364.17, 801.17, 2000, 6000,
      24030, 168240
    ],
    7: [
      1.32, 1.86, 2.68, 3.93, 5.89, 9.06, 14.35,
      23.48, 39.92, 70.97, 133.06, 266.12,
      576.6, 1380, 3800, 12680, 57080, 456660
    ],
    8: [
      1.4, 2.1, 3.21, 5.05, 8.16, 13.59, 23.48,
      42.27, 79.84, 159.67, 342.16, 798.37,
      2070, 6220, 22830, 114160
    ],    
    9: [
      1.48, 2.38, 3.9, 6.6, 11.56, 21.01, 39.92,
      79.84, 169.65, 387.78, 969.44, 2710,
      8820, 35280, 194080
    ],    
    10: [
      1.58, 2.71, 4.8, 8.8, 16.81, 33.62, 70.97,
      159.67, 387.78, 1030, 3100, 10850,
      47050, 282300
    ],
    11: [
      1.7, 3.13, 6, 12.01, 25.21, 56.03, 133.06,
      342.16, 969.44, 3100, 11630,
      54280, 352870
    ],    
    12: [
      1.83, 3.65, 7.64, 16.81, 39.22, 98.04, 266.12,
      798.37, 2700, 10850, 54280, 380020
    ],    
    13: [
      1.98, 4.32, 9.93, 24.28, 63.73, 182.08, 576.6,
      2070, 8820, 47050, 352870
    ]
    ,
    14: [
      2.16, 5.18, 13.24, 36.42, 109.25, 364.17, 1380,
      6220, 35280, 282300
    ]
    ,
    15: [
      2.38, 6.33, 18.21, 57.23, 200.29, 801.17,
      3800, 22830, 194080
    ]
    ,
    16: [
      2.64, 7.92, 26.01, 95.38, 400.58,
      2000, 12680, 114160
    ],    
    17: [
      2.97, 10.18, 39.02, 171.68, 901.31,
      6000, 57080
    ]
    ,
    18: [
      3.39, 13.57, 62.43, 343.36,
      2400, 24030, 456660
    ]
    ,
    19: [3.96, 19, 109.25, 801.17, 8410, 168240],
    20: [4.75, 28.5, 218.5, 2400, 50470],
    21: [
      5.94, 47.5, 546.25, 12010
    ],
    22: [
      7.92, 95, 2180
    ]
,
23: [
  11.88, 285
],
24: [
  23.75
],

  }

  const multiplierValues = multiplierMappings[selectedMines] || multiplierMappings[3]

  useEffect(() => {
    const savedBalance = localStorage.getItem('minesGameBalance')
    if (savedBalance) {
      setBalanceInternal(Number.parseFloat(savedBalance))
    }
  }, [])

  const setBalance = (newBalance: number | ((prevBalance: number) => number)) => {
    if (typeof newBalance === 'function') {
      setBalanceInternal(prevBalance => {
        const updatedBalance = newBalance(prevBalance)
        localStorage.setItem('minesGameBalance', updatedBalance.toString())
        return updatedBalance
      })
    } else {
      setBalanceInternal(newBalance)
      localStorage.setItem('minesGameBalance', newBalance.toString())
    }
  }

  const deductBet = () => {
    setBalance(prevBalance => prevBalance - betAmount)
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
      setModalWinData({ winAmount: newCashoutValue, betAmount, multiplier }) // Store exact values for modal
      setGameState('cashout')
    } else if (state === 'bomb') {
      setGameState('idle')
      setCurrentCashoutValue(0)
      setDiamondsFound(0)
      
      setBombHitTile(tileIndex)
      
      // Immediately reveal all tiles when bomb explodes (parallel with explosion)
      for (let i = 0; i < 25; i++) {
        const tileType = minePositions.has(i) ? 'bomb' : 'diamond'
        if (i !== tileIndex) { // Don't override the bomb tile that was just set
          setTileStatesInternal(prev => ({ ...prev, [i]: tileType }))
        }
      }
      setShowAllTiles(true)
      
      // Reset game after showing tiles for a while
      const bombTimer = setTimeout(() => {
        resetGame()
      }, 2500)
      setBombResetTimers([bombTimer])
    }
  }

  const clearCashOutTimers = () => {
    cashOutTimers.forEach(timer => clearTimeout(timer))
    setCashOutTimers([])
  }
  
  const clearBombResetTimers = () => {
    bombResetTimers.forEach(timer => clearTimeout(timer))
    setBombResetTimers([])
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
  
  const updateBetAfterResult = (won: boolean, currentBetAmount?: number) => {
    const config = autoPlayConfig
    let finalBetAmount = 0
    
    setBetAmount(prevBetAmount => {
      const workingBetAmount = currentBetAmount ?? prevBetAmount
      let newBetAmount = workingBetAmount
      
      console.log(`🎯 updateBetAfterResult - Won: ${won}, Current bet: $${workingBetAmount}, Initial bet: $${initialBetAmount}`)
      console.log(`🎯 Config - WinMode: ${config.onWinMode}, WinAmount: ${config.onWinAmount}%, LossMode: ${config.onLossMode}, LossAmount: ${config.onLossAmount}%`)
      
      if (won) {
        if (config.onWinMode === 'increase' && config.onWinAmount > 0) {
          // Always increase bet by the specified percentage from current bet
          newBetAmount = workingBetAmount + (workingBetAmount * config.onWinAmount / 100)
          console.log(`🎯 WIN: Increasing bet by ${config.onWinAmount}% from $${workingBetAmount} to $${newBetAmount}`)
        } else if (config.onWinMode === 'reset') {
          // Reset bet to initial bet amount (what user started with)
          newBetAmount = initialBetAmount
          console.log(`🎯 WIN: Resetting bet to initial amount $${newBetAmount}`)
        }
        // If onWinAmount is 0 or mode is something else, keep current bet amount
      } else {
        // When losing (bomb found)
        if (config.onLossMode === 'increase' && config.onLossAmount > 0) {
          // Increase bet by the specified percentage from current bet (allows compounding)
          newBetAmount = workingBetAmount + (workingBetAmount * config.onLossAmount / 100)
          console.log(`🎯 LOSS: Increasing bet by ${config.onLossAmount}% from $${workingBetAmount} to $${newBetAmount}`)
        } else if (config.onLossMode === 'reset') {
          // Reset bet to initial bet amount
          newBetAmount = initialBetAmount
          console.log(`🎯 LOSS: Resetting bet to initial amount $${newBetAmount}`)
        } else {
          // Default: reset to initial bet amount on loss
          newBetAmount = initialBetAmount
          console.log(`🎯 LOSS: Default - resetting bet to initial amount $${newBetAmount}`)
        }
      }
      
      // Ensure bet amount is within valid bounds and not more than balance
      finalBetAmount = Math.max(0.01, Math.min(newBetAmount, balanceRef.current))
      console.log(`🎯 Final bet amount: $${finalBetAmount}`)
      return finalBetAmount
    })
    
    return finalBetAmount
  }
  
  const executeAutoPlayRound = () => {
    if (selectedTilesForAuto.size === 0) {
      stopAutoPlay()
      return
    }
    
    if (balanceRef.current < betAmountRef.current) {
      stopAutoPlay()
      return
    }
    
    // Complete reset of all game states before starting new round
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setShowAllTiles(false)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAmount(0)
    setShowWinModal(false)
    setShowWinAnimation(false)
    setAnimatingTiles(new Set())
    setIsCashingOut(false)
    setIsDimmingCheckout(false)
    setWinAnimationAmount(0)
    clearCashOutTimers()
    // Generate mine positions for this round
    const positions = new Set<number>()
    const totalTiles = 25
    
    while (positions.size < selectedMines) {
      const randomPosition = Math.floor(Math.random() * totalTiles)
      positions.add(randomPosition)
    }
    
    setMinePositions(positions)
    setGameState('active')
    
    // Capture the current bet amount for this round before any updates
    const actualBetAmount = betAmountRef.current
    console.log(`💰 Starting round with bet amount: $${actualBetAmount}`)
    
    // Deduct the bet amount for this round
    setBalance(prevBalance => {
      const newBalance = prevBalance - actualBetAmount
      console.log(`💰 Deducted $${actualBetAmount} from balance: $${prevBalance} -> $${newBalance}`)
      return newBalance
    })
    
    const tilesToClick = Array.from(selectedTilesForAuto)
    let hasBomb = false
    let bombTileIndex = -1
    
    // Check all selected tiles for bombs using the newly generated positions
    for (const tileIndex of tilesToClick) {
      const result = positions.has(tileIndex) ? 'bomb' : 'diamond'
      if (result === 'bomb') {
        hasBomb = true
        bombTileIndex = tileIndex
        break
      }
    }
    
    // Small delay then reveal ALL tiles at once WITH bomb animations
    setTimeout(() => {
      // Always reveal ALL 25 tiles simultaneously first
      for (let i = 0; i < 25; i++) {
        const result = positions.has(i) ? 'bomb' : 'diamond'
        setTileState(i, result)
      }
      setShowAllTiles(true)
      
      if (hasBomb) {
        // Simultaneously trigger explosion animation for bomb tiles in selected tiles
        const animatingBombs = new Set<number>()
        tilesToClick.forEach(tileIndex => {
          if (positions.has(tileIndex)) {
            animatingBombs.add(tileIndex)
          }
        })
        
        // Start explosion animation while tiles are revealed
        setAnimatingTiles(animatingBombs)
        setBombHitTile(bombTileIndex)
        
        // Update bet after bomb loss  
        console.log(`💣 LOSS! Lost bet: $${actualBetAmount}`)
        updateBetAfterResult(false, actualBetAmount)
        
        // Stop explosion animation after it completes
        const stopAnimationTimer = setTimeout(() => {
          setAnimatingTiles(new Set())
        }, 600) // Give bomb animation time to complete
        
        // After bomb explosion, slowly reset tiles to clean state
        const cleanupTimer = setTimeout(() => {
          // Complete cleanup of all game states
          setTileStatesInternal({})
          setLoadingTilesInternal(new Set())
          setShowAllTiles(false)
          setBombHitTile(null)
          setAnimatingTiles(new Set())
          setDiamondsFound(0)
          setCurrentCashoutValue(0)
          setWinAmount(0)
          setShowWinModal(false)
          setShowWinAnimation(false)
          setIsCashingOut(false)
          setIsDimmingCheckout(false)
          setWinAnimationAmount(0)
          clearCashOutTimers()
          setGameState('idle')
        }, 1500) // Slower cleanup for stability
        
        // After cleanup, continue to next round
        const nextRoundTimer = setTimeout(() => {
          const nextRound = currentRoundRef.current + 1
          setCurrentRound(nextRound)
          currentRoundRef.current = nextRound // Update ref immediately
          
          // Continue if: infinity mode (numberOfRounds = 0) OR haven't reached the limit
          const shouldContinue = autoPlayConfig.numberOfRounds === 0 || nextRound < autoPlayConfig.numberOfRounds
          console.log(`🔄 LOSS Round Check: nextRound=${nextRound}, numberOfRounds=${autoPlayConfig.numberOfRounds}, shouldContinue=${shouldContinue}`)
          
          if (shouldContinue && balanceRef.current >= betAmountRef.current) {
            executeAutoPlayRound()
          } else {
            console.log(`🛑 Stopping autoplay after loss - Round limit reached or insufficient balance`)
            stopAutoPlay()
          }
        }, 2000) // Slower timing for better user experience
        
        setAutoPlayTimers(prev => [...prev, stopAnimationTimer, cleanupTimer, nextRoundTimer])
      } else {
        // No bomb, reveal all tiles immediately
        for (let i = 0; i < 25; i++) {
          const result = positions.has(i) ? 'bomb' : 'diamond'
          setTileState(i, result)
        }
        setShowAllTiles(true)
        // All selected tiles are diamonds - win!
        
        // Calculate win amount with the bet amount used for THIS round
        const multiplier = multiplierValues[tilesToClick.length - 1] || multiplierValues[0]
        const winAmount = actualBetAmount * multiplier
        console.log(`🏆 WIN! Bet: $${actualBetAmount} x ${multiplier} = $${winAmount}`)
        
        // Now update bet amount for next round
        updateBetAfterResult(true, actualBetAmount)
        
        // Update balance, show win modal and win animation
        setBalance(prevBalance => prevBalance + winAmount)
        setCurrentCashoutValue(winAmount)
        setModalWinData({ winAmount, betAmount: actualBetAmount, multiplier }) // Store exact values used
        setWinAmount(winAmount)
        console.log(`🎯 Setting modal values: winAmount=${winAmount}, actualBetAmount=${actualBetAmount}, multiplier=${multiplier}`)
        setShowWinModal(true)
        setWinAnimationAmount(winAmount)
        setShowWinAnimation(true)
        
        // Hide win animation after its duration
        const winAnimTimer = setTimeout(() => {
          setShowWinAnimation(false)
        }, 1500)
        setAutoPlayTimers(prev => [...prev, winAnimTimer])
        
        // Hide modal and continue to next round
        const modalTimer = setTimeout(() => {
          setShowWinModal(false)
        }, 1200)
        setAutoPlayTimers(prev => [...prev, modalTimer])
        
        // Schedule next round or stop if "Stop at any Win" is enabled
        const nextRoundTimer = setTimeout(() => {
          // Complete reset for next round - clear everything
          setTileStatesInternal({})
          setLoadingTilesInternal(new Set())
          setShowAllTiles(false)
          setBombHitTile(null)
          setDiamondsFound(0)
          setCurrentCashoutValue(0)
          setWinAmount(0)
          setShowWinModal(false)
          setShowWinAnimation(false)
          setIsCashingOut(false)
          setIsDimmingCheckout(false)
          clearCashOutTimers()
          setGameState('idle')
          
          // Check if should stop on win
          if (autoPlayConfig.stopAtAnyWin) {
            console.log(`🏆 Stop at any Win enabled - stopping auto-play after win`)
            stopAutoPlay()
            return
          }
          
          const nextRound = currentRoundRef.current + 1
          setCurrentRound(nextRound)
          currentRoundRef.current = nextRound // Update ref immediately
          
          // Continue if: infinity mode (numberOfRounds = 0) OR haven't reached the limit
          const shouldContinue = autoPlayConfig.numberOfRounds === 0 || nextRound < autoPlayConfig.numberOfRounds
          console.log(`🔄 WIN Round Check: nextRound=${nextRound}, numberOfRounds=${autoPlayConfig.numberOfRounds}, shouldContinue=${shouldContinue}`)
          
          if (shouldContinue && balanceRef.current >= betAmountRef.current) {
            executeAutoPlayRound()
          } else {
            console.log(`🛑 Stopping autoplay after win - Round limit reached or insufficient balance`)
            stopAutoPlay()
          }
        }, 1800)
        
        setAutoPlayTimers(prev => [...prev, nextRoundTimer])
      }
    }, 300) // Small delay for smooth reveal
  }
  
  const startAutoPlay = () => {
    // Check if we have tiles selected and sufficient balance
    if (selectedTilesForAuto.size === 0 || balanceRef.current < betAmountRef.current) {
      return
    }
    
    // Store the initial bet amount when auto-play starts
    setInitialBetAmount(betAmount)
    setIsAutoPlaying(true)
    setCurrentRound(0)
    currentRoundRef.current = 0 // Initialize ref
    console.log(`🚀 Starting autoplay with ${autoPlayConfig.numberOfRounds} rounds (0 = infinite)`)
    
    // Execute the first round after state updates
    setTimeout(() => {
      executeAutoPlayRound()
    }, 50)
  }
  
  const stopAutoPlay = () => {
    // Clear all timers immediately
    clearAutoPlayTimers()
    clearCashOutTimers()
    setIsAutoPlaying(false)
    
    // Reset bet amount to what user initially entered when auto-play started
    console.log(`🛑 Stopping auto-play - resetting bet from $${betAmount} back to initial $${initialBetAmount}`)
    setBetAmount(initialBetAmount)
    
    // Reset tiles and clear selected auto tiles
    setTileStatesInternal({})
    setLoadingTilesInternal(new Set())
    setShowAllTiles(false)
    setBombHitTile(null)
    setDiamondsFound(0)
    setCurrentCashoutValue(0)
    setWinAmount(0)
    
    // Force close any stuck modals and animations
    setShowWinModal(false)
    setShowWinAnimation(false)
    setIsCashingOut(false)
    setIsDimmingCheckout(false)
    setWinAnimationAmount(0)
    
    // Reset game state
    setGameState('idle')
    
    // Clear selected tiles when stopping autoplay
    setSelectedTilesForAuto(new Set())
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
      setBalance(prevBalance => prevBalance + currentCashoutValue)
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
    clearBombResetTimers()
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
    clearAllAnimations();
    generateMinePositions(selectedMines);
    setTimeout(() => {
      setGameState('active');
    }, 1000);
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
      animatingTiles,
      setAnimatingTiles,
      diamondsFound,
      multiplierValues,
      getCurrentMultipliers: () => multiplierValues,
      currentCashoutValue,
      setCurrentCashoutValue,
      modalWinData,
      setModalWinData,
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
      showAlert,
      setShowAlert,
      alertMessage,
      setAlertMessage,
      
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
      updateBetAfterResult,
      initialBetAmount,
      setInitialBetAmount
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