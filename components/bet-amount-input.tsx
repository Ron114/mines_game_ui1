"use client"

import { useState, useEffect } from "react"
import { useGame } from '../contexts/GameContext'

export default function BetAmountInput() {
  const { betAmount, setBetAmount, gameState, tileStates } = useGame()
  const [displayAmount, setDisplayAmount] = useState(betAmount.toString())
  
  // Disable after first tile is clicked (when tileStates has any entries)
  const hasClickedTile = Object.keys(tileStates).length > 0
  const isDisabled = hasClickedTile && (gameState === 'active' || gameState === 'cashout')
  
  useEffect(() => {
    setDisplayAmount(betAmount.toString())
  }, [betAmount])

  const handleMinClick = () => {
    if (isDisabled) return
    setBetAmount(1)
    setDisplayAmount("1")
  }
  const handleMaxClick = () => {
    if (isDisabled) return
    setBetAmount(1000)
    setDisplayAmount("1000")
  }
  const handleDecrease = () => {
    if (isDisabled) return
    const current = Math.max(1, betAmount - 1)
    setBetAmount(current)
    setDisplayAmount(current.toString())
  }
  const handleIncrease = () => {
    if (isDisabled) return
    const current = Math.min(1000, betAmount + 1)
    setBetAmount(current)
    setDisplayAmount(current.toString())
  }

  return (
    <div className={`input-text__wrapper ${isDisabled ? '_disabled' : ''}`}>
      <div className="games-input__wrapper">
        <label htmlFor="bet-amount">
          Bet Amount
          <span className="tooltip-box">i</span>
        </label>
        <input
          id="bet-amount"
          type="text"
          inputMode="decimal"
          value={`$${displayAmount}`}
          onChange={(e) => {
            if (isDisabled) return
            const value = e.target.value.replace("$", "")
            setDisplayAmount(value)
            const numValue = Number.parseFloat(value) || 0
            setBetAmount(Math.min(1000, Math.max(1, numValue)))
          }}
          className="games-input__number"
          autoComplete="off"
          spellCheck="false"
          tabIndex={-1}
          disabled={isDisabled}
        />
      </div>

      <div className="control-buttons">
        <button className="button _sm" onClick={handleMinClick}>
          <div className="button__inner">
            <div className="button__text">min</div>
          </div>
        </button>

        <button className="button _sm" onClick={handleDecrease}>
          <div className="button__inner">
            <div className="button__text">-</div>
          </div>
        </button>

        <button className="button _sm" onClick={handleIncrease}>
          <div className="button__inner">
            <div className="button__text">+</div>
          </div>
        </button>

        <button className="button _sm" onClick={handleMaxClick}>
          <div className="button__inner">
            <div className="button__text">max</div>
          </div>
        </button>
      </div>

      <style jsx>{`
        .input-text__wrapper {
          margin-bottom: 20px;
          transition: opacity 0.3s ease;
        }

        .input-text__wrapper._disabled {
          opacity: 0.4;
          pointer-events: none;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .input-text__wrapper {
            margin-bottom: 0;
          }

          .games-input__wrapper {
            height: 48px;
            margin-bottom: 8px;
          }

          .games-input__wrapper label {
            font-size: 10px;
            top: 10px;
          }

          .games-input__number {
            font-size: 13px;
            padding: 26px 16px 8px 16px;
          }

          .button {
            height: 22px;
          }

          .button__text {
            font-size: 10px;
          }
        }

        .games-input__wrapper {
          background: linear-gradient(98deg, rgba(200, 213, 225, .25) 0%, transparent 100%);
          border-radius: 11px;
          height: 52px;
          margin-bottom: 12px;
          position: relative;
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
          transition: opacity .5s cubic-bezier(.075,.82,.165,1);
        }

        .games-input__wrapper label {
          z-index: 1;
          color: rgba(255, 255, 255, .5);
          font-size: 11px;
          line-height: .91;
          position: absolute;
          top: 12px;
          left: 18px;
          display: flex;
          align-items: center;
        }

        .tooltip-box {
          color: rgba(255, 255, 255, .5);
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, .5);
          border-radius: 4px;
          justify-content: center;
          align-items: center;
          width: 8px;
          height: 8px;
          font-size: 6px;
          font-weight: 700;
          display: flex;
          position: absolute;
          top: 0;
          right: -11px;
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
          padding: 30px 16px 10px 16px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.14;
          position: absolute;
          top: 1px;
          left: 1px;
          box-shadow: inset -2px -2px 10px rgba(255, 255, 255, .05), inset 2px 3px 10px #070709;
          text-align: left;
        }

        .control-buttons {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .button {
          cursor: pointer;
          border-radius: 6px;
          height: 24px;
          padding: 1px;
          transition: opacity .5s cubic-bezier(.075,.82,.165,1);
          display: flex;
          background: none;
          border: none;
          flex: 1;
        }

        .button._sm {
          min-width: 44px;
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
      `}</style>
    </div>
  )
}
