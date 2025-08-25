"use client"

export default function StartGameButton() {
  return (
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
              <div className="text">Start Game</div>
            </div>
            
            <div className="indicator _placebet"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
