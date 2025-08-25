"use client"

import { useState } from "react"

export default function AutoBetSection() {
  const [numberOfRounds, setNumberOfRounds] = useState("")
  const [onWinAmount, setOnWinAmount] = useState("100")
  const [onLossAmount, setOnLossAmount] = useState("100")
  const [onWinMode, setOnWinMode] = useState<"reset" | "increase">("increase")
  const [onLossMode, setOnLossMode] = useState<"reset" | "increase">("increase")
  const [stopAtAnyWin, setStopAtAnyWin] = useState(false)

  const handleWinModeChange = (mode: "reset" | "increase") => {
    setOnWinMode(mode)
    setOnWinAmount(mode === "reset" ? "0" : "100")
  }

  const handleLossModeChange = (mode: "reset" | "increase") => {
    setOnLossMode(mode)
    setOnLossAmount(mode === "reset" ? "0" : "100")
  }

  return (
    <div className="game-autobet">
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
            onChange={(e) => setNumberOfRounds(e.target.value)}
          />
        </div>
        <span className="indicator__infinity">∞</span>
      </div>

      {/* When Winning */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_win">When Winning</label>
        
        <div 
          className={`input-button _md ${onWinMode === "reset" ? "active" : ""}`}
          onClick={() => handleWinModeChange("reset")}
        >
          <div className="input-button__text">Reset</div>
        </div>

        <div 
          className={`input-button _md ${onWinMode === "increase" ? "active" : ""}`}
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
            className="games-input__number"
            max="999"
            value={onWinAmount}
            onChange={(e) => setOnWinAmount(e.target.value)}
          />
        </div>
        <span className="indicator">%</span>
      </div>

      {/* When Losing */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_loss">When Losing</label>
        
        <div 
          className={`input-button _md ${onLossMode === "reset" ? "active" : ""}`}
          onClick={() => handleLossModeChange("reset")}
        >
          <div className="input-button__text">Reset</div>
        </div>

        <div 
          className={`input-button _md ${onLossMode === "increase" ? "active" : ""}`}
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
            className="games-input__number"
            max="999"
            value={onLossAmount}
            onChange={(e) => setOnLossAmount(e.target.value)}
          />
        </div>
        <span className="indicator">%</span>
      </div>

      {/* Stop at any Win */}
      <div className="settings-input__wrapper _has_btn">
        <label htmlFor="on_any_win">Stop at any Win</label>
        
        <div className="switcher">
          <div className={`switcher__inner ${stopAtAnyWin ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              id="on_any_win" 
              className="switcher__input"
              checked={stopAtAnyWin}
              onChange={(e) => setStopAtAnyWin(e.target.checked)}
            />
            <label htmlFor="on_any_win" className="switcher__label"></label>
          </div>
        </div>
      </div>

      {/* Start Autoplay Button */}
      <div className="game-betslip__buttons">
        <div className="btn-new _placebet">
          <div className="btn-new__border">
            <div className="btn-bg _bg1"></div>
            <div className="btn-bg _bg2"></div>
            <div className="btn-bg _bg22"></div>
            
            <div className="btn-new__inner">
              <div className="btn-bg _bg1"></div>
              <div className="btn-bg _bg11"></div>
              
              <div className="btn-new__text">
                <div className="text">Start Autoplay</div>
              </div>
              
              <div className="indicator _placebet"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-autobet {
          margin-bottom: 20px;
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
          min-width: 120px;
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

        .settings-input__wrapper label + .input-button {
          left: 124px;
        }

        .settings-input__wrapper label + .input-button + .input-button {
          left: 205px;
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
          opacity: 1;
        }

        .input-button__text {
          opacity: .6;
          color: #fff;
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.45;
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

        .settings-input__wrapper label + .input-button + .input-button + .games-input__wrapper .games-input__number {
          padding-left: 170px;
          // padding-right: 5px;
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

        .game-betslip__buttons {
          margin-bottom: 20px;
          display: flex;
        }

        .btn-new {
          text-align: center;
          cursor: pointer;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          border-radius: 10px;
          flex: 1;
          height: 64px;
          padding: 3px;
          position: relative;
          overflow: hidden;
          -webkit-transform: translate(0, 0);
          -moz-transform: translate(0,0);
          box-shadow: -4px -2px 16px rgba(195, 200, 205, .09), 4px 4px 18px rgba(0, 0, 0, .5);
        }

        .btn-new._placebet ._bg1 {
          background-image: linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 1;
        }

        .btn-new._placebet ._bg11 {
          background-image: radial-gradient(50% 91.38% at 50% 0, rgba(82, 195, 243, .19) .01%, rgba(18, 194, 250, .54) .02%, rgba(40, 45, 49, .18) 100%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-new._placebet ._bg2,
        .btn-new._placebet ._bg22 {
          background-image: radial-gradient(148.08% 148.08% at 1.81% 132.69%, #66a1e5 0%, rgba(38, 74, 112, 0) 100%), linear-gradient(94.46deg, rgba(200, 213, 225, .21) 45.13%, transparent 123.58%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-new._placebet:hover ._bg1 {
          background-image: radial-gradient(48.81% 101.72% at 50% -10.34%, rgba(18, 194, 250, .9) 0%, rgba(82, 195, 243, .19) .01%, rgba(40, 45, 49, .11) 100%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
        }

        .btn-new._placebet:hover ._bg11 {
          opacity: 1;
        }

        .btn-new._placebet:hover ._bg2,
        .btn-new._placebet:hover ._bg22 {
          opacity: 1;
        }

        .btn-new ._bg22 {
          transform: rotate(180deg);
        }

        .btn-new__border {
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          border-radius: 8px;
          height: 100%;
          padding: 1px;
          transition: opacity .5s linear;
          position: relative;
          overflow: hidden;
          -webkit-transform: translate(0, 0);
          -moz-transform: translate(0,0);
        }

        .btn-bg {
          transition: opacity .5s linear;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .btn-new__inner {
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          background-image: linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%);
          border: 1px solid rgba(68, 197, 238, 0.3);
          border-radius: 7px;
          height: 100%;
          position: relative;
          overflow: hidden;
          -webkit-transform: translate(0, 0);
          -moz-transform: translate(0,0);
        }

        .btn-new._placebet:hover .btn-new__inner {
          border-color: rgba(68, 197, 238, 0.8);
        }

        .btn-new .text {
          color: #d6e1ef;
          font-size: 16px;
          font-weight: 800;
        }

        .btn-new__text {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          position: relative;
          z-index: 3;
        }

        .btn-new__inner .indicator {
          z-index: 2;
          width: 24px;
          height: 3px;
          margin: 5px auto 0;
          position: relative;
        }

        .btn-new__inner .indicator._placebet:before {
          background-image: linear-gradient(132.19deg, #c8d5e1 -160.75%, transparent 169.75%);
          box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
        }

        .btn-new__inner .indicator:before {
          z-index: 1;
          border-radius: 2.5px;
          top: -1px;
          bottom: -1px;
          left: -1px;
          right: -1px;
        }

        .btn-new__inner .indicator:before,
        .btn-new__inner .indicator:after {
          content: "";
          background-image: linear-gradient(92deg, #777f85 0%, #363b3f 100%);
          position: absolute;
          transition: all 0.3s ease;
        }

        .btn-new__inner .indicator._placebet:after {
          background-image: linear-gradient(136.14deg, #44c5ee -.24%, #63e6fc 91.03%);
          box-shadow: 4px 10px 32px rgba(63, 208, 164, .4), -6px -6px 16px rgba(0, 0, 0, .6);
        }

        .btn-new__inner .indicator:after {
          z-index: 2;
          border-radius: 1.5px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  )
}
