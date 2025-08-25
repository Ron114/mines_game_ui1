"use client"

import { useState } from "react"
import GameModeTabs from "./game-mode-tabs"
import GameHistory from "./game-history"
import BetAmountInput from "./bet-amount-input"
import MinesSelector from "./mines-selector"
import StartGameButton from "./start-game-button"
import AutoBetSection from "./auto-bet-section"
import GameDetails from "./game-details"
import GameGrid from "./game-grid"
import GameStatistics from "./game-statistics"

export default function GameContainer() {
  const [gameMode, setGameMode] = useState<"manual" | "auto">("manual")
  return (
    <div className="game-container mt-2">
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

      <style jsx>{`
        .game-container {
          padding: 0 10px 10px;
          padding-bottom: calc(20px + var(--safe-area-inset-bottom));
          position: relative;
        }

        @media (min-width: 820px) {
          .game-container {
            grid-gap: 0;
            width: 100%;
            max-width: 880px;
            margin: 0 auto;
            display: grid;
            grid-template:
              "modeTabs history" min-content
              "betslip chart" min-content
              "betslip range" max-content
              "stats stats" 1fr / 360px 1fr;
          }
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

        @media (max-width: 819px) {
          .game-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  )
}
