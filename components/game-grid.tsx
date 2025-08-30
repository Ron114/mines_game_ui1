"use client"

import { useGame } from '../contexts/GameContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function GameGrid() {
  const { gameState, tileStates, setTileState, loadingTiles, setTileLoading, showWinModal, currentCashoutValue, betAmount, getTileType, deductBet, showAllTiles, bombHitTile, getNextPotentialValue, formatCurrency } = useGame()
  const [animatingTiles, setAnimatingTiles] = useState<Set<number>>(new Set())
  const [hoveredTile, setHoveredTile] = useState<number | null>(null)
  
  const tiles = Array.from({ length: 25 }, (_, index) => index)

  const [bombClicked, setBombClicked] = useState(false)
  
  useEffect(() => {
    if (gameState === 'idle' && !showAllTiles) {
      setBombClicked(false)
    }
  }, [gameState, showAllTiles])
  
  const handleTileClick = (tileIndex: number) => {
    if ((gameState !== 'active' && gameState !== 'cashout') || tileStates[tileIndex] || loadingTiles.has(tileIndex) || showAllTiles || bombClicked) return

    const result = getTileType(tileIndex)
    
    if (result === 'bomb') {
      setBombClicked(true)
    }

    const isFirstClick = Object.keys(tileStates).length === 0
    if (isFirstClick) {
      deductBet()
    }
    
    setTileLoading(tileIndex, true)
    
    setTimeout(() => {
      setTileLoading(tileIndex, false)
      
      if (result === 'bomb') {
        setAnimatingTiles(prev => new Set(prev).add(tileIndex))
        
        setTimeout(() => {
          setTileState(tileIndex, result)
          setAnimatingTiles(prev => {
            const newSet = new Set(prev)
            newSet.delete(tileIndex)
            return newSet
          })
        }, 400)
      } else {
        setTileState(tileIndex, result)
      }
    }, 400)
  }

  const getTileClass = (tileIndex: number) => {
    const state = tileStates[tileIndex]
    const isAnimating = animatingTiles.has(tileIndex)
    const isLoading = loadingTiles.has(tileIndex)
    const shouldShowContent = state || (showAllTiles && !isLoading)
    let classes = 'game-tile'
    
    if (isLoading) {
      classes += ' _loading'
    } else if (isAnimating) {
      classes += ' _active _exploding'
    } else if (shouldShowContent) {
      const tileType = state || getTileType(tileIndex)
      classes += ' _active'
      if (tileType === 'diamond') {
        classes += ' _win'
      } else if (tileType === 'bomb') {
        classes += ' _lose'
      }
    }
    
    return classes
  }

  const renderTileContent = (tileIndex: number) => {
    const state = tileStates[tileIndex]
    const isAnimating = animatingTiles.has(tileIndex)
    const isLoading = loadingTiles.has(tileIndex)
    const shouldShowContent = state || (showAllTiles && !isLoading)
    
    if (isLoading) {
      return null
    } else if (isAnimating) {
      return (
        <div className="tile-content explosion-container">
          <video
            className="explosion-video"
            autoPlay
            muted
            playsInline
            onEnded={() => {}}
          >
            <source src="/assets/bombgif.mp4" type="video/mp4" />
          </video>
        </div>
      )
    } else if (shouldShowContent) {
      const tileType = state || getTileType(tileIndex)
      const isHitBomb = bombHitTile === tileIndex
      const opacity = showAllTiles && !isHitBomb ? 0.3 : 1
      
      if (tileType === 'diamond') {
        return (
          <div className="tile-content" style={{ opacity }}>
            <Image 
              src="/assets/diamond.svg" 
              alt="Diamond" 
              width={50} 
              height={50}
              style={{ filter: 'drop-shadow(0 0 10px rgba(92, 217, 245, 0.6))' }}
            />
          </div>
        )
      } else if (tileType === 'bomb') {
        return (
          <div className="tile-content" style={{ opacity }}>
            <Image 
              src="/assets/bomb.svg" 
              alt="Bomb" 
              width={45} 
              height={45}
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 68, 68, 0.6))' }}
            />
          </div>
        )
      }
    }
    
    return null
  }

  return (
          <div className="table-holder">
      {showWinModal && (
      <div className="win-modal">
        <div className="modal-header">
          <div className="header-diamond left-diamond">
            <Image 
              src="/assets/1diamond.png" 
              alt="Diamond" 
              width={38} 
              height={38}
            />
          </div>
          <div className="win-text">You win!</div>
          <div className="header-diamond right-diamond">
            <Image 
              src="/assets/2diamond.png" 
              alt="Diamond" 
              width={55} 
              height={55}
            />
          </div>
        </div>
        
        <div className="modal-body">
          <div className="win-amount">{formatCurrency(currentCashoutValue)}</div>
          <div className="modal-divider"></div>
          <div className="multiplier-section">
            <span className="multiplier-label">Multiplier</span>
            <span className="multiplier-value">x{(currentCashoutValue / betAmount).toFixed(2)}</span>
          </div>
        </div>
      </div>
      )}

      <div className="game-tiles">
        {tiles.map((tileIndex) => (
          <div 
            key={tileIndex} 
            className={getTileClass(tileIndex)}
            onClick={() => handleTileClick(tileIndex)}
            onMouseEnter={() => setHoveredTile(tileIndex)}
            onMouseLeave={() => setHoveredTile(null)}
          >
            <div className="game-tile__inner-possible-win desktop-only">
              {hoveredTile === tileIndex && (gameState === 'active' || gameState === 'cashout') ? formatCurrency(getNextPotentialValue()) : ''}
            </div>
            <div className="game-tile__inner">
              {renderTileContent(tileIndex)}
            </div>
            {/* EXPANDING CIRCLES LOADER */}
            {loadingTiles.has(tileIndex) && (
              <div className="absolute-spinner">
                <div className="expanding-circles">
                  <div className="circle outer-circle"></div>
                  <div className="circle inner-circle"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


      <style jsx>{`
        .table-holder {
          position: relative;
          margin-top: 8px;
        }

        @media (max-height: 700px) and (min-width: 820px) {
          .table-holder {
            padding: 5px 67px 0;
          }
        }

        .game-tiles {
          grid-gap: 6px;
          grid-template-rows: repeat(5, 1fr);
          grid-template-columns: repeat(5, 1fr);
          padding-bottom: 15px;
          display: grid;
          max-width: 100%;
          margin: 0 auto;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .table-holder {
            margin-top: 0;
            padding: 0;
          }

          .game-tiles {
            grid-gap: 14px;
            padding-bottom: 30px;
            max-width: calc(100vw - 20px);
            width: 100%;
            grid-template-rows: repeat(5, 62px);
            grid-template-columns: repeat(5, 62px);
            justify-content: center;
          }
        }

        /* Desktop styles */
        @media (min-width: 820px) {
          .game-tiles {
            grid-gap: 10px;
            padding-bottom: 30px;
            max-width: 405px;
          }
        }

        .game-tile {
          text-align: center;
          aspect-ratio: 1;
          background-image: linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%);
          border-radius: 12px;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          line-height: 65px;
          display: flex;
          position: relative;
          box-shadow: 3px 3px 4px rgba(10, 9, 9, 0.4);
          cursor: pointer;
          transition: transform 0.1s ease;
          overflow: hidden;
        }

        .game-tile._loading {
          transform: none !important;
        }

        /* Mobile responsive tile styles */
        @media (max-width: 819px) {
          .game-tile {
            border-radius: 8px;
            font-size: 20px;
            line-height: 40px;
            box-shadow: 2px 2px 3px rgba(10, 9, 9, 0.4);
          }

          .game-tile__inner-possible-win {
            font-size: 10px;
            font-weight: 500;
            line-height: 14px;
          }
        }

        .game-tile:hover:not(._loading) {
          transform: scale(0.98);
        }

        .game-tile__inner-possible-win {
          z-index: 5;
          color: #888;
          opacity: 0;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
          line-height: 18px;
          transition: opacity 0.1s ease-in;
          display: flex;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          font-family: 'Roboto', sans-serif;
        }

        .game-tile__inner {
          opacity: 0;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transition: opacity 0.5s ease-in;
          display: flex;
        }

        /* Desktop only hover effect for potential earnings */
        @media (min-width: 820px) {
          .game-tile:hover .game-tile__inner-possible-win {
            opacity: 1;
          }
        }
        
        /* Hide potential earnings on mobile */
        @media (max-width: 819px) {
          .game-tile__inner-possible-win {
            display: none !important;
          }
        }


        /* Loading tile states */
        .game-tile._loading .game-tile__inner {
          opacity: 1;
        }

        /* Active tile states */
        .game-tile._active {
          box-shadow: none;
        }

        .game-tile._active .game-tile__inner {
          opacity: 1;
          background-image: linear-gradient(317.11deg, #0a0b0d -17.46%, #32383e 197.04%);
          border-radius: 12px;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          box-shadow: inset -2px -2px 6px rgba(76, 79, 81, .26), inset 4px 4px 3px rgba(10, 9, 9, .49);
        }

        .game-tile._win {
          background-image: radial-gradient(33.95% 33.95% at -8.16% 104.08%, rgba(148, 226, 251, .37) 5.7%, rgba(33, 38, 42, 0) 100%), radial-gradient(33.68% 33.68% at 113.68% 107.89%, rgba(148, 226, 251, .37) 0%, rgba(33, 38, 42, 0) 100%), radial-gradient(62.12% 48.25% at 49.48% -8.25%, #5cd9f5 0%, rgba(38, 42, 46, 0) 100%), linear-gradient(129.86deg, #242526 -1.52%, rgba(29, 33, 36, .21) 107.51%);
        }

        .game-tile._lose {
          background-image: radial-gradient(33.95% 33.95% at -8.16% 104.08%, rgba(255, 82, 92, .4) 5.7%, rgba(42, 33, 33, 0) 100%), radial-gradient(33.68% 33.68% at 113.68% 107.89%, rgba(255, 82, 92, .4) 0%, rgba(42, 33, 33, 0) 100%), radial-gradient(62.12% 48.25% at 49.48% -8.25%, #f55c5c 0%, rgba(46, 38, 38, 0) 100%), linear-gradient(129.86deg, #242526 -1.52%, rgba(36, 29, 29, .21) 107.51%);
        }

        .game-tile._win .game-tile__inner-possible-win,
        .game-tile._lose .game-tile__inner-possible-win {
          display: none;
        }

        .game-tile._win:after,
        .game-tile._lose:after {
          content: "";
          background-position: 0;
          background-repeat: no-repeat;
          border-radius: 13px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .tile-content {
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Explosion animation styles */
        .game-tile._exploding {
          background-image: radial-gradient(33.95% 33.95% at -8.16% 104.08%, rgba(255, 140, 0, .6) 5.7%, rgba(42, 33, 33, 0) 100%), radial-gradient(33.68% 33.68% at 113.68% 107.89%, rgba(255, 69, 0, .6) 0%, rgba(42, 33, 33, 0) 100%), radial-gradient(62.12% 48.25% at 49.48% -8.25%, #ff4500 0%, rgba(46, 38, 38, 0) 100%), linear-gradient(129.86deg, #242526 -1.52%, rgba(36, 29, 29, .21) 107.51%);
          box-shadow: 0 0 20px rgba(255, 69, 0, 0.8), 0 0 40px rgba(255, 140, 0, 0.4);
        }

        .explosion-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .explosion-video {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          object-fit: cover;
          border-radius: 0;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 5px;
          left: 5px;
          filter: drop-shadow(0 0 15px rgba(255, 140, 0, 0.8)) drop-shadow(0 0 25px rgba(255, 69, 0, 0.6));
        }

        /* Mobile responsive video styles */
        @media (max-width: 819px) {
          .explosion-container {
            border-radius: 8px;
          }
          
          .explosion-video {
            border-radius: 0;
          }
        }

        /* Loading state styles */
        .loading-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .absolute-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          pointer-events: none;
        }

        .expanding-circles {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle {
          position: absolute;
          border-radius: 60%;
        }

        .outer-circle {
          width: 44px;
          height: 44px;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }

        .inner-circle {
          width: 15px;
          height: 15px;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.9);
          animation: expand-pulse 1.2s ease-in-out infinite;
        }

        @keyframes expand-pulse {
          0% {
            width: 10px;
            height: 10px;
            opacity: 1;
          }
          50% {
            width: 28px;
            height: 28px;
            opacity: 0.6;
          }
          100% {
            width: 10px;
            height: 10px;
            opacity: 1;
          }
        }

        @media (max-width: 819px) {
          .expanding-circles {
            width: 28px;
            height: 28px;
          }

          .outer-circle {
            width: 28px;
            height: 28px;
            border-width: 1px;
          }

          .inner-circle {
            width: 8px;
            height: 8px;
            border-width: 1px;
          }

          @keyframes expand-pulse {
            0% {
              width: 8px;
              height: 8px;
              opacity: 1;
            }
            50% {
              width: 22px;
              height: 22px;
              opacity: 0.6;
            }
            100% {
              width: 8px;
              height: 8px;
              opacity: 1;
            }
          }
        }

        .win-modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(2.5 * (100% / 5));
          height: calc(2 * (100% / 5) + 1 * 10px);
          z-index: 1000;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 
                      0 8px 16px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 819px) {
          .win-modal {
            width: calc(3 * 62px + 2 * 14px);
            height: calc(3 * 52px + 2 * 14px);
            border-radius: 12px;
          }
        }

        .modal-header {
          height: 25%;
          background: linear-gradient(180deg, #52a5d4 0%, #4e9ed0 55%, #4b74a9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          position: relative;
        }

        @media (max-width: 819px) {
          .modal-header {
            padding: 0 16px;
          }
        }

        .win-text {
          color: white;
          font-family: Gilroy, sans-serif;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 819px) {
          .win-text {
            font-size: 18px;
          }
        }

        .header-diamond {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .left-diamond {
          margin-right: 4px;
        }

        .right-diamond {
          margin-left: 0px;
        }

        @media (max-width: 819px) {
          .header-diamond {
            width: 28px;
            height: 28px;
          }
          
          .left-diamond {
            margin-right: 3px;
          }
          
          .right-diamond {
            margin-left: 0px;
          }
        }

        .modal-body {
          height: 75%;
          background: rgba(255, 255, 255, 0.02); /* Almost invisible background */
          backdrop-filter: blur(4px); /* Less blur for more clarity */
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 819px) {
          .modal-body {
            padding: 16px;
          }
        }

        .win-amount {
          color:rgb(171, 222, 247);
          font-family: Gilroy, sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        @media (max-width: 819px) {
          .win-amount {
            font-size: 20px;
            margin-bottom: 10px;
          }
        }

        .modal-divider {
          width: 90%;
          height: 2px;
          background: #5cd9f5;
          border-radius: 1px;
          margin-bottom: 14px;
          margin-top: 6px;
          box-shadow: 0 0 8px rgba(92, 217, 245, 0.8), 0 0 16px rgba(92, 217, 245, 0.4);
          opacity: 1;
        }

        @media (max-width: 819px) {
          .modal-divider {
            margin-bottom: 12px;
          }
        }

        .multiplier-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;
        }

        .multiplier-label {
          color: #f4f9fd;
          font-family: Gilroy, sans-serif;
          font-size: 12px;
          font-weight: 400;
        }

        .multiplier-value {
          color: #ffffff;
          font-family: Gilroy, sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        @media (max-width: 819px) {
          .multiplier-label {
            font-size: 11px;
            font-weight: 400;
          }
          
          .multiplier-value {
            font-size: 11px;
            font-weight: 500;
          }
        }

      `}</style>
    </div>
  )
}
