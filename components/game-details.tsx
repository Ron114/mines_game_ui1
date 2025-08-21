"use client"

import Image from "next/image"

export default function GameDetails() {
  return (
    <div className="game-details">
      <div className="game-details__inner">
        <div className="game-details__inner-container">
          <div className="game-details__title">Game details</div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-crystal.svg" alt="Crystal" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Gems left</div>
            <div className="game-details__row-value">0</div>
          </div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-bomb.svg" alt="Mine" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Mine risk:</div>
            <div className="game-details__row-value">0%</div>
          </div>

          <div className="game-details__row">
            <div className="game-details__row-icon">
              <Image src="/assets/icon-tiles.svg" alt="Tiles" width={20} height={20} />
            </div>
            <div className="game-details__row-text">Opened tiles</div>
            <div className="game-details__row-value">0/25</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-details {
          color: #d17448;
          background-image: linear-gradient(360deg, rgba(194, 108, 66, .79) 0%, rgba(35, 38, 43, 0) 100%), 
                           linear-gradient(90.51deg, #5d666f 9.05%, rgba(18, 20, 21, .33) 105.67%);
          border-radius: 10px;
          padding: 1px;
          font-size: 11px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 2px 1px 9px #070709;
        }

        .game-details__inner {
          height: 100%;
        }

        .game-details__inner-container {
          background: #0c0c0e;
          border: 1px solid #1e2122;
          border-radius: 10px;
          height: 100%;
          padding-bottom: 5px;
        }

        .game-details__title {
          border-bottom: 1px solid #1d1b1b;
          align-items: center;
          height: 40px;
          margin-bottom: 14px;
          padding: 0 12px;
          font-weight: 700;
          display: flex;
        }

        .game-details__row {
          align-items: center;
          margin-bottom: 16px;
          padding: 0 12px;
          display: flex;
        }

        .game-details__row-icon {
          width: 20px;
          height: 20px;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-details__row-text {
          flex: 1;
        }

        .game-details__row-value {
          margin-left: auto;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
