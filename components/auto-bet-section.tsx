"use client"

import { useState, useEffect } from "react"
import { useAudioContext } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import StartAutoplayButton from './start-autoplay-button'

export default function AutoBetSection() {
  const { playSound } = useAudioContext()
  const { autoPlayConfig, setAutoPlayConfig, isAutoPlaying } = useGame()
  
  const [numberOfRounds, setNumberOfRounds] = useState("0")
  const [onWinAmount, setOnWinAmount] = useState("0")
  const [onLossAmount, setOnLossAmount] = useState("0")
  const [onWinMode, setOnWinMode] = useState<"reset" | "increase">("reset")
  const [onLossMode, setOnLossMode] = useState<"reset" | "increase">("reset")
  const [stopAtAnyWin, setStopAtAnyWin] = useState(autoPlayConfig.stopAtAnyWin)
  
  // Update local state when context changes (except for default values)
  useEffect(() => {
    setOnWinMode(autoPlayConfig.onWinMode)
    setOnLossMode(autoPlayConfig.onLossMode)
    setStopAtAnyWin(autoPlayConfig.stopAtAnyWin)
  }, [autoPlayConfig])
  

  const handleWinModeChange = (mode: "reset" | "increase") => {
    if (isAutoPlaying) return // Disable during auto-play
    playSound('/assets/audio/button_click.mp3')
    setOnWinMode(mode)
    const newAmount = mode === "reset" ? "0" : "100"
    setOnWinAmount(newAmount)
    
    // Update context immediately
    setAutoPlayConfig({
      ...autoPlayConfig,
      onWinMode: mode,
      onWinAmount: parseInt(newAmount) || 0
    })
  }

  const handleLossModeChange = (mode: "reset" | "increase") => {
    if (isAutoPlaying) return // Disable during auto-play
    playSound('/assets/audio/button_click.mp3')
    setOnLossMode(mode)
    const newAmount = mode === "reset" ? "0" : "100"
    setOnLossAmount(newAmount)
    
    // Update context immediately
    setAutoPlayConfig({
      ...autoPlayConfig,
      onLossMode: mode,
      onLossAmount: parseInt(newAmount) || 0
    })
  }

  const handleStopAtWinChange = (checked: boolean) => {
    if (isAutoPlaying) return // Disable during auto-play
    playSound('/assets/audio/button_click.mp3')
    setStopAtAnyWin(checked)
    
    // Update context immediately
    setAutoPlayConfig({
      ...autoPlayConfig,
      stopAtAnyWin: checked
    })
  }

  return (
    <div className={`game-autobet ${isAutoPlaying ? '_disabled' : ''}`}>
      {/* Number of rounds */}
      <div className="settings-input__wrapper">
        <div className="games-input__wrapper">
          <label htmlFor="numberOfRounds">Number of rounds</label>
          <input
            id="numberOfRounds"
            type="number"
            autoComplete="off"
            spellCheck="false"
            tabIndex={-1}
            className="games-input__number"
            value={numberOfRounds}
            onChange={(e) => {
              if (isAutoPlaying) return // Disable during auto-play
              setNumberOfRounds(e.target.value)
              const rounds = e.target.value === "" ? 0 : parseInt(e.target.value) || 0
              setAutoPlayConfig({
                ...autoPlayConfig,
                numberOfRounds: rounds
              })
            }}
            disabled={isAutoPlaying}
          />
        </div>
        <span className="indicator__infinity">∞</span>
      </div>

      {/* When Winning */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_win">When Winning</label>
        
        <div 
          className={`input-button _md ${onWinMode === "reset" ? "active" : ""} ${isAutoPlaying ? "_disabled" : ""}`}
          onClick={() => handleWinModeChange("reset")}
        >
          <div className="input-button__text">Reset</div>
        </div>

        <div 
          className={`input-button _md ${onWinMode === "increase" ? "active" : ""} ${isAutoPlaying ? "_disabled" : ""}`}
          onClick={() => handleWinModeChange("increase")}
        >
          <div className="input-button__text">Increase by</div>
        </div>

        <div className="games-input__wrapper">
          <input
            id="on_win"
            name="on_win"
            type="number"
            autoComplete="off"
            spellCheck="false"
            tabIndex={-1}
            className={`games-input__number ${onWinAmount === "0" ? "_grey" : ""}`}
            max="999"
            value={onWinAmount}
            onChange={(e) => {
              if (isAutoPlaying) return // Disable during auto-play
              setOnWinAmount(e.target.value)
              setAutoPlayConfig({
                ...autoPlayConfig,
                onWinAmount: parseInt(e.target.value) || 0
              })
            }}
            disabled={isAutoPlaying}
          />
        </div>
        <span className="indicator">%</span>
      </div>

      {/* When Losing */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_loss">When Losing</label>
        
        <div 
          className={`input-button _md ${onLossMode === "reset" ? "active" : ""} ${isAutoPlaying ? "_disabled" : ""}`}
          onClick={() => handleLossModeChange("reset")}
        >
          <div className="input-button__text">Reset</div>
        </div>

        <div 
          className={`input-button _md ${onLossMode === "increase" ? "active" : ""} ${isAutoPlaying ? "_disabled" : ""}`}
          onClick={() => handleLossModeChange("increase")}
        >
          <div className="input-button__text">Increase by</div>
        </div>

        <div className="games-input__wrapper">
          <input
            id="on_loss"
            name="on_loss"
            type="number"
            autoComplete="off"
            spellCheck="false"
            tabIndex={-1}
            className={`games-input__number ${onLossAmount === "0" ? "_grey" : ""}`}
            max="999"
            value={onLossAmount}
            onChange={(e) => {
              if (isAutoPlaying) return // Disable during auto-play
              setOnLossAmount(e.target.value)
              setAutoPlayConfig({
                ...autoPlayConfig,
                onLossAmount: parseInt(e.target.value) || 0
              })
            }}
            disabled={isAutoPlaying}
          />
        </div>
        <span className="indicator">%</span>
      </div>

      {/* Stop at any Win */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_any_win">Stop at any Win</label>
        
        <div className={`switcher ${isAutoPlaying ? '_disabled' : ''}`}>
          <div className={`switcher__inner ${stopAtAnyWin ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              id="on_any_win" 
              className="switcher__input"
              checked={stopAtAnyWin}
              onChange={(e) => handleStopAtWinChange(e.target.checked)}
              disabled={isAutoPlaying}
            />
            <label htmlFor="on_any_win" className="switcher__label"></label>
          </div>
        </div>
      </div>

      {/* Start Autoplay Button */}
      <StartAutoplayButton />

      <style jsx>{`
        .game-autobet {
          margin-bottom: 20px;
          transition: opacity 0.3s ease;
        }
        
        .game-autobet._disabled {
          opacity: 0.4;
        }
        
        /* Desktop compact styles */
        @media (min-width: 820px) {
          .game-autobet {
            margin-bottom: 16px;
          }
          
          .settings-input__wrapper {
            margin-bottom: 16px;
          }
          
          .settings-input__wrapper:first-child {
            margin-bottom: 10px;
          }
          
          .settings-input__wrapper:nth-child(2) {
            margin-bottom: 9px;
          }
          
          .settings-input__wrapper._has_btn label {
            font-size: 11px;
            min-width: 90px;
          }
          
          .games-input__wrapper {
            height: 44px;
          }
          
          .games-input__wrapper label {
            font-size: 9px;
            top: 9px;
          }
          
          .games-input__number {
            font-size: 12px;
            padding: 24px 16px 8px 16px;
          }
          
          .input-button {
            height: 36px;
          }
          
          .input-button._md {
            width: 72px;
          }
          
          .input-button__text {
            font-size: 9px;
          }
          
          .indicator {
            font-size: 12px;
          }
        }

        /* Mobile auto tab border */
        .game-autobet::before {
          content: "";
          display: none;
          background-color: rgba(128, 128, 128, .3);
          border-radius: 2px;
          height: 1px;
          margin-bottom: 15px;
          box-shadow: 0 -1px 1px rgba(83, 89, 102, .3);
        }

        @media (max-width: 819px) {
          .game-autobet::before {
            display: block;
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .game-autobet {
            margin-bottom: 0;
          }

          .settings-input__wrapper {
            margin-bottom: 12px;
          }

          .settings-input__wrapper:first-child {
            margin-bottom: 8px;
          }

          .settings-input__wrapper:nth-child(2) {
            margin-bottom: 8px;
          }

          .settings-input__wrapper._has_btn label {
            font-size: 12px;
            min-width: 100px;
          }

          .games-input__wrapper {
            height: 48px;
            margin-bottom: 12px;
          }

          .games-input__wrapper label {
            font-size: 10px;
            top: 10px;
          }

          .games-input__number {
            font-size: 13px;
          }

          .input-button {
            height: 40px;
          }

          .input-button._md {
            width: 70px;
          }

          .input-button__text {
            font-size: 10px;
          }

          .switcher {
            height: 1.5rem;
            margin-right: 0.75rem;
          }

          .switcher__label {
            width: 2.25rem;
            height: 1.375rem;
            min-width: 2.25rem !important;
          }

          .switcher__label:after {
            width: 1.25rem;
            height: 1.25rem;
          }


        }

        .settings-input__wrapper {
          margin-bottom: 20px;
          display: flex;
          position: relative;
        }

        .settings-input__wrapper:first-child {
          margin-bottom: 12px;
        }

        .settings-input__wrapper:nth-child(2) {
          margin-bottom: 11px;
        }

        .settings-input__wrapper._has_btn {
          position: relative;
        }

        .settings-input__wrapper._has_btn label {
          color: #fff;
          font-size: 13px;
          font-weight: 500;
        }

        .settings-input__wrapper label {
          align-items: center;
          min-width: 95px;
          display: flex;
          white-space: nowrap;
        }

        .settings-input__wrapper label[for=on_loss] {
          max-width: 87px;
        }

        .settings-input__wrapper._has_btn .input-button {
          z-index: 1;
          position: absolute;
          top: 4px;
        }

        /* Desktop button positioning - adjusted for reduced label width */
        .settings-input__wrapper label + .input-button {
          left: 94px;
        }

        .settings-input__wrapper label + .input-button + .input-button {
          left: 174px;
        }

        /* Mobile button positioning */
        @media (max-width: 819px) {
          .settings-input__wrapper label + .input-button {
            left: 104px;
          }

          .settings-input__wrapper label + .input-button + .input-button {
            left: 178px;
          }
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

        .input-button._md {
          width: 78px;
        }

        .input-button.active {
          background-image: linear-gradient(135deg, #191b1e 0%, #25292e 100%);
          box-shadow: inset 3px 4px 10px rgba(7, 7, 9, .85);
        }

        .input-button.active .input-button__text {
          color: #fff;
          opacity: .6; /* Keep grey even when active */
        }

        .input-button__text {
          opacity: .6;
          color: #fff;
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.45;
        }
        
        .input-button._disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Desktop hover effects */
        @media (min-width: 820px) {
          .input-button:hover .input-button__text {
            opacity: 1; /* White on hover for desktop */
          }
        }

        /* Mobile - always grey */
        @media (max-width: 819px) {
          .input-button .input-button__text,
          .input-button.active .input-button__text,
          .input-button:hover .input-button__text {
            opacity: .6; /* Always grey on mobile */
          }
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

        /* Remove spinner arrows from number inputs */
        .games-input__number::-webkit-outer-spin-button,
        .games-input__number::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .games-input__number[type=number] {
          -moz-appearance: textfield;
        }
        
        .games-input__number._grey {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Desktop input padding */
        .settings-input__wrapper label + .input-button + .input-button + .games-input__wrapper .games-input__number {
          padding-left: 170px;
        }

        /* Mobile input padding */
        @media (max-width: 819px) {
          .settings-input__wrapper label + .input-button + .input-button + .games-input__wrapper .games-input__number {
            padding-left: 170px;
          }
        }

        .indicator__infinity,
        .indicator {
          color: rgba(255, 255, 255, .5);
          z-index: 3;
          font-size: 18px;
          position: absolute;
          top: 18px;
          right: 8px;
          width: 20px;
          text-align: center;
        }

        .settings-input__wrapper label + .switcher {
          margin-left: auto;
        }

        .switcher {
          background: linear-gradient(135deg, #3b4249 0%, #22282d 100%);
          border-radius: 1rem;
          height: 1.75rem;
          margin-right: .9375rem;
          padding: .0625rem;
          position: relative;
          cursor: pointer;
          z-index: 10;
          transition: opacity 0.3s ease;
        }
        
        .switcher._disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Mobile touch fix */
        @media (max-width: 819px) {
          .switcher {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            pointer-events: auto;
          }

          .switcher__input {
            z-index: 20;
            position: relative;
            pointer-events: auto;
          }

          .switcher__label {
            pointer-events: auto;
            z-index: 15;
          }
        }

        .switcher__inner {
          display: inline-block;
          position: relative;
        }

        .switcher__inner:before {
          z-index: 1;
          background-image: linear-gradient(311deg, #5b666f 0%, #0b0f15 100%);
          border-radius: .21875rem;
          width: .4375rem;
          height: .4375rem;
        }

        .switcher__inner:before,
        .switcher__inner:after {
          content: "";
          transition: all .3s linear;
          position: absolute;
          top: 50%;
          right: -.9375rem;
          transform: translateY(-50%);
        }

        .switcher__inner:after {
          z-index: 2;
          background-color: #272b30;
          border-radius: .15625rem;
          width: .3125rem;
          height: .3125rem;
          right: -.875rem;
          transition: all .3s linear;
        }

        .switcher__inner.active:after {
          background-image: radial-gradient(circle at 88% 115%, #81df49, #8de15e 70%);
        }

        .switcher__input {
          width: 0;
          height: 0;
          display: none;
        }

        /* Mobile input visibility fix */
        @media (max-width: 819px) {
          .switcher__input {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            display: block;
            z-index: 25;
            cursor: pointer;
          }
        }

        .switcher__label {
          cursor: pointer;
          text-indent: -9999px;
          background-image: linear-gradient(135deg, #1c2024 0%, #1c2023 100%);
          border-radius: .8125rem;
          width: 2.75rem;
          height: 1.625rem;
          transition: all .3s linear;
          display: inline-block;
          position: relative;
          box-shadow: inset .125rem .125rem .5rem rgba(4, 4, 5, .6);
          min-width: 2.75rem !important;
        }

        .switcher__label:after {
          content: "";
          background-color: #272b30;
          border-radius: .875rem;
          width: 1.5rem;
          height: 1.5rem;
          transition: all .3s linear;
          position: absolute;
          top: .0625rem;
          left: .0625rem;
          box-shadow: inset 0 -.0625rem .0625rem #181a1d;
        }

        .switcher__input:checked + .switcher__label {
          background-image: linear-gradient(135deg, #1c2024 0%, #1c2023 100%);
        }

        .switcher__input:checked + .switcher__label:after {
          left: calc(100% - .0625rem);
          transform: translate(-100%);
        }
      `}</style>
    </div>
  )
}
