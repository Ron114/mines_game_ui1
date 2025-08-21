"use client"

export default function StartGameButton() {
  return (
    <div className="game-betslip__buttons">
      <button className="btn-new _placebet">
        <div className="btn-new__background"></div>
        <div className="btn-new__content">
          <span className="btn-text">Start Game</span>
          <div className="indicator _placebet"></div>
        </div>

        <style jsx>{`
          .game-betslip__buttons {
            margin-bottom: 50px;
            display: flex;
            justify-content: center;
            width: 100%;
          }

          .btn-new {
            position: relative;
            cursor: pointer;
            border-radius: 10px;
            width: 100%;
            max-width: 400px;
            height: 64px;
            border: none;
            background: none;
            overflow: hidden;
            box-shadow: -4px -2px 16px rgba(195, 200, 205, .09), 4px 4px 18px rgba(0, 0, 0, .5);
          }

          .btn-new__background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 10px;
            background: radial-gradient(ellipse at center, rgba(74, 144, 226, 0.3) 0%, rgba(74, 144, 226, 0.1) 50%, transparent 100%), 
                        linear-gradient(135deg, #2a2d32 0%, #3a3f45 50%, #2a2d32 100%);
          }

          .btn-new__content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 10px 0;
          }

          .btn-text {
            color: #ffffff;
            font-size: 18px;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            margin-bottom: 5px;
          }

          .indicator {
            width: 24px;
            height: 3px;
            position: relative;
          }

          .indicator._placebet:before {
            content: "";
            position: absolute;
            top: -1px;
            bottom: -1px;
            left: -1px;
            right: -1px;
            background-image: linear-gradient(132.19deg, #c8d5e1 -160.75%, transparent 169.75%);
            box-shadow: inset 2px 2px 2px rgba(26, 32, 38, .4);
            border-radius: 2.5px;
            z-index: 1;
          }

          .indicator._placebet:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-image: linear-gradient(136.14deg, #44c5ee -.24%, #63e6fc 91.03%);
            box-shadow: 4px 10px 32px rgba(63, 208, 164, .4), -6px -6px 16px rgba(0, 0, 0, .6);
            border-radius: 1.5px;
            z-index: 2;
          }
        `}</style>
      </button>
    </div>
  )
}
