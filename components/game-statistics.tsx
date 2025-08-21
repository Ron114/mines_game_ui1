"use client"

import { useState } from "react"

export default function GameStatistics() {
  const [activeTab, setActiveTab] = useState("all_bets")

  const tabs = [
    { id: "all_bets", label: "All Bets" },
    { id: "top_bets", label: "Top Bets" },
    { id: "my_bets", label: "My Bets" },
  ]

  const columns = ["Game", "Player", "Time", "Bet Amount", "Multiplier", "Payout"]

  return (
    <div className="game-statistic">
      <div className="border"></div>

      <ul className="tabs">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`tabs__item ${activeTab === tab.id ? "_active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="tabs__item-inner">
              <div className="text">{tab.label}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="content">
        <div className="tab-content">
          <div className="titles">
            {columns.map((column, index) => (
              <div key={column} className={`titles__item ${index === 2 ? "_time" : ""}`}>
                {column}
              </div>
            ))}
          </div>
          <div className="separator"></div>
          <div className="rows">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="row">
                <div className="cell _capitalize _nowrap">Mines</div>
                <div className="cell _time">Player{index + 1}</div>
                <div className="cell _time _00">2m ago</div>
                <div className="cell amount _fw600">$100.00</div>
                <div className="cell _fw500">x1.08</div>
                <div className="cell _fw600">$108.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-statistic {
          padding-bottom: 60px;
          position: relative;
        }

        .border {
          background-color: rgba(26, 28, 31, .5);
          border-radius: 3px;
          height: 1px;
          margin-bottom: 20px;
          box-shadow: 0 -1px 1px rgba(83, 89, 102, .6);
        }

        .tabs {
          margin-bottom: 20px;
          display: flex;
          list-style: none;
          padding: 0;
        }

        .tabs__item:not(:last-child) {
          margin-right: 10px;
        }

        .tabs__item {
          background-image: linear-gradient(294deg, #17191c 0%, #32383e 100%);
          border-radius: 11px;
          padding: 1px;
          box-shadow: -4px -4px 16px rgba(195, 200, 205, .08), 4px 4px 18px rgba(0, 0, 0, .5);
          cursor: pointer;
          min-width: 110px;
          transition: all .1s linear;
        }

        .tabs__item._active .tabs__item-inner {
          background-image: linear-gradient(282deg, #2c333a 126%, #1c1e22 25%);
          border: 1px solid #171a1e;
          box-shadow: inset -2px -2px 10px rgba(255, 255, 255, .05), inset 2px 3px 10px #070709;
        }

        .tabs__item-inner {
          border-radius: 10px;
          padding: 14px 19px;
        }

        .tabs__item._active .text {
          opacity: 1;
          color: #d6e1ef;
          font-weight: 800;
        }

        .tabs__item .text {
          opacity: .5;
          color: #fff;
          text-align: center;
          font-size: 13px;
          line-height: .85;
        }

        .content {
          background-image: linear-gradient(133deg, rgba(172, 172, 172, .4) -12%, transparent 54%, rgba(0, 0, 0, .4) 123%, rgba(0, 0, 0, .4) 123%);
          border-radius: 10px;
          padding: 1px;
          box-shadow: 11px 13px 30px rgba(2, 3, 3, .4), -12px -12px 30px rgba(232, 237, 243, .05), inset -16px -6px 80px rgba(248, 249, 249, .03);
        }

        .tab-content {
          background-image: linear-gradient(309deg, #121416 0%, #353a40 100%), linear-gradient(131deg, rgba(172, 172, 172, .4) 0%, transparent 50%, rgba(0, 0, 0, .4) 100%);
          border-radius: 10px;
        }

        .titles {
          display: flex;
        }

        .titles__item:first-child {
          justify-content: flex-start;
          padding-left: 20px;
        }

        .titles__item {
          color: #acb5c5;
          flex: 1;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
          font-size: 13px;
          font-weight: 600;
          display: flex;
        }

        .separator {
          border: 1px solid rgba(26, 28, 31, .51);
          box-shadow: 0 -1px 1px rgba(83, 89, 102, .6);
          height: 1px;
          margin: -5px 0 5px;
        }

        .rows {
          height: 285px;
          overflow: hidden;
        }

        .row {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          cursor: pointer;
          align-items: center;
          animation-duration: .5s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid rgba(26, 28, 31, .3);
        }

        .row:nth-child(odd) {
          animation-name: row-odd;
        }

        .cell {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 12px;
          padding: 0 10px;
        }

        .cell:first-child {
          justify-content: flex-start;
          padding-left: 20px;
        }

        .cell._fw600 {
          font-weight: 600;
        }

        .cell._fw500 {
          font-weight: 500;
        }

        .cell._capitalize {
          text-transform: capitalize;
        }

        .cell._nowrap {
          white-space: nowrap;
        }

        .cell._time {
          color: #acb5c5;
        }

        @keyframes row-odd {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(0px);
          }
        }

        @media (min-width: 820px) {
          .game-statistic {
            grid-area: stats;
          }
        }
      `}</style>
    </div>
  )
}
