"use client"

export default function GameGrid() {
  // Create 25 tiles for 5x5 grid
  const tiles = Array.from({ length: 25 }, (_, index) => index)

  return (
    <div className="table-holder">
      <div className="game-tiles">
        {tiles.map((tileIndex) => (
          <div key={tileIndex} className="game-tile">
            <div className="game-tile__inner-possible-win">{/* Placeholder for possible win amount */}</div>
            <div className="game-tile__inner">{/* Placeholder for tile content (gem/bomb) */}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .table-holder {
          position: relative;
        }

        @media (max-height: 700px) and (min-width: 820px) {
          .table-holder {
            padding: 5px 67px 0;
          }
        }

        .game-tiles {
          grid-gap: 14px;
          grid-template-rows: repeat(5, 1fr);
          grid-template-columns: repeat(5, 1fr);
          padding-bottom: 30px;
          display: grid;
        }

        .game-tile {
          text-align: center;
          aspect-ratio: 1;
          background-image: linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%);
          border-radius: 13px;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          line-height: 100px;
          display: flex;
          position: relative;
          box-shadow: 3px 3px 4px rgba(10, 9, 9, 0.4);
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .game-tile:hover {
          transform: scale(0.98);
        }

        .game-tile__inner-possible-win {
          z-index: 5;
          color: rgba(255, 255, 255, 0.3);
          opacity: 0;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
          line-height: 18px;
          transition: opacity 0.1s ease-in;
          display: flex;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .game-tile__inner {
          opacity: 0;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transition: opacity 0.5s ease-in;
          display: flex;
        }

        .game-tile:hover .game-tile__inner-possible-win {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
