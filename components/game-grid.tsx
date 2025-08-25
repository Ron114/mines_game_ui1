"use client"

import { useGame } from '../contexts/GameContext'
import Image from 'next/image'
import { useState } from 'react'

export default function GameGrid() {
  const { gameState, tileStates, setTileState } = useGame()
  const [animatingTiles, setAnimatingTiles] = useState<Set<number>>(new Set())
  
  // Create 25 tiles for 5x5 grid
  const tiles = Array.from({ length: 25 }, (_, index) => index)

  // Predefined results: first tile diamond, second tile bomb
  const predefinedResults = {
    0: 'diamond',
    1: 'bomb'
  } as const

  const handleTileClick = (tileIndex: number) => {
    // Only allow clicks when game is active and tile hasn't been clicked
    if (gameState !== 'active' || tileStates[tileIndex]) return

    const result = predefinedResults[tileIndex as keyof typeof predefinedResults] || 'bomb'
    
    if (result === 'bomb') {
      // Start explosion animation
      setAnimatingTiles(prev => new Set(prev).add(tileIndex))
      
      // After explosion animation, show the bomb
      setTimeout(() => {
        setTileState(tileIndex, result)
        setAnimatingTiles(prev => {
          const newSet = new Set(prev)
          newSet.delete(tileIndex)
          return newSet
        })
      }, 800) // Animation duration
    } else {
      setTileState(tileIndex, result)
    }
  }

  const getTileClass = (tileIndex: number) => {
    const state = tileStates[tileIndex]
    const isAnimating = animatingTiles.has(tileIndex)
    let classes = 'game-tile'
    
    if (isAnimating) {
      classes += ' _active _exploding'
    } else if (state === 'diamond') {
      classes += ' _active _win'
    } else if (state === 'bomb') {
      classes += ' _active _lose'
    }
    
    return classes
  }

  const renderTileContent = (tileIndex: number) => {
    const state = tileStates[tileIndex]
    const isAnimating = animatingTiles.has(tileIndex)
    
    if (isAnimating) {
      return (
        <div className="tile-content explosion-container">
          <Image 
            src="/assets/explosion.svg" 
            alt="Explosion" 
            width={60} 
            height={60}
            className="explosion-animation"
          />
        </div>
      )
    } else if (state === 'diamond') {
      return (
        <div className="tile-content">
          <Image 
            src="/assets/diamond.svg" 
            alt="Diamond" 
            width={50} 
            height={50}
            style={{ filter: 'drop-shadow(0 0 10px rgba(92, 217, 245, 0.6))' }}
          />
        </div>
      )
    } else if (state === 'bomb') {
      return (
        <div className="tile-content">
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
    
    return null
  }

  return (
    <div className="table-holder">
      <div className="game-tiles">
        {tiles.map((tileIndex) => (
          <div 
            key={tileIndex} 
            className={getTileClass(tileIndex)}
            onClick={() => handleTileClick(tileIndex)}
          >
            <div className="game-tile__inner-possible-win"></div>
            <div className="game-tile__inner">
              {renderTileContent(tileIndex)}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .table-holder {
          position: relative;
          margin-top: 25px;
        }

        @media (max-height: 700px) and (min-width: 820px) {
          .table-holder {
            padding: 5px 67px 0;
          }
        }

        .game-tiles {
          grid-gap: 10px;
          grid-template-rows: repeat(5, 1fr);
          grid-template-columns: repeat(5, 1fr);
          padding-bottom: 30px;
          display: grid;
          max-width: 405px;
          margin: 0 auto;
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
        }

        .game-tile:hover {
          transform: scale(0.98);
        }

        .game-tile__inner-possible-win {
          z-index: 5;
          color: rgba(255, 255, 255, 0.3);
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

        .game-tile:hover .game-tile__inner-possible-win {
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
          animation: explosionPulse 0.8s ease-in-out;
        }

        .explosion-animation {
          animation: explosionScale 0.8s ease-in-out, explosionRotate 0.8s linear;
          filter: drop-shadow(0 0 15px rgba(255, 140, 0, 0.8)) drop-shadow(0 0 25px rgba(255, 69, 0, 0.6));
        }

        @keyframes explosionPulse {
          0% { transform: scale(1); opacity: 0; }
          20% { transform: scale(1.1); opacity: 1; }
          60% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        @keyframes explosionScale {
          0% { transform: scale(0.3); }
          30% { transform: scale(1.2); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes explosionRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  )
}
