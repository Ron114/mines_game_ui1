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
      <div className="settings-input__wrapper-inner">
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

        <div className="games-input__wrapper">
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
          background: linear-gradient(98deg, rgba(200, 213, 225, .25) 0%, transparent 100%);
          border-radius: 11px;
          padding: 1px;
          position: relative;
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
          margin-bottom: 8px;
          display: flex;
        }

        .settings-input__wrapper-inner {
          background-image: linear-gradient(315deg, #16191d 0%, #252a2e 100%);
          border-radius: 10px;
          flex: 1;
          padding: 1px;
          display: flex;
          position: relative;
        }

        .settings-input__wrapper._mines .button:first-child {
          left: 3px;
        }

        .settings-input__wrapper._mines .button:nth-child(2) {
          left: 47px;
        }

        .settings-input__wrapper._mines .button:nth-child(3) {
          left: 91px;
        }

        .settings-input__wrapper._mines .button:nth-child(5) {
          right: 91px;
        }

        .settings-input__wrapper._mines .button:nth-child(6) {
          right: 47px;
        }

        .settings-input__wrapper._mines .button:nth-child(7) {
          right: 3px;
        }

        .settings-input__wrapper._mines .button {
          z-index: 1;
          border-radius: 7px;
          height: 45px;
          position: absolute;
          top: 3px;
        }

        .button {
          cursor: pointer;
          border-radius: 6px;
          height: 46px;
          padding: 1px;
          transition: opacity .5s cubic-bezier(.075,.82,.165,1);
          display: flex;
          background: none;
          border: none;
        }

        .button._sm {
          width: 44px;
        }

        .settings-input__wrapper._mines .button._golden {
          box-shadow: none;
          background-color: transparent;
          background-image: none;
        }

        .settings-input__wrapper._mines .button._golden .button__inner {
          background-color: rgba(209, 116, 72, .1);
          background-image: none;
          border: 1px solid #a35231;
          box-shadow: -1px -1px 10px rgba(141, 68, 37, .15);
        }

        .settings-input__wrapper._mines .button._golden .button__text {
          color: #d26d3d;
        }

        .settings-input__wrapper._mines .button:first-child .button__inner {
          box-shadow: 3px 3px 4px rgba(10, 9, 9, .4);
        }

        .settings-input__wrapper._mines .button__inner {
          border-radius: 7px;
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

        .settings-input__wrapper._mines .games-input__wrapper {
          background: radial-gradient(39.88% 38.48% at 50% 109.2%, #ba6238 0%, rgba(12, 12, 14, 0) 100%), radial-gradient(39.64% 68.64% at 50% -18.72%, #ba6238 0%, rgba(12, 12, 14, 0) 100%), #0c0c0e;
          border-radius: 9px;
          height: 47px;
        }

        .settings-input__wrapper .games-input__wrapper {
          width: 100%;
          margin: 0 !important;
        }

        .games-input__wrapper {
          background: linear-gradient(98deg, rgba(200, 213, 225, .25) 0%, transparent 100%);
          border-radius: 11px;
          height: 52px;
          margin-bottom: 20px;
          position: relative;
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
          transition: opacity .5s cubic-bezier(.075,.82,.165,1);
        }

        .settings-input__wrapper._mines .games-input__wrapper label {
          color: #d26d3d;
          justify-content: center;
          font-size: 10px;
          top: 10px;
          left: 50%;
          transform: translate(-50%);
        }

        .settings-input__wrapper label {
          align-items: center;
          min-width: 87px;
          display: flex;
        }

        .games-input__wrapper label {
          z-index: 1;
          color: rgba(255, 255, 255, .5);
          font-size: 11px;
          line-height: .91;
          position: absolute;
          top: 12px;
          left: 18px;
        }

        .settings-input__wrapper._mines .games-input__wrapper input {
          text-align: center;
          color: #d26d3d;
          background-color: #0c0c0e;
          background-image: none;
          border: none;
          padding-top: 25px;
          font-size: 17px;
          font-weight: 700;
        }

        .games-input__wrapper label + .games-input__number {
          padding-top: 30px;
        }

        .games-input__number {
          color: #d6e1ef;
          background-color: transparent;
          background-image: linear-gradient(135deg, #222326 0%, #222326 25%, #283034 100%);
          border: 1px solid #202328;
          border-radius: 10px;
          outline: none;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.14;
          position: absolute;
          top: 1px;
          left: 1px;
          box-shadow: inset -2px -2px 10px rgba(255, 255, 255, .05), inset 2px 3px 10px #070709;
        }
      `}</style>
    </div>
  )
}
