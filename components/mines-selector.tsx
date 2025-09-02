"use client"

import { useState, useEffect } from "react"
import { useGame } from '../contexts/GameContext'
import { useAudioContext } from '../contexts/AudioContext'

export default function MinesSelector() {
  const { selectedMines, setSelectedMines, gameState } = useGame()
  const { playSound } = useAudioContext()
  const [customMines, setCustomMines] = useState(selectedMines.toString())
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  // Disable when game is active or in cashout state
  const isDisabled = gameState === 'active' || gameState === 'cashout'
  
  useEffect(() => {
    setCustomMines(selectedMines.toString())
    // Clear error when selectedMines changes via buttons
    if (selectedMines >= 2 && selectedMines <= 24) {
      setShowError(false)
    }
  }, [selectedMines])

  const handleMineSelect = (mines: number) => {
    if (isDisabled) return
    playSound('/assets/audio/difficulty.mp3')
    setSelectedMines(mines)
    setCustomMines(mines.toString())
  }

  const handleDecrease = () => {
    if (isDisabled) return
    playSound('/assets/audio/difficulty.mp3')
    const current = Math.max(2, selectedMines - 1)
    if (current >= 2 && current <= 24) {
      setSelectedMines(current)
      setShowError(false)
    } else {
      setShowError(true)
      setErrorMessage('Please choose from 2 to 24 mines')
    }
    setCustomMines(current.toString())
  }

  const handleIncrease = () => {
    if (isDisabled) return
    playSound('/assets/audio/difficulty.mp3')
    const current = Math.min(24, selectedMines + 1)
    if (current >= 2 && current <= 24) {
      setSelectedMines(current)
      setShowError(false)
    } else {
      setShowError(true)
      setErrorMessage('Please choose from 2 to 24 mines')
    }
    setCustomMines(current.toString())
  }

  return (
    <div className={`settings-input__wrapper _mines ${isDisabled ? '_disabled' : ''}`}>
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
              if (isDisabled) return
              
              const input = e.target.value
              
              // Allow only numbers (and empty string for backspace)
              if (input !== '' && !/^[0-9]+$/.test(input)) {
                return // Reject non-numeric input
              }
              
              // Allow empty string for user to clear and type
              if (input === '') {
                setCustomMines('')
                setShowError(false)
                return
              }
              
              const value = parseInt(input)
              
              // Cap at maximum 25
              if (value > 25) {
                setCustomMines('25')
                setShowError(true)
                setErrorMessage('Please choose from 2 to 24 mines')
                return
              }
              
              // Set the input value
              setCustomMines(input)
              
              // Check if value is in valid range (2-24)
              if (value >= 2 && value <= 24) {
                setSelectedMines(value)
                setShowError(false)
              } else {
                // Show error but allow the input
                setShowError(true)
                setErrorMessage('Please choose from 2 to 24 mines')
                if (value >= 2 && value <= 24) {
                  setSelectedMines(value)
                }
              }
            }}
            onBlur={() => {
              // Handle empty input on blur
              if (customMines === '') {
                setCustomMines('2')
                setSelectedMines(2)
                setShowError(false)
              }
            }}
            className="games-input__number"
            autoComplete="off"
            spellCheck="false"
            disabled={isDisabled}
          />
          {showError && (
            <div className="input--error">
              {errorMessage}
            </div>
          )}
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
          margin-bottom: 35px;
          display: flex;
          transition: opacity 0.3s ease;
        }
        
        /* Desktop compact styles */
        @media (min-width: 820px) {
          .settings-input__wrapper._mines {
            margin-bottom: 28px;
          }
          
          .settings-input__wrapper._mines .button {
            height: 35px;
            top: 1px;
            width: 36px;
          }
          
          .settings-input__wrapper._mines .games-input__wrapper {
            height: 37px;
          }
          
          .settings-input__wrapper._mines .games-input__wrapper label {
            font-size: 8px;
            top: 7px;
          }
          
          .settings-input__wrapper._mines .games-input__wrapper input {
            font-size: 13px;
            padding-top: 18px;
          }
          
          .button__text {
            font-size: 8px;
          }
        }

        .settings-input__wrapper._mines._disabled {
          opacity: 0.4;
          pointer-events: none;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .settings-input__wrapper._mines {
            margin-bottom: 35px;
            height: 42px;
          }

          .settings-input__wrapper._mines .button {
            height: 40px;
            top: 2px;
          }

          .settings-input__wrapper._mines .games-input__wrapper {
            height: 42px;
          }

          .settings-input__wrapper._mines .games-input__wrapper label {
            font-size: 9px;
            top: 8px;
          }

          .settings-input__wrapper._mines .games-input__wrapper input {
            font-size: 15px;
            padding-top: 22px;
          }

          .button__text {
            font-size: 10px;
          }
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
          left: 41px;
        }

        .settings-input__wrapper._mines .button:nth-child(3) {
          left: 79px;
        }

        .settings-input__wrapper._mines .button:nth-child(5) {
          right: 79px;
        }

        .settings-input__wrapper._mines .button:nth-child(6) {
          right: 41px;
        }

        .settings-input__wrapper._mines .button:nth-child(7) {
          right: 3px;
        }
        
        /* Desktop positioning adjustments */
        @media (min-width: 820px) {
          .settings-input__wrapper._mines .button:nth-child(2) {
            left: 40px;
          }

          .settings-input__wrapper._mines .button:nth-child(3) {
            left: 77px;
          }

          .settings-input__wrapper._mines .button:nth-child(5) {
            right: 77px;
          }

          .settings-input__wrapper._mines .button:nth-child(6) {
            right: 40px;
          }
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

        .input--error {
          color: rgba(227, 113, 113, .64);
          text-align: left;
          width: 100%;
          padding: 0 17px 8px 17px;
          font-size: 11px;
          line-height: .91;
          display: block;
          position: absolute;
          bottom: -27px;
          left: 0;
        }
      `}</style>
    </div>
  )
}
