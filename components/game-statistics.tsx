"use client"

import { useState, useEffect } from "react"

export default function GameStatistics() {
  const [activeTab, setActiveTab] = useState("all_bets")
  const [gameData, setGameData] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [animationOffset, setAnimationOffset] = useState(0)

  const tabs = [
    { id: "all_bets", label: "All Bets" },
    { id: "top_bets", label: "Top Bets" },
    { id: "my_bets", label: "My Bets" },
  ]

  const columns = ["Game", "Player", "Time", "Bet Amount", "Multiplier", "Payout"]
  const mobileColumns = ["Game", "Multiplier", "Payout"]

  const gameIcons = [
    { name: "hamsta", url: "/assets/icon-hamsta.svg" },
    { name: "mines", url: "/assets/icon-mines.svg" },
    { name: "dice", url: "/assets/icon-dice.svg" },
    { name: "turboplinko", url: "/assets/icon-turboplinko.svg" },
    { name: "crash", url: "/assets/icon-crash.svg" },
    { name: "towers", url: "/assets/icon-towers.svg" },
    { name: "fruittowers", url: "/assets/icon-fruittowers.svg" },
    { name: "ballandball", url: "/assets/icon-ballandball.svg" }
  ]

  const gameNames = ["Limbo Rider", "Ball & Ball", "Crash X Football", "Mines", "Turboplinko", "Fruit Towers", "Turbomines", "Crash X"]
  const players = [
    "Statutory Panda", "Civil Macaw", "11293635-a0T", "Tremendous Tiger", "10382644", "JUMBO95", 
    "Minor Barracuda", "Youthful Worm", "BlackHat", "Uddityy ***ate"
  ]

  const getRandomIcon = () => {
    return gameIcons[Math.floor(Math.random() * gameIcons.length)]
  }

  const getRandomGame = () => {
    return gameNames[Math.floor(Math.random() * gameNames.length)]
  }

  const getRandomPlayer = () => {
    return players[Math.floor(Math.random() * players.length)]
  }

  const getRandomTime = () => {
    return "11:57 PM" // All entries show the same time as in the new image
  }

  const getRandomBet = () => {
    const amounts = ["0.00", "1.18", "0.05", "0.00", "0.35", "0.55", "0.34", "0.19", "0.71", "0.06"]
    return `$${amounts[Math.floor(Math.random() * amounts.length)]}`
  }

  const getRandomMultiplier = () => {
    const multipliers = ["0.00x", "0.00x", "3.13x", "0.00x", "0.96x", "0.28x", "0.00x", "0.00x", "1.93x", "0.00x"]
    return multipliers[Math.floor(Math.random() * multipliers.length)]
  }

  const getRandomPayout = () => {
    const payouts = ["0.00", "0.00", "0.17", "0.00", "0.33", "0.15", "0.00", "0.00", "1.35", "0.00"]
    return `$${payouts[Math.floor(Math.random() * payouts.length)]}`
  }

  const generateRandomRow = () => {
    return {
      id: `${Date.now()}-${Math.random()}`,
      game: getRandomGame(),
      icon: getRandomIcon(),
      player: getRandomPlayer(),
      time: getRandomTime(),
      betAmount: getRandomBet(),
      multiplier: getRandomMultiplier(),
      payout: getRandomPayout()
    }
  }

  // Generate initial static data matching the reference gif exactly
  const generateStaticData = () => {
    const staticRows = [
      { id: 1, game: "Limbo Rider", icon: { name: "dice", url: "/assets/icon-dice.svg" }, player: "Statutory Panda", time: "11:57 PM", betAmount: "$0.00", multiplier: "0.00x", payout: "$0.00" },
      { id: 2, game: "Ball & Ball", icon: { name: "ballandball", url: "/assets/icon-ballandball.svg" }, player: "Civil Macaw", time: "11:57 PM", betAmount: "$1.18", multiplier: "0.00x", payout: "$0.00" },
      { id: 3, game: "Crash X Football", icon: { name: "crash", url: "/assets/icon-crash.svg" }, player: "11293635-a0T", time: "11:57 PM", betAmount: "$0.05", multiplier: "3.13x", payout: "$0.17" },
      { id: 4, game: "Mines", icon: { name: "mines", url: "/assets/icon-mines.svg" }, player: "Tremendous Tiger", time: "11:57 PM", betAmount: "$0.00", multiplier: "0.00x", payout: "$0.00" },
      { id: 5, game: "Turboplinko", icon: { name: "turboplinko", url: "/assets/icon-turboplinko.svg" }, player: "10382644", time: "11:57 PM", betAmount: "$0.35", multiplier: "0.96x", payout: "$0.33" },
      { id: 6, game: "Turboplinko", icon: { name: "turboplinko", url: "/assets/icon-turboplinko.svg" }, player: "JUMBO95", time: "11:57 PM", betAmount: "$0.55", multiplier: "0.28x", payout: "$0.15" },
      { id: 7, game: "Fruit Towers", icon: { name: "fruittowers", url: "/assets/icon-fruittowers.svg" }, player: "Minor Barracuda", time: "11:57 PM", betAmount: "$0.34", multiplier: "0.00x", payout: "$0.00" },
      { id: 8, game: "Turbomines", icon: { name: "mines", url: "/assets/icon-mines.svg" }, player: "Youthful Worm", time: "11:57 PM", betAmount: "$0.19", multiplier: "0.00x", payout: "$0.00" },
      { id: 9, game: "Crash X", icon: { name: "crash", url: "/assets/icon-crash.svg" }, player: "BlackHat", time: "11:57 PM", betAmount: "$0.71", multiplier: "1.93x", payout: "$1.35" },
      { id: 10, game: "Limbo Rider", icon: { name: "dice", url: "/assets/icon-dice.svg" }, player: "Uddityy ***ate", time: "11:57 PM", betAmount: "$0.06", multiplier: "0.00x", payout: "$0.00" },
      { id: 11, game: "Limbo Rider", icon: { name: "dice", url: "/assets/icon-dice.svg" }, player: "Statutory Panda", time: "11:57 PM", betAmount: "$0.00", multiplier: "0.00x", payout: "$0.00" },
      { id: 12, game: "Ball & Ball", icon: { name: "ballandball", url: "/assets/icon-ballandball.svg" }, player: "Civil Macaw", time: "11:57 PM", betAmount: "$1.18", multiplier: "0.00x", payout: "$0.00" }
    ]
    return staticRows
  }

  useEffect(() => {
    setIsClient(true)
    // Initialize with static data first
    setGameData(generateStaticData())
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    let currentIndex = 0
    const allStaticRows = generateStaticData()
    
    // Add new rows periodically with smooth animation
    const interval = setInterval(() => {
      // Start animation by moving the whole list down first
      setAnimationOffset(36)
      
      // After animation completes, add next row from static data and reset position
      setTimeout(() => {
        const nextRow = { ...allStaticRows[currentIndex % allStaticRows.length], id: Date.now() }
        currentIndex++
        
        setGameData(prevData => {
          return [nextRow, ...prevData.slice(0, 9)] // Keep only 10 rows visible
        })
        setAnimationOffset(0) // Reset to original position instantly
      }, 300)
      
    }, 1200) // Timing to match reference
    
    return () => clearInterval(interval)
  }, [isClient])

  return (
    <div className="game-statistic">
      <div className="w-full h-[1px] bg-[#353a42] mb-[20px]"></div>

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
            {!isClient ? (
              <div className="row">
                <div className="desktop-row">
                  <div className="cell _capitalize _nowrap">
                    <div className="icon folders-icon" style={{ backgroundImage: "url('/assets/icon-mines.svg')" }}></div>
                    Loading...
                  </div>
                  <div className="cell player">Loading...</div>
                  <div className="cell _time">--:-- --</div>
                  <div className="cell amount">$--.--</div>
                  <div className="cell multiplier">-.--x</div>
                  <div className="cell payout">$--.--</div>
                </div>
                <div className="mobile-row">
                  <div className="cell _capitalize _nowrap">
                    <div className="icon folders-icon" style={{ backgroundImage: "url('/assets/icon-mines.svg')" }}></div>
                    Loading...
                  </div>
                  <div className="cell _fw500">-.--x</div>
                  <div className="cell _fw600">$--.--</div>
                </div>
              </div>
            ) : (
              <div 
                className="rows-container"
                style={{
                  transform: `translateY(${animationOffset}px)`,
                  transition: animationOffset === 36 ? 'transform 0.4s ease-out' : 'none'
                }}
              >
                {gameData.map((row, index) => (
                <div 
                  key={row.id} 
                  className="row"
                >
                {/* Desktop row */}
                <div className="desktop-row">
                  <div className="cell _capitalize _nowrap">
                    <div 
                      className="icon folders-icon"
                      style={{ backgroundImage: `url('${row.icon.url}')` }}
                    ></div>
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
                    <div 
                      className="icon folders-icon"
                      style={{ backgroundImage: `url('${row.icon.url}')` }}
                    ></div>
                    {row.game}
                  </div>
                  <div className="cell _fw500">{row.multiplier}</div>
                  <div className="cell _fw600">{row.payout}</div>
                </div>
              </div>
            ))}
              </div>
            )}
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
          height: 280px; /* Reduced height for smaller rows */
          overflow: hidden;
          position: relative;
        }

        .rows-container {
          position: relative;
          width: 100%;
          top: -36px;
        }

        .row {
          cursor: pointer;
          align-items: center;
          display: flex;
          padding: 0;
          border-bottom: none;
          height: 36px;
          flex-shrink: 0;
          opacity: 1;
        }

        .row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        /* Desktop hover effects */
        @media (min-width: 820px) {
          .row:hover .desktop-row .cell {
            color: rgb(255, 255, 255) !important;
          }
          
          .row:hover .desktop-row .cell.player,
          .row:hover .desktop-row .cell._time {
            color: rgb(255, 255, 255) !important;
          }
          
          .row:hover .desktop-row .cell.amount,
          .row:hover .desktop-row .cell.multiplier,
          .row:hover .desktop-row .cell.payout {
            color: rgb(255, 255, 255) !important;
          }
        }


        .cell {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(255, 255, 255);
          font-size: 12px;
          font-family: 'Gilroy', sans-serif;
          font-weight: 400;
          line-height: 12px;
          padding: 8px 10px;
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
          width: 12px;
          height: 12px;
          margin-right: 6px;
          display: inline-block;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          vertical-align: middle;
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

          /* Desktop cell colors - match mobile grey styling */
          .desktop-row .cell {
            color: rgba(255, 255, 255, .5);
            font-size: 12px;
          }

          .desktop-row .cell.amount,
          .desktop-row .cell.multiplier,
          .desktop-row .cell.payout {
            color: rgba(255, 255, 255, .5);
            font-weight: inherit;
          }
        }
      `}</style>
    </div>
  )
}