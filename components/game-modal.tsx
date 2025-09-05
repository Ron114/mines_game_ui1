import GameHeader from "./game-header"
import GameContainer from "./game-container"
import { GameProvider } from "../contexts/GameContext"
import { AudioProvider } from "../contexts/AudioContext"

export default function GameModal() {
  return (
    <GameProvider>
      <AudioProvider>
        <div className="game-modal-wrapper">
          <div className="game-modal-content">
            <div className="flex flex-col overflow-y-auto h-full">
              <GameHeader />
              <GameContainer />
            </div>
          </div>

        <style jsx>{`
          .flex.flex-col.overflow-y-auto.h-full {
            scrollbar-width: none; 
            -ms-overflow-style: none; 
          }
          
          .flex.flex-col.overflow-y-auto.h-full::-webkit-scrollbar {
            display: none; 
          }

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
            max-width: 75rem;
            border-radius: 0.5rem;
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
              height: 100vh;
              /* Prevent overscroll and pull-to-refresh */
              overscroll-behavior: none;
              overflow: hidden;
            }

            .game-modal-content {
              width: 100%;
              max-width: none;
              border-radius: 0;
              background: linear-gradient(135deg, #2a2f35 0%, #1a1e22 50%, #12151a 100%);
              max-height: none;
              min-height: 100vh;
              height: 100vh;
              border: none;
              /* Prevent overscroll and pull-to-refresh */
              overscroll-behavior: none;
            }
            
            .flex.flex-col.overflow-y-auto.h-full {
              /* Allow internal scrolling but prevent overscroll */
              overscroll-behavior: contain;
              height: 100vh;
              overflow-y: auto;
              overflow-x: hidden;
            }
          }
        `}</style>
        </div>
      </AudioProvider>
    </GameProvider>
  )
}
