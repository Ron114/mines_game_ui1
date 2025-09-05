"use client"

import { useState } from "react"
import { useGame } from '../contexts/GameContext'
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
  const { setIsAutoMode, resetAutoPlayState } = useGame()

  const handleModeChange = (mode: "manual" | "auto") => {
    setGameMode(mode)
    setIsAutoMode(mode === "auto")
    if (mode === "manual") {
      resetAutoPlayState()
    }
  }

  return (
    <div className="game-container md:mt-4 mt-2">
      <div className="desktop-layout">
        <div className="mode-tabs">
          <GameModeTabs onModeChange={handleModeChange} />
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

      <div className="mobile-layout">
        <div className="mobile-history">
          <GameHistory />
        </div>

        <div className="mobile-mode-tabs">
          <GameModeTabs onModeChange={handleModeChange} />
        </div>

        <div className="mobile-chart">
          <GameGrid />
        </div>

        <div className="mobile-betslip">
          {gameMode === "manual" ? (
            <div className="mobile-start-button">
              <StartGameButton />
            </div>
          ) : (
            <div className="mobile-start-autoplay">
              <StartAutoplayButton />
            </div>
          )}

          <div className="mobile-bet-amount">
            <MobileBetAmount />
          </div>

          <div className="mobile-mines">
            <MinesSelector />
          </div>

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

        <div className="mobile-stats md:p-0">
          <GameStatistics />
          <span className="md:hidden block">Toap on any bet to see details</span>
        </div>

      </div>

      <style jsx>{`
        .game-container {
          position: relative;
        }

        .desktop-layout {
          display: none;
        }

        .mobile-layout {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
          gap: 0;
          top: 0;
          bottom: 0
        }

        .mobile-history {
          margin: 0 0 8px 0;
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
          gap: 0;
        }

        .mobile-start-button,
        .mobile-start-autoplay {
          margin: 0 0 16px 0;
        }

        .mobile-bet-amount {
          margin: 0 0 16px 0;
        }

        .mobile-mines {
          margin: 0 0 8px 0;
        }

        .mobile-game-details {
          margin: 8px 0 0 0;
        }

        .mobile-auto-section {
          margin: 0;
        }

        .mobile-stats {
          margin: 16px 10px 0 10px;
          position: relative
        }

        .mobile-stats span {
          font-size: 10px;
          color: #8a9ba8;
          text-align: center;
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
        }

        @media (min-width: 820px) {
          .mobile-layout {
            display: none;
          }

          .desktop-layout {
            display: grid;
            grid-gap: 0;
            width: 100%;
            max-width: 950px;
            margin: 0 auto;
            padding: 0 10px 10px;
            padding-bottom: calc(20px + var(--safe-area-inset-bottom));
            grid-template:
              "modeTabs history" min-content
              "betslip chart" min-content
              "betslip range" max-content
              "stats stats" 1fr / 340px 1fr;
            column-gap: 20px;
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
