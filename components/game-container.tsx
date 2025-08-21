"use client"

import GameModeTabs from "./game-mode-tabs"
import GameHistory from "./game-history"
import BetAmountInput from "./bet-amount-input"
import MinesSelector from "./mines-selector"
import StartGameButton from "./start-game-button"
import GameDetails from "./game-details"
import GameGrid from "./game-grid"
import GameStatistics from "./game-statistics"

export default function GameContainer() {
  return (
    <div className="game-container">
      <div className="game-container__content">
        <div className="game-container__left">
          <GameModeTabs />
          <BetAmountInput />
          <MinesSelector />
          <StartGameButton />
          <GameDetails />
        </div>
        <div className="game-container__right">
          <GameHistory />
          <GameGrid />
        </div>
      </div>

      <GameStatistics />

      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0 20px 20px 20px;
        }

        .game-container__content {
          display: flex;
          flex-direction: row;
          gap: 15px;
          margin-bottom: 20px;
        }

        .game-container__left {
          display: flex;
          flex-direction: column;
          flex: 0 0 40%;
        }

        .game-container__right {
          display: flex;
          flex-direction: column;
          flex: 0 0 60%;
        }

        @media (max-width: 819px) {
          .game-container__content {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  )
}
