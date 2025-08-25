"use client"

import { useState } from "react"
import GameModeTabs from "./game-mode-tabs"
import GameHistory from "./game-history"
import BetAmountInput from "./bet-amount-input"
import MobileBetAmount from "./mobile-bet-amount"
import MinesSelector from "./mines-selector"
import StartGameButton from "./start-game-button"
import StartAutoplayButton from "./start-autoplay-button"
import AutoBetSection from "./auto-bet-section"
import GameDetails from "./game-details"
import GameGrid from "./game-grid"
import GameStatistics from "./game-statistics"

export default function GameContainer() {
  const [gameMode, setGameMode] = useState<"manual" | "auto">("manual")
  return (
    <div className="game-container mt-2">
      {/* Desktop Layout */}
      <div className="desktop-layout">
        <div className="mode-tabs">
          <GameModeTabs onModeChange={setGameMode} />
        </div>
        
        <div className="history">
          <GameHistory />
        </div>
        
        <div className="betslip">
          <BetAmountInput />
          <MinesSelector />
          {gameMode === "manual" ? (
            <>
              <StartGameButton />
              <GameDetails />
            </>
          ) : (
            <AutoBetSection />
          )}
        </div>
        
        <div className="chart">
          <GameGrid />
        </div>
        
        <div className="stats">
          <GameStatistics />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        {/* Mobile Header with History */}
        <div className="mobile-history">
          <GameHistory />
        </div>
        
        {/* Mobile Mode Tabs */}
        <div className="mobile-mode-tabs">
          <GameModeTabs onModeChange={setGameMode} />
        </div>
        
        {/* Mobile Game Grid */}
        <div className="mobile-chart">
          <GameGrid />
        </div>
        
        {/* Mobile Game Controls */}
        <div className="mobile-betslip">
          {/* Conditional Start Button based on mode */}
          {gameMode === "manual" ? (
            <div className="mobile-start-button">
              <StartGameButton />
            </div>
          ) : (
            <div className="mobile-start-autoplay">
              <StartAutoplayButton />
            </div>
          )}
          
          {/* Mobile Bet Amount with integrated controls */}
          <div className="mobile-bet-amount">
            <MobileBetAmount />
          </div>
          
          {/* Mines Selector */}
          <div className="mobile-mines">
            <MinesSelector />
          </div>
          
          {/* Conditional Sections based on mode */}
          {gameMode === "manual" ? (
            <div className="mobile-game-details">
              <GameDetails />
            </div>
          ) : (
            <div className="mobile-auto-section">
              <AutoBetSection />
            </div>
          )}
        </div>
        
        {/* Mobile Statistics */}
        <div className="mobile-stats">
          <GameStatistics />
        </div>
      </div>

      <style jsx>{`
        .game-container {
          position: relative;
        }

        /* Desktop Layout - Default hidden on mobile */
        .desktop-layout {
          display: none;
        }

        /* Mobile Layout - Default visible */
        .mobile-layout {
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
          gap: 0;
        }

        /* Mobile specific styles */
        .mobile-history {
          margin: 0 10px 8px 10px;
        }

        .mobile-mode-tabs {
          margin: 0 10px 8px 10px;
        }

        .mobile-chart {
          margin: 0 10px 8px 10px;
        }

        .mobile-betslip {
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-start-button,
        .mobile-start-autoplay,
        .mobile-bet-amount,
        .mobile-mines,
        .mobile-game-details,
        .mobile-auto-section {
          margin: 0;
        }

        .mobile-stats {
          margin: 8px 10px 0 10px;
        }

        /* Desktop styles - applied when screen is wide enough */
        @media (min-width: 820px) {
          .mobile-layout {
            display: none;
          }

          .desktop-layout {
            display: grid;
            grid-gap: 0;
            width: 100%;
            max-width: 880px;
            margin: 0 auto;
            padding: 0 10px 10px;
            padding-bottom: calc(20px + var(--safe-area-inset-bottom));
            grid-template:
              "modeTabs history" min-content
              "betslip chart" min-content
              "betslip range" max-content
              "stats stats" 1fr / 360px 1fr;
          }

          .mode-tabs {
            grid-area: modeTabs;
          }

          .history {
            grid-area: history;
          }

          .betslip {
            grid-area: betslip;
            display: flex;
            flex-direction: column;
          }

          .chart {
            grid-area: chart;
          }

          .stats {
            grid-area: stats;
          }
        }
      `}</style>
    </div>
  )
}
