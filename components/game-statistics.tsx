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
  const mobileColumns = ["Game", "Multiplier", "Payout"]

  const gameData = [
    { 
      game: "Turboplinko", 
      iconClass: "_turboplinko",
      player: "ind_turbo_4826597", 
      time: "12:12 PM", 
      betAmount: "$0.11", 
      multiplier: "5.70x", 
      payout: "$0.88" 
    },
    { 
      game: "Mines", 
      iconClass: "_mines",
      player: "SmartHornet744", 
      time: "12:12 PM", 
      betAmount: "$9.41", 
      multiplier: "1.36x", 
      payout: "$0.08" 
    },
    { 
      game: "Hi-lo", 
      iconClass: "_hilo",
      player: "Tremendous Dinosa...", 
      time: "12:12 PM", 
      betAmount: "$0.10", 
      multiplier: "1.60x", 
      payout: "$160.00" 
    },
    { 
      game: "Hi-lo", 
      iconClass: "_hilo",
      player: "20908c8d-7dc2-448...", 
      time: "12:11 PM", 
      betAmount: "$0.23", 
      multiplier: "0.00x", 
      payout: "$0.00" 
    },
    { 
      game: "Fruit Towers", 
      iconClass: "_fruittowers",
      player: "player123", 
      time: "12:10 PM", 
      betAmount: "$0.15", 
      multiplier: "1.90x", 
      payout: "$0.28" 
    },
    { 
      game: "Dice Twice", 
      iconClass: "_dice",
      player: "player456", 
      time: "12:09 PM", 
      betAmount: "$0.03", 
      multiplier: "1.01x", 
      payout: "$0.03" 
    },
    { 
      game: "Dice Twice", 
      iconClass: "_dice",
      player: "player789", 
      time: "12:08 PM", 
      betAmount: "$0.50", 
      multiplier: "0.00x", 
      payout: "$0.00" 
    },
    { 
      game: "Fruit Towers", 
      iconClass: "_fruittowers",
      player: "player101", 
      time: "12:07 PM", 
      betAmount: "$0.25", 
      multiplier: "0.00x", 
      payout: "$0.00" 
    },
    { 
      game: "Turboplinko", 
      iconClass: "_turboplinko",
      player: "player102", 
      time: "12:06 PM", 
      betAmount: "$5.85", 
      multiplier: "0.54x", 
      payout: "$3.14" 
    },
    { 
      game: "Mines", 
      iconClass: "_mines",
      player: "player103", 
      time: "12:05 PM", 
      betAmount: "$0.62", 
      multiplier: "1.36x", 
      payout: "$0.84" 
    },
    { 
      game: "Mines", 
      iconClass: "_mines",
      player: "player104", 
      time: "12:04 PM", 
      betAmount: "$1.00", 
      multiplier: "0.00x", 
      payout: "$0.00" 
    }
  ]

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
          {/* Desktop titles */}
          <div className="titles desktop-titles">
            {columns.map((column, index) => (
              <div key={column} className={`titles__item ${index === 2 ? "_time" : ""}`}>
                {column}
              </div>
            ))}
          </div>
          
          {/* Mobile titles */}
          <div className="titles mobile-titles">
            {mobileColumns.map((column) => (
              <div key={column} className="titles__item">
                {column}
              </div>
            ))}
          </div>
          
          <div className="separator"></div>
          <div className="rows">
            {gameData.map((row, index) => (
              <div key={index} className="row">
                {/* Desktop row */}
                <div className="desktop-row">
                  <div className="cell _capitalize _nowrap">
                    <div className={`icon folders-icon ${row.iconClass}`}></div>
                    {row.game}
                  </div>
                  <div className="cell player">{row.player}</div>
                  <div className="cell _time">{row.time}</div>
                  <div className="cell amount">{row.betAmount}</div>
                  <div className="cell multiplier">{row.multiplier}</div>
                  <div className="cell payout">{row.payout}</div>
                </div>
                
                {/* Mobile row - exact reference structure */}
                <div className="mobile-row">
                  <div className="cell _capitalize _nowrap">
                    <div className={`icon folders-icon ${row.iconClass}`}></div>
                    {row.game}
                  </div>
                  <div className="cell _fw500">{row.multiplier}</div>
                  <div className="cell _fw600">{row.payout}</div>
                </div>
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

        /* Hide border on mobile for manual tab */
        @media (max-width: 819px) {
          .border {
            display: none;
          }
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
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          cursor: pointer;
          align-items: center;
          animation-duration: .5s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid rgba(26, 28, 31, .3);
          transition: background-color 0.2s ease;
        }

        .row:hover {
          background-color: rgba(255, 255, 255, 0.02);
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

        .game-icon {
          margin-right: 8px;
          font-size: 14px;
        }

        /* Game icon styles for both desktop and mobile */
        .icon.folders-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          display: inline-block;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          vertical-align: middle;
        }

        .icon.folders-icon._turboplinko,
        .icon.folders-icon._mines,
        .icon.folders-icon._hilo,
        .icon.folders-icon._fruittowers,
        .icon.folders-icon._dice {
          background-color: rgba(255, 255, 255, .5);
          border-radius: 50%;
        }

        .cell.player {
          color: #8a9ba8;
          font-size: 12px;
        }

        .cell._time {
          color: #8a9ba8;
          font-size: 12px;
        }

        .cell.amount {
          color: #ffffff;
          font-weight: 600;
          font-size: 12px;
        }

        .cell.multiplier {
          color: #ffffff;
          font-weight: 600;
          font-size: 12px;
        }

        .cell.payout {
          color: #ffffff;
          font-weight: 600;
          font-size: 12px;
        }

        .cell._capitalize {
          text-transform: capitalize;
        }

        .cell._nowrap {
          white-space: nowrap;
        }

        @keyframes row-odd {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(0px);
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .desktop-titles,
          .desktop-row {
            display: none;
          }

          .mobile-titles,
          .mobile-row {
            display: flex;
          }

          .mobile-titles .titles__item:nth-child(1) {
            flex: 1;
            justify-content: flex-start;
            padding-left: 15px;
          }

          .mobile-titles .titles__item:nth-child(2) {
            flex: 1;
            justify-content: center;
          }

          .mobile-titles .titles__item:nth-child(3) {
            flex: 1;
            justify-content: center;
          }

          .tabs__item {
            min-width: 90px;
          }

          .tabs__item-inner {
            padding: 12px 15px;
          }

          .tabs__item .text {
            font-size: 11px;
          }

          .rows {
            height: 285px;
            cursor: default;
            -webkit-text-size-adjust: 100%;
            font-variant-ligatures: none;
            text-rendering: optimizeLegibility;
            text-shadow: 0 0 1px rgba(0,0,0,.01);
            font-variant-numeric: tabular-nums;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            font-weight: inherit;
            font-style: inherit;
            vertical-align: baseline;
            user-select: none;
            border: 0;
            outline: 0;
            margin: 0;
            padding: 0;
            font-family: inherit;
            font-size: 100%;
          }

          .mobile-row .cell {
            font-size: 11px;
            padding: 0 8px;
            line-height: 1;
            font-variant-numeric: tabular-nums;
            color: rgba(255, 255, 255, .5);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-row .cell:first-child {
            padding-left: 15px;
            justify-content: flex-start;
          }

          .mobile-row .cell._fw500 {
            font-weight: 500;
            color: rgba(255, 255, 255, .5);
          }

          .mobile-row .cell._fw600 {
            font-weight: 600;
            color: rgba(255, 255, 255, .5);
          }

          .mobile-row {
            display: flex;
            width: 100%;
          }

          .mobile-row .cell:nth-child(1) {
            flex: 1;
            justify-content: flex-start;
          }

          .mobile-row .cell:nth-child(2) {
            flex: 1;
            justify-content: center;
          }

          .mobile-row .cell:nth-child(3) {
            flex: 1;
            justify-content: center;
          }


        }

        /* Desktop styles */
        @media (min-width: 820px) {
          .game-statistic {
            grid-area: stats;
          }

          .desktop-titles,
          .desktop-row {
            display: flex;
          }

          .mobile-titles,
          .mobile-row {
            display: none;
          }

          /* Desktop column alignment fix */
          .desktop-titles .titles__item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
          }

          .desktop-titles .titles__item:first-child {
            justify-content: flex-start;
            padding-left: 20px;
          }

          .desktop-row {
            display: flex;
            width: 100%;
          }

          .desktop-row .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
          }

          .desktop-row .cell:first-child {
            justify-content: flex-start;
            padding-left: 20px;
          }
        }
      `}</style>
    </div>
  )
}
