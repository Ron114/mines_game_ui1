"use client"

export default function GameHistory() {
  const historyItems = ["x1.8", "x2.4", "x3.2", "x4.5", "x5.8", "x6.9", "x7.5"]

  return (
    <div className="game-history">
      <div className="game-history__inner">
        <div className="game-history__inner-container">
          {historyItems.map((multiplier, index) => (
            <div key={index} data-history-item="false" className="game-history__item">
              <div className="game-history__item-text">{multiplier}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .game-history {
          background-image: linear-gradient(360deg, rgba(194, 108, 66, 0.79) 0%, rgba(35, 38, 43, 0) 100%),
            linear-gradient(90.51deg, #5d666f 9.05%, rgba(18, 20, 21, 0.33) 105.67%);
          border-radius: 5px;
          height: 41px;
          padding: 1px;
          display: flex;
          position: relative;
          overflow: hidden;
          box-shadow: inset 2px 1px 9px #070709;
        }

        .game-history__inner {
          flex: 1;
          display: flex;
        }

        .game-history__inner-container {
          scroll-behavior: smooth;
          background: #0c0c0e;
          border: 1px solid #1e2122;
          border-radius: 5px;
          flex: 1;
          max-width: 100%;
          height: 100%;
          padding: 2px;
          display: flex;
          position: relative;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 1px;
        }

        .game-history__item {
          box-sizing: border-box;
          color: #d26d3d;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding: 2px;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          background: rgba(22, 25, 29, 0.8);
          transition: all 0.2s ease;
        }

        .game-history__item:hover .game-history__item-text {
          border-color: rgba(163, 82, 49, 1);
          box-shadow: -1px -1px 12px rgba(141, 68, 37, .6);
        }

        .game-history__item-text {
          text-align: center;
          box-sizing: border-box;
          border: 1px solid #a35231;
          border-radius: 4px;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          box-shadow: -1px -1px 10px rgba(141, 68, 37, .3);
          font-size: 10px;
          font-weight: 500;
          color: inherit;
          transition: all 0.2s ease;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .game-history {
            height: 36px;
            border-radius: 4px;
          }

          .game-history__inner-container {
            border-radius: 4px;
          }

          .game-history__item {
            font-size: 9px;
          }

          .game-history__item-text {
            font-size: 9px;
            border-radius: 3px;
          }
        }

        @media (min-width: 820px) {
          .game-history {
            grid-area: history;
          }
        }
      `}</style>
    </div>
  )
}
