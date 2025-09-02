"use client"

import Image from "next/image"
import { useGame } from '../contexts/GameContext'

export default function GameDetails() {
  const { 
    gameState, 
    selectedMines, 
    diamondsFound, 
    tileStates 
  } = useGame()
  
  // Calculate dynamic values
  const totalTiles = 25
  const openedTiles = Object.keys(tileStates).length
  
  // Gems left = total safe tiles (25 - mines) minus gems already found
  const gemsLeft = gameState === 'idle' ? 0 : (totalTiles - selectedMines) - diamondsFound
  
  // Mine risk = mines remaining / tiles remaining * 100
  // Only calculate when game is active and tiles remain
  const tilesRemaining = totalTiles - openedTiles
  const mineRisk = gameState === 'idle' || tilesRemaining === 0 ? 0 : 
    Math.round((selectedMines / tilesRemaining) * 100)
  
  const openedTilesDisplay = `${openedTiles}/${totalTiles}`
  return (
    <div className="game-details">
      <div className="game-details__inner">
        <div className="game-details__inner-container">
          <div className="game-details__title">Game details</div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-crystal.svg" alt="Crystal" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Gems left</div>
            <div className="game-details__row-value">{gemsLeft}</div>
          </div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-bomb.svg" alt="Mine" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Mine risk:</div>
            <div className="game-details__row-value">{mineRisk}%</div>
          </div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-tiles.svg" alt="Tiles" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Opened tiles</div>
            <div className="game-details__row-value">{openedTilesDisplay}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-details {
          color: #d17448;
          background-image: linear-gradient(360deg, rgba(194, 108, 66, .79) 0%, rgba(35, 38, 43, 0) 100%), 
                           linear-gradient(90.51deg, #5d666f 9.05%, rgba(18, 20, 21, .33) 105.67%);
          border-radius: 10px;
          padding: 1px;
          font-size: 11px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 2px 1px 9px #070709;
          margin-top: 10px;
        }
        
        /* Desktop compact styles */
        @media (min-width: 820px) {
          .game-details {
            margin-top: 6px;
            font-size: 10px;
          }
          
          .game-details__title {
            height: 32px;
            margin-bottom: 8px;
            font-size: 10px;
          }
          
          .game-details__row {
            margin-bottom: 10px;
            padding: 0 8px;
          }
          
          .game-details__row-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
          
          .game-details__row-text {
            font-size: 10px;
          }
          
          .game-details__row-value {
            font-size: 10px;
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .game-details {
            margin-top: 0;
            font-size: 10px;
          }

          .game-details__title {
            height: 35px;
            margin-bottom: 12px;
            font-size: 11px;
          }

          .game-details__row {
            margin-bottom: 14px;
            padding: 0 10px;
          }

          .game-details__row-icon {
            width: 18px;
            height: 18px;
            margin-right: 12px;
          }
        }

        .game-details:before {
          content: "";
          background: rgba(196, 196, 196, .06);
          width: 300px;
          height: 300px;
          position: absolute;
          top: -148px;
          left: -182px;
          transform: rotate(40deg);
        }

        .game-details__inner {
          height: 100%;
        }

        .game-details__inner-container {
          background: #0c0c0e;
          border: 1px solid #1e2122;
          border-radius: 10px;
          height: 100%;
          padding-bottom: 5px;
        }

        .game-details__title {
          border-bottom: 1px solid #1d1b1b;
          align-items: center;
          height: 40px;
          margin-bottom: 14px;
          padding: 0 12px;
          font-weight: 700;
          display: flex;
        }

        .game-details__row {
          align-items: center;
          margin-bottom: 16px;
          padding: 0 12px;
          display: flex;
        }

        .game-details__row-icon {
          width: 20px;
          height: 20px;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-details__row-text {
          flex: 1;
        }

        .game-details__row-value {
          margin-left: auto;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
