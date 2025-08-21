import GameHeader from "./game-header"
import GameContainer from "./game-container"

export default function GameModal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div
        className="w-full max-w-6xl rounded-lg overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(135deg, #2a2f35 0%, #1a1e22 50%, #12151a 100%)",
          maxHeight: "75vh",
          minHeight: "480px",
          width: "80vw",
          borderTop: "1px solid white",
          borderLeft: "1px solid white",
          borderRight: "4px solid white",
          borderBottom: "4px solid white",
        }}
      >
        <div className="flex flex-col overflow-y-auto h-full">
          <GameHeader />
          <GameContainer />
        </div>
      </div>
    </div>
  )
}
