"use client"

import { useState } from "react"

export default function MinesSelector() {
  const [selectedMines, setSelectedMines] = useState(3)
  const [customMines, setCustomMines] = useState("3")

  const handleMineSelect = (mines: number) => {
    setSelectedMines(mines)
    setCustomMines(mines.toString())
  }

  const handleDecrease = () => {
    const current = Math.max(1, selectedMines - 1)
    setSelectedMines(current)
    setCustomMines(current.toString())
  }

  const handleIncrease = () => {
    const current = Math.min(24, selectedMines + 1)
    setSelectedMines(current)
    setCustomMines(current.toString())
  }

  return (
    <div className="settings-input__wrapper _mines">
      <div className="mines-buttons-container">
        <button className={`button _sm ${selectedMines === 3 ? "_active" : ""}`} onClick={() => handleMineSelect(3)}>
          <div className="button__inner">
            <div className="button__text">3</div>
          </div>
        </button>

        <button className={`button _sm ${selectedMines === 5 ? "_active" : ""}`} onClick={() => handleMineSelect(5)}>
          <div className="button__inner">
            <div className="button__text">5</div>
          </div>
        </button>

        <button className="button _sm _golden" onClick={handleDecrease}>
          <div className="button__inner">
            <div className="button__text">-</div>
          </div>
        </button>

        <div className="mines-input-center">
          <label htmlFor="mines">Mines</label>
          <input
            id="mines"
            name="mines"
            type="text"
            value={customMines}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value) || 1
              setCustomMines(e.target.value)
              setSelectedMines(Math.min(24, Math.max(1, value)))
            }}
            className="games-input__number"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <button className="button _sm _golden" onClick={handleIncrease}>
          <div className="button__inner">
            <div className="button__text">+</div>
          </div>
        </button>

        <button className={`button _sm ${selectedMines === 10 ? "_active" : ""}`} onClick={() => handleMineSelect(10)}>
          <div className="button__inner">
            <div className="button__text">10</div>
          </div>
        </button>

        <button className={`button _sm ${selectedMines === 20 ? "_active" : ""}`} onClick={() => handleMineSelect(20)}>
          <div className="button__inner">
            <div className="button__text">20</div>
          </div>
        </button>
      </div>

      <style jsx>{`
        .settings-input__wrapper._mines {
          background: #000000;
          border-radius: 11px;
          padding: 3px;
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
          margin-bottom: 20px;
        }

        .mines-buttons-container {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 45px;
        }

        .button {
          cursor: pointer;
          border-radius: 7px;
          height: 45px;
          padding: 1px;
          transition: opacity .5s cubic-bezier(.075,.82,.165,1);
          display: flex;
          background: none;
          border: none;
        }

        .button._sm {
          width: 44px;
        }

        .button._golden {
          box-shadow: none;
          background-color: transparent;
          background-image: none;
        }

        .button._golden .button__inner {
          background-image: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          border: 1px solid #d26d3d;
        }

        .button._golden .button__text {
          color: #d26d3d;
        }

        .button._active .button__text {
          color: #d26d3d;
        }

        .button__inner {
          background-image: linear-gradient(135deg, #292d32 0%, #1d2024 100%);
          border-radius: 5px;
          flex: 1;
          justify-content: center;
          align-items: center;
          height: 100%;
          display: flex;
          box-shadow: 3px 3px 4px rgba(10, 9, 9, .4);
        }

        .button__text {
          opacity: .6;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.45;
        }

        .mines-input-center {
          flex: 1;
          position: relative;
          height: 39px;
          margin: 0 4px;
        }

        .mines-input-center label {
          color: #d26d3d;
          font-size: 10px;
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }

        .games-input__number {
          text-align: center;
          color: #d26d3d;
          background-color: #0c0c0e;
          border: 1px solid #1e2122;
          padding-top: 18px;
          font-size: 17px;
          font-weight: 700;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          outline: none;
        }
      `}</style>
    </div>
  )
}
