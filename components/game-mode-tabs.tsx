"use client"

import { useState } from "react"

interface GameModeTabsProps {
  onModeChange?: (mode: "manual" | "auto") => void
}

export default function GameModeTabs({ onModeChange }: GameModeTabsProps) {
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual")

  const handleModeChange = (mode: "manual" | "auto") => {
    setActiveMode(mode)
    onModeChange?.(mode)
  }

  return (
    <div className="game-mode-tabs">
      <div className={`mode-btn ${activeMode === "manual" ? "active" : ""}`} onClick={() => handleModeChange("manual")}>
        <div className="mode-btn__inner">
          <div className="mode-btn__text">Manual</div>
          <div className="mode-btn__indicator"></div>
        </div>
      </div>
      <div className={`mode-btn ${activeMode === "auto" ? "active" : ""}`} onClick={() => handleModeChange("auto")}>
        <div className="mode-btn__inner">
          <div className="mode-btn__text">Auto</div>
          <div className="mode-btn__indicator"></div>
        </div>
      </div>

      <style jsx>{`
        .game-mode-tabs {
          margin: 5px 0 10px;
          display: flex;
        }

        @media (min-width: 820px) {
          .game-mode-tabs {
            margin-top: 0;
            padding-right: 20px;
          }
        }

        .mode-btn {
          cursor: pointer;
          flex: 1;
          height: 39px;
          padding: 1px;
          font-size: 13px;
          line-height: 0.85;
        }

        .mode-btn:first-child {
          margin-right: 5px;
        }

        .mode-btn.active {
          background-image: linear-gradient(273deg, rgba(141, 142, 143, 0.1) 0%, rgba(163, 165, 168, 0.4) 100%), 
                           radial-gradient(circle at 100% 90%, rgba(0, 0, 0, 0.3), rgba(11, 32, 51, 0) 70%);
          border-radius: 11px;
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, 0.4);
        }

        .mode-btn__inner {
          background-image: linear-gradient(273deg, #1d2023 0%, #2a2f34 100%);
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          height: 100%;
          display: flex;
          box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.48);
        }

        .mode-btn.active .mode-btn__inner {
          border: 1px solid #181b23;
        }

        .mode-btn__text {
          color: rgba(255, 255, 255, 0.5);
          margin-right: 5px;
          line-height: 0.85;
        }

        .mode-btn.active .mode-btn__text {
          color: #d6e1ef;
          font-weight: 800;
        }

        .mode-btn__indicator {
          background-image: linear-gradient(311deg, #5b666f 0%, #0b0f15 100%);
          border-radius: 4px;
          width: 8px;
          height: 8px;
          padding: 2px;
          position: relative;
        }

        .mode-btn__indicator::after {
          content: "";
          background-color: #292c2f;
          border-radius: 3px;
          width: 6px;
          height: 6px;
          position: absolute;
          top: 1px;
          left: 1px;
        }

        .mode-btn.active .mode-btn__indicator::after {
          background-image: radial-gradient(circle at 88% 115%, #81df49, #8de15e 70%);
        }
      `}</style>
    </div>
  )
}
