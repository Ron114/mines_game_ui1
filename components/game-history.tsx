"use client"

import { useGame } from '../contexts/GameContext'

export default function GameHistory() {
  const { multiplierValues, diamondsFound, gameState, isAutoMode, selectedTilesForAuto } = useGame()
  
  const formatMultiplier = (value: number): string => {
    if (value >= 1000) {
      return `x${(value / 1000).toFixed(2)}k`
    }
    return `x${value}`
  }
  
  const historyItems = multiplierValues.slice(0, 7).map(val => formatMultiplier(val))

  return (
    <div className="game-history">
      <div className="game-history__inner">
        <div className="game-history__inner-container">
          {historyItems.map((multiplier, index) => {
            // In auto mode, show active state based on selected tiles count
            // In manual mode, show active state based on actual diamonds found
            const selectedTilesCount = selectedTilesForAuto.size
            const isActive = isAutoMode 
              ? index + 1 === selectedTilesCount && selectedTilesCount > 0
              : diamondsFound === index + 1 && gameState === 'cashout'
            const isResulted = isAutoMode 
              ? index + 1 < selectedTilesCount 
              : diamondsFound > index + 1
            
            let itemClass = 'game-history__item'
            if (isActive) itemClass += ' _active'
            if (isResulted) itemClass += ' _resulted'
            
            return (
              <div key={index} data-history-item="false" className={itemClass}>
                <div className="game-history__item-text">{multiplier}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .game-history {
          background: #0c0c0e;
          border-radius: 5px;
          height: 41px;
          padding: 1px;
          display: flex;
          position: relative;
          overflow: hidden;
          box-shadow: inset 2px 1px 9px #070709;
        }
        
        /* Desktop - match game tiles width and position exactly */
        @media (min-width: 820px) {
          .game-history {
            max-width: 540px;
            margin-left: auto;
            margin-right: auto;
        
          }
        }

        .game-history__inner {
          flex: 1;
          display: flex;
        }

        .game-history__inner-container {
          scroll-behavior: smooth;
          background: #0c0c0e;
          border: 1px solid #1e2122;
          border-radius: 5px;
          flex: 1;
          max-width: 100%;
          height: 100%;
          padding: 2px;
          display: flex;
          position: relative;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 1px;
        }

        .game-history__item {
          box-sizing: border-box;
          color: #d26d3d;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding: 2px;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          background: rgba(22, 25, 29, 0.8);
          transition: all 0.2s ease;
        }

        .game-history__item:hover .game-history__item-text {
          border-color: rgba(163, 82, 49, 1);
          box-shadow: -1px -1px 12px rgba(141, 68, 37, .6);
        }

        .game-history__item-text {
          text-align: center;
          box-sizing: border-box;
          border: 1px solid #a35231;
          border-radius: 4px;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          box-shadow: -1px -1px 10px rgba(141, 68, 37, .2);
          font-size: 10px;
          font-weight: 500;
          color: inherit;
          transition: all 0.2s ease;
          background: #000;
        }

        /* Active state - currently selected diamond */
        .game-history__item._active .game-history__item-text {
          color: #020202;
          background: #d26d3d;
          border-color: #d26d3d;
          box-shadow: -1px -1px 10px rgba(248, 112, 106, .15);
        }

        /* Resulted state - previously found diamonds */
        .game-history__item._resulted .game-history__item-text {
          background-color: rgba(209, 116, 72, .1);
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .game-history {
            height: 36px;
            border-radius: 4px;
          }

          .game-history__inner-container {
            border-radius: 4px;
          }

          .game-history__item {
            font-size: 9px;
          }

          .game-history__item-text {
            font-size: 9px;
            border-radius: 3px;
          }
        }

        @media (min-width: 820px) {
          .game-history {
            grid-area: history;
          }
        }
      `}</style>
    </div>
  )
}
