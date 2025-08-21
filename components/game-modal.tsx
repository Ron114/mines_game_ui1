import GameHeader from "./game-header"
import GameContainer from "./game-container"

export default function GameModal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div
        className="w-full max-w-6xl border border-white rounded-lg overflow-hidden flex flex-col"
        style={{
          backgroundColor: "var(--modal-bg-color)",
          maxHeight: "90vh",
          minHeight: "600px",
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
