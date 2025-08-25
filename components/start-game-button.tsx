"use client"

import { useGame } from '../contexts/GameContext'

export default function StartGameButton() {
  const { gameState, setGameState, winAmount, resetGame } = useGame()

  const handleButtonClick = () => {
    if (gameState === 'idle') {
      setGameState('active')
    } else if (gameState === 'active') {
      resetGame()
    } else if (gameState === 'cashout') {
      resetGame()
    }
  }

  const getButtonText = () => {
    switch (gameState) {
      case 'active':
        return 'Cancel'
      case 'cashout':
        return 'Cash Out'
      default:
        return 'Start Game'
    }
  }

  const getButtonClass = () => {
    switch (gameState) {
      case 'active':
        return '_cancel'
      case 'cashout':
        return '_cashout'
      default:
        return '_placebet'
    }
  }

  const getIndicatorClass = () => {
    switch (gameState) {
      case 'active':
        return '_cancel'
      case 'cashout':
        return '_cashout'
      default:
        return '_placebet'
    }
  }

  return (
    <div className="game-betslip__buttons">
      <div className={`btn-new ${getButtonClass()}`} onClick={handleButtonClick}>
        <div className="btn-new__border">
          <div className="btn-bg _bg1"></div>
          <div className="btn-bg _bg2"></div>
          <div className="btn-bg _bg22"></div>
          
          <div className="btn-new__inner">
            <div className="btn-bg _bg1"></div>
            <div className="btn-bg _bg11"></div>
            
            <div className="btn-new__text">
              {gameState === 'cashout' ? (
                <>
                  <div className="text">Cash Out</div>
                  <div className="_small">
                    <span className="_roboto">${winAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="text">{getButtonText()}</div>
              )}
            </div>
            
            <div className={`indicator ${getIndicatorClass()}`}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-betslip__buttons {
          margin-bottom: 10px;
          display: flex;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .game-betslip__buttons {
            margin-bottom: 0;
          }

          .btn-new {
            height: 56px;
          }

          .btn-new .text {
            font-size: 14px;
          }
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
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }

        /* Mobile - always show glow effect */
        @media (max-width: 819px) {
          .btn-new._placebet ._bg11 {
            opacity: 1;
          }

          .btn-new._placebet ._bg2,
          .btn-new._placebet ._bg22 {
            opacity: 1;
          }
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
          flex-direction: column;
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
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
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

        /* Cancel button styles */
        .btn-new._cancel ._bg1 {
          background: radial-gradient(58.03% 100% at 50% 0, rgba(255, 82, 92, .224) 0%, rgba(40, 45, 49, .11) 100%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
        }

        .btn-new._cancel ._bg2,
        .btn-new._cancel ._bg22 {
          background: radial-gradient(86.54% 994.53% at 13.55% 115.38%, rgba(254, 65, 75, .6) 0%, rgba(204, 51, 79, 0) 100%), linear-gradient(276.15deg, rgba(255, 35, 48, .38) -24.51%, rgba(91, 35, 35, .2) 82.05%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 1;
        }

        .btn-new._cancel ._bg11 {
          opacity: 0;
        }

        .btn-new._cancel .btn-new__inner {
          border-color: rgba(255, 82, 92, 0.5);
        }

        .btn-new__inner .indicator._cancel:after {
          background-image: linear-gradient(262deg, #f9718e 100%, #f64444 0%), linear-gradient(90deg, rgba(179, 179, 179, .45) -90%, rgba(0, 0, 0, .85) 141%);
        }

        /* Cash out button styles */
        .btn-new._cashout ._bg1,
        .btn-new._cashout ._bg11 {
          background-image: radial-gradient(48.81% 101.72% at 50% -10.34%, rgba(244, 157, 76, .243) 0%, rgba(255, 125, 5, .19) .01%, rgba(225, 155, 90, 0) 100%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 1;
        }

        .btn-new._cashout ._bg2,
        .btn-new._cashout ._bg22 {
          background-image: radial-gradient(155.77% 155.77% at 0 125%, #ff9838 0%, rgba(27, 21, 15, 0) 100%), linear-gradient(94.46deg, rgba(225, 215, 200, .21) 45.13%, transparent 123.58%), linear-gradient(315.81deg, #17191c -42.75%, #32383e 123.05%);
          opacity: 1;
        }

        .btn-new._cashout .btn-new__inner {
          border-color: rgba(255, 152, 56, 0.5);
        }

        .btn-new__inner .indicator._cashout:before {
          background: linear-gradient(136.14deg, #ee9644 -.24%, #f9e1b2 91.03%);
          box-shadow: 4px 10px 32px rgba(63, 208, 164, .4), -6px -6px 16px rgba(0, 0, 0, .6);
        }

        .btn-new__inner .indicator._cashout:after {
          background-image: linear-gradient(132.19deg, #c8d5e1 -160.75%, transparent 169.75%);
        }

        .btn-new__text ._small {
          margin-top: -5px;
        }

        ._small {
          color: #d6e1ef;
          font-size: 10px;
          font-weight: 400;
        }

        ._roboto {
          font-family: 'Roboto', sans-serif;
          color: inherit;
        }
      `}</style>
    </div>
  )
}
