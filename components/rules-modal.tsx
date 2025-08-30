"use client"

import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set(["howToPlay"]))

  if (!isOpen) return null

  const toggleBlock = (blockId: string) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="modal-light _rules_modal relative z-10"
        style={{
          cursor: "default",
          WebkitTextSizeAdjust: "100%",
          fontVariantLigatures: "none",
          textRendering: "optimizeLegibility",
          textShadow: "0 0 1px rgba(0,0,0,.01)",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          textAlign: "left",
          zoom: 1,
          WebkitFontSmoothing: "antialiased",
          boxSizing: "border-box",
          WebkitTapHighlightColor: "transparent",
          fontWeight: "inherit",
          fontStyle: "inherit",
          verticalAlign: "baseline",
          userSelect: "none",
          outline: 0,
          fontFamily: "inherit",
          fontSize: "100%",
          backdropFilter: "blur(1.25rem)",
          background: "rgba(0,0,0,.4)",
          border: "1px solid transparent",
          borderRadius: "1.5rem",
          height: "max-content",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 0",
          boxShadow: "0 0 1.25rem rgba(0,0,0,.5)",
          width: "25rem",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <div className="modal-light__close" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", cursor: "pointer" }} onClick={onClose}>
          <X size={16} className="text-white/75 hover:text-white transition-colors" />
        </div>

        {/* Title */}
        <div className="modal-light__title" style={{ 
          color: "white", 
          opacity: 0.5, 
          marginBottom: "1.5rem", 
          fontSize: "0.875rem", 
          fontWeight: 600 
        }}>
          Rules
        </div>

        {/* Top Content */}
        <div className="modal-light__content _top" style={{ marginBottom: "1rem" }}>
          <p style={{ color: "white", fontSize: "0.8125rem", lineHeight: "1.4" }}>
            Turn on your sixth sense and find all the gems without hitting a mine! 💣
          </p>
        </div>

        {/* Bottom Content - Expandable Blocks */}
        <div className="modal-light__content _bottom">
          
          {/* How to Play - Open by default */}
          <div 
            className={`block ${expandedBlocks.has("howToPlay") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("howToPlay") ? "100px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("howToPlay")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                How to Play?
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("howToPlay") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>
              
              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", lineHeight: "1.4", listStyle: "none", paddingLeft: 0 }}>
                <li style={{ marginBottom: "0.5rem" }}>• Choose the number of mines and press "Start Game" to begin</li>
                <li style={{ marginBottom: "0.5rem" }}>• Look for the gems but beware of mines!</li>
                <li>• Cash Out before you hit a mine and a reward is yours!</li>
              </ul>
            </div>
          </div>

          {/* Game Details */}
          <div 
            className={`block ${expandedBlocks.has("gameDetails") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("gameDetails") ? "600px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("gameDetails")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Game Details
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("gameDetails") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Place Bet</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                Enter a valid amount in the field "Amount".<br />
                Choose the number of mines from 2 to 24. The more mines are on the playing field, the higher the winning multiplier will be, as well as blow up chance.<br />
                Press "Start Game"
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Gameplay</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                Open tiles looking for gems. With each opened gem payout multiplier increases.<br />
                But if you hit a mine you lose your bet. So choose wisely!<br />
                Use the "Game details" table to evaluate your chances.
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Cash Out</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                When you've found one or more gems - you can press "Cash Out" to collect your reward.<br />
                Win amount = current payout multiplier * bet amount.<br />
                Win amount is rounded down to two decimal places.<br />
                If you've found all gems - Cash Out will be triggered automatically.
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Min & Max Multiplier</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                The minimum win multiplier is х1.03.<br />
                The maximum win multiplier is х4940285 (it could be achieved for setting with 13 mines & 12 successively opened tiles). However, the maximum win is limited by the operator and can be accessed from the "Limits" section in the settings menu.
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Cancel</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                You can cancel the bet only if you haven't opened any tiles yet.
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Mine risk calculation formula</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                Mine risk = Mines Quantity / (All Tiles - Opened Tiles) * 100%
              </p>

              <h3 style={{ color: "white", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>RTP</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                Game relies on a coefficient called "RTP" (Return to Player) which is the statistical average of payouts over billions of rounds.<br />
                Mines has a minimum RTP of 94.40%. The maximum RTP of 95.30% can be achieved by cashing out at a multiplier of x1.03.
              </p>
            </div>
          </div>

          {/* Autoplay */}
          <div 
            className={`block ${expandedBlocks.has("autoplay") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("autoplay") ? "300px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("autoplay")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Autoplay
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("autoplay") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                You can switch to the Auto mode and configure the bet settings so the system will play instead of you.
              </p>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "0.5rem" }}>Settings:</p>

              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", listStyle: "none", paddingLeft: 0, marginBottom: "1rem" }}>
                <li style={{ marginBottom: "0.25rem" }}>• choose tiles to be opened on the playfield</li>
                <li style={{ marginBottom: "0.25rem" }}>• number of mines</li>
                <li style={{ marginBottom: "0.25rem" }}>• bet amount. This sum will be applied for every auto game</li>
                <li style={{ marginBottom: "0.25rem" }}>• number of rounds. If the field is left blank, the game will run until you press the stop button.</li>
                <li style={{ marginBottom: "0.25rem" }}>• actions on win/loss. You can increase your bet sum by N% or reset it to default value, which you've set in the "Amount" field</li>
                <li style={{ marginBottom: "0.25rem" }}>• "stop at any win" toggle will stop autoplay on win, even if number of rounds in the queue &gt; 0</li>
              </ul>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4" }}>
                You can stop autobetting by clicking on "Stop Autoplay" button.
              </p>
            </div>
          </div>

          {/* Settings */}
          <div 
            className={`block ${expandedBlocks.has("settings") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("settings") ? "150px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("settings")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Settings
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("settings") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                Click the gear icon in the top right corner of the screen to open the settings menu. In Settings you can:
              </p>

              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", listStyle: "none", paddingLeft: 0 }}>
                <li style={{ marginBottom: "0.25rem" }}>• сhange the nickname</li>
                <li style={{ marginBottom: "0.25rem" }}>• view bet limits: Minimum bet, Maximum bet, Maximum Profit</li>
                <li>• turn on/off sounds</li>
              </ul>
            </div>
          </div>

          {/* Bets History */}
          <div 
            className={`block ${expandedBlocks.has("betsHistory") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("betsHistory") ? "200px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("betsHistory")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Bets History
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("betsHistory") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                At the bottom of each Turbo game there is a panel with information about:
              </p>

              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", listStyle: "none", paddingLeft: 0, marginBottom: "1rem" }}>
                <li style={{ marginBottom: "0.25rem" }}>• "All bets" - recently played games across all users</li>
                <li style={{ marginBottom: "0.25rem" }}>• "Top bets" - recent winning bets with multiplier above x10</li>
                <li style={{ marginBottom: "0.25rem" }}>• "My bets" - list of your recent bets</li>
              </ul>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4" }}>
                You can click on any bet to see the details.
              </p>
            </div>
          </div>

          {/* Disconnection Policy */}
          <div 
            className={`block ${expandedBlocks.has("disconnection") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("disconnection") ? "200px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("disconnection")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Disconnection Policy
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("disconnection") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "1rem" }}>
                We prioritize the security and satisfaction of our players, even in the event of unexpected internet connection interruptions. Here's how we handle such situations:
              </p>

              <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", listStyle: "none", paddingLeft: 0 }}>
                <li style={{ marginBottom: "0.5rem" }}>• If a bet is placed after a disconnection, it will not be sent to the server, no funds will be deducted, and the game will not proceed.</li>
                <li>• If a disconnection occurs during an active game, the game state on the server will remain unchanged. Players will be able to resume the game once the connection is restored.</li>
              </ul>
            </div>
          </div>

          {/* Version */}
          <div 
            className={`block ${expandedBlocks.has("version") ? "_open" : ""}`}
            style={{ 
              maxHeight: expandedBlocks.has("version") ? "100px" : "39px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              marginBottom: "0.5rem",
              cursor: "pointer",
              paddingBottom: "0.5rem"
            }}
            onClick={() => toggleBlock("version")}
          >
            <div className="block-inner" style={{ padding: "0.5rem 0" }}>
              <h2 style={{ 
                color: "white", 
                fontSize: "0.875rem", 
                fontWeight: 600, 
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                Version
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)",
                    transform: expandedBlocks.has("version") ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                />
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4", marginBottom: "0.5rem" }}>
                Game version: "1.0.3"
              </p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8125rem", lineHeight: "1.4" }}>
                RNG version: "2.0.0"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}