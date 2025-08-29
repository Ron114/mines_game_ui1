"use client"

import { useState, useEffect } from "react"
import { useGame } from '../contexts/GameContext'

export default function MobileBetAmount() {
  const { betAmount, setBetAmount } = useGame()
  const [displayAmount, setDisplayAmount] = useState(betAmount.toString())
  const [showError, setShowError] = useState(false)
  
  useEffect(() => {
    setDisplayAmount(betAmount.toString())
  }, [betAmount])

  const handleMinClick = () => {
    setBetAmount(1)
    setDisplayAmount("1")
    setShowError(false)
  }
  
  const handleMaxClick = () => {
    setBetAmount(1000)
    setDisplayAmount("1000")
    setShowError(false)
  }
  
  const handleDecrease = () => {
    const current = betAmount
    const newValue = Math.max(1, current - 1)
    setBetAmount(newValue)
    setDisplayAmount(newValue.toString())
    setShowError(false)
  }
  
  const handleIncrease = () => {
    const current = betAmount
    const newValue = Math.min(1000, current + 1)
    setBetAmount(newValue)
    setDisplayAmount(newValue.toString())
    setShowError(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("$", "")
    setDisplayAmount(value)
    
    const numValue = Number.parseFloat(value) || 0
    setBetAmount(Math.min(1000, Math.max(1, numValue)))
    
    if (numValue < 1) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }

  return (
    <div className="input-text__wrapper">
      {/* Min Button */}
      <div className="input-button _sm" onClick={handleMinClick}>
        <div className="input-button__text">min</div>
      </div>

      {/* Decrease Button */}
      <div className="input-button _sm" onClick={handleDecrease}>
        <div className="input-button__text">-</div>
      </div>

      {/* Increase Button */}
      <div className="input-button _sm" onClick={handleIncrease}>
        <div className="input-button__text">+</div>
      </div>

      {/* Max Button */}
      <div className="input-button _sm" onClick={handleMaxClick}>
        <div className="input-button__text">max</div>
      </div>

      {/* Input Field */}
      <div className={`games-input__wrapper ${showError ? 'input--warning' : ''}`}>
        <label htmlFor="bet-amount-mobile">
          Bet Amount
          <span className="tooltip-box">
            <div className="tooltip-hint">Enter your bet amount</div>
          </span>
        </label>

        <input
          type="text"
          inputMode="decimal"
          id="bet-amount-mobile"
          autoComplete="off"
          spellCheck="false"
          tabIndex={-1}
          className="games-input__number"
          value={`$${displayAmount}`}
          onChange={handleInputChange}
        />

        {showError && (
          <footer className="error input--error">
            Minimum amount is $0.1
          </footer>
        )}
      </div>

      <style jsx>{`
        .input-text__wrapper {
          position: relative;
        }

        /* Button positioning */
        .input-text__wrapper .input-button:first-child {
          left: 4px;
        }

        .input-text__wrapper .input-button:nth-child(2) {
          left: 52px;
        }

        .input-text__wrapper .input-button:nth-child(3) {
          right: 52px;
        }

        .input-text__wrapper .input-button:nth-child(4) {
          right: 4px;
        }

        .input-text__wrapper .input-button {
          z-index: 3;
          position: absolute;
          top: 4px;
        }

        .input-button {
          cursor: pointer;
          background-image: linear-gradient(135deg, #282c31 0%, #1e2125 100%);
          border-radius: 8px;
          justify-content: center;
          align-items: center;
          height: 44px;
          display: flex;
          box-shadow: 3px 3px 4px rgba(10, 9, 9, .4);
        }

        .input-button._sm {
          width: 44px;
        }

        .input-button__text {
          opacity: .6;
          color: #fff;
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.45;
        }

        /* Warning state */
        .input--warning {
          background-image: linear-gradient(98deg, #e17671 -81%, rgba(49, 20, 20, .07) 182%);
          margin-bottom: 40px;
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

        /* Label positioning */
        .input-text__wrapper .games-input__wrapper label {
          left: 50%;
          transform: translate(-50%);
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

        /* Tooltip */
        .games-input__wrapper label .tooltip-box {
          position: absolute;
          top: 0;
          right: -11px;
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
          position: relative;
        }

        .tooltip-hint {
          z-index: -2;
          cursor: default;
          white-space: nowrap;
          color: #fff;
          visibility: hidden;
          opacity: 0;
          background-color: #40444a;
          border-radius: 2px;
          padding: 4px 7px;
          font-size: 10px;
          line-height: 16px;
          position: absolute;
          bottom: calc(100% + 5px);
          left: 50%;
          transform: translate(-50%);
          transition: visibility 0s, opacity 0.3s;
        }

        .tooltip-hint:after {
          content: "";
          border: 5px solid transparent;
          border-top-color: #40444a;
          border-bottom: none;
          width: 0;
          height: 0;
          display: block;
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translate(-50%);
        }

        .tooltip-box:hover .tooltip-hint {
          visibility: visible;
          opacity: 1;
          z-index: 10;
        }

        /* Input styling */
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
          text-align: center;
        }

        /* Error message */
        .error.input--error {
          color: #ff6b6b;
          font-size: 10px;
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 819px) {
          .games-input__wrapper {
            height: 48px;
            margin-bottom: 0;
          }

          .games-input__wrapper label {
            font-size: 10px;
            top: 10px;
          }

          .games-input__number {
            font-size: 13px;
            padding: 26px 16px 8px 16px;
          }

          .input-button {
            height: 40px;
          }

          .input-button__text {
            font-size: 10px;
          }

          .input-text__wrapper .input-button {
            top: 4px;
          }
        }
      `}</style>
    </div>
  )
}
