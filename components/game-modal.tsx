import GameHeader from "./game-header"
import GameContainer from "./game-container"
import { GameProvider } from "../contexts/GameContext"

export default function GameModal() {
  return (
    <GameProvider>
      <div className="game-modal-wrapper">
        <div className="game-modal-content">
          <div className="flex flex-col overflow-y-auto h-full">
            <GameHeader />
            <GameContainer />
          </div>
        </div>

        <style jsx>{`
          /* Desktop layout */
          .game-modal-wrapper {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }

          .game-modal-content {
            width: 100%;
            max-width: 72rem;
            border-radius: 0.5rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, #2a2f35 0%, #1a1e22 50%, #12151a 100%);
            max-height: 74vh;
            min-height: 480px;
            width: 75vw;
            border-top: 1px solid white;
            border-left: 1px solid white;
            border-right: 4px solid white;
            border-bottom: 4px solid white;
          }

          /* Mobile layout - full screen, no borders, keep grey background */
          @media (max-width: 819px) {
            .game-modal-wrapper {
              position: relative;
              inset: auto;
              display: block;
              align-items: unset;
              justify-content: unset;
              padding: 0;
              min-height: 100vh;
            }

            .game-modal-content {
              width: 100%;
              max-width: none;
              border-radius: 0;
              background: linear-gradient(135deg, #2a2f35 0%, #1a1e22 50%, #12151a 100%);
              max-height: none;
              min-height: 100vh;
              border: none;
            }
          }
        `}</style>
      </div>
    </GameProvider>
  )
}
