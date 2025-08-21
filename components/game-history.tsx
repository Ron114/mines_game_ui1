"use client"

export default function GameHistory() {
  const historyItems = ["x18.21", "x2.45", "x1.08", "x5.67", "x12.34", "x3.21", "x7.89"]

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
          padding: 0 2px;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          /* Added individual box styling for each item */
          background: rgba(22, 25, 29, 0.8);
          border: 1px solid rgba(93, 102, 111, 0.3);
          border-radius: 3px;
          transition: all 0.2s ease;
        }

        .game-history__item:hover {
          background: rgba(22, 25, 29, 1);
          border-color: rgba(93, 102, 111, 0.5);
        }

        .game-history__item-text {
          font-size: 10px;
          font-weight: 500;
          color: inherit;
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
