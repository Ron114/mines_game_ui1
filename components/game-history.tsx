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

  // Show 5 items on mobile, 7 on desktop
  const historyItems = multiplierValues.slice(0, 7).map(val => formatMultiplier(val))

  return (
    <div className="game-history md:mt-0 -mt-2">
      <div className="game-history__inner relative">
        <div className='w-full h-full flex absolute top-0 left-0 z-[1]'>
          <div className='w-[55%] h-[95.5%] bg-[#232327a3] sm:block hidden clipped-right'></div>
        </div>
        <div className="game-history__inner-container">
          {historyItems.map((multiplier, index) => {
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
                <div className="game-history__item-text z-[2]">{multiplier}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .game-history {
          border-radius: 5px;
          height: 41px;
          padding: 1px;
          display: flex;
          position: relative;
          overflow: hidden;
          box-shadow: inset 2px 1px 9px #070709;
          position: relative;
          background-image: linear-gradient(360deg, rgba(194, 108, 66, 0.79) 0%, rgba(35, 38, 43, 0) 100%), linear-gradient(90.51deg, rgb(93, 102, 111) 9.05%, rgba(18, 20, 21, 0.33) 105.67%);
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

        .clipped-right {
          clip-path: polygon(0 0, 100% 0, calc(100% - 35px) 100%, 0 100%);
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
          background: transparent;
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
          background: transparent;
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
            /* Show only 5 items on mobile, hide the rest */
            overflow-x: auto;
            scrollbar-width: thin;
            scrollbar-color: #a35231 transparent;
          }

          .game-history__inner-container::-webkit-scrollbar {
            height: 3px;
          }

          .game-history__inner-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .game-history__inner-container::-webkit-scrollbar-thumb {
            background: #a35231;
            border-radius: 3px;
          }

          .game-history__item {
            font-size: 9px;
            /* Ensure items don't shrink below minimum width */
            min-width: 0;
            flex: 0 0 auto;
            width: calc(20% - 0.8px); /* 5 items = 20% each minus gap */
          }

          .game-history__item-text {
            font-size: 9px;
            border-radius: 3px;
          }

          /* Hide items beyond the 5th on mobile */
          .game-history__item:nth-child(n+6) {
            display: none;
          }
        }

        @media (min-width: 820px) {
          .game-history {
            grid-area: history;
          }

          .game-history__item {
            /* Show all 7 items on desktop */
            flex: 1;
            min-width: 0;
          }
        }
      `}</style>
    </div>
  )
}
