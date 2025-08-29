"use client"

import { X, ChevronDown } from "lucide-react"
import { useState } from "react"

interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("howToPlay")

  if (!isOpen) return null

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative z-10 w-full mx-4"
        style={{
          width: "auto",
          maxWidth: "520px",
          height: "max-content",
          maxHeight: "80vh",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(1.25rem)",
          border: "1px solid transparent",
          borderRadius: "1.5rem",
          padding: "1.5rem 1.5rem 0",
          margin: "0 auto",
          boxShadow: "0 12px 15px rgba(0, 0, 0, 0.25)",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer text-white/75 hover:text-white transition-colors z-10"
          style={{
            top: "1.5rem",
            right: "1.5rem",
          }}
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div 
          className="text-white font-semibold"
          style={{
            opacity: 0.5,
            marginBottom: "1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Rules
        </div>

        {/* Expandable Sections */}
        <div className="space-y-0">
          {/* Game Details */}
          <div>
            <button
              onClick={() => toggleSection("gameDetails")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>Game Details</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "gameDetails" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "gameDetails" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-1.5" style={{ padding: "0.375rem 0" }}>
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Place Bet
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p className="mb-1">Enter a valid amount in the field "Amount".</p>
                    <p className="mb-1">Choose the number of mines from 2 to 24. The more mines are on the playing field, the higher the winning multiplier will be, as well as blow up chance.</p>
                    <p>Press "Start Game"</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Gameplay
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p className="mb-1">Open tiles looking for gems. With each opened gem payout multiplier increases.</p>
                    <p className="mb-1">But if you hit a mine you lose your bet. So choose wisely!</p>
                    <p>Use the "Game details" table to evaluate your chances.</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Cash Out
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p className="mb-1">When you've found one or more gems - you can press "Cash Out" to collect your reward.</p>
                    <p className="mb-1">Win amount = current payout multiplier * bet amount.</p>
                    <p className="mb-1">Win amount is rounded down to two decimal places.</p>
                    <p>If you've found all gems - Cash Out will be triggered automatically.</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Min & Max Multiplier
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p className="mb-1">The minimum win multiplier is x1.03.</p>
                    <p>The maximum win multiplier is x4940285 (it could be achieved for setting with 13 mines & 12 successively opened tiles). However, the maximum win is limited by the operator and can be accessed from the "Limits" section in the settings menu.</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p>You can cancel the bet only if you haven't opened any tiles yet.</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Mine risk calculation formula
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p>Mine risk = Mines Quantity / (All Tiles - Opened Tiles) * 100%</p>
                  </div>
                </div>
                
                <div 
                  className="text-white overflow-hidden transition-all duration-300 ease-linear"
                  style={{
                    background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
                    maxHeight: "2.5rem",
                    marginBottom: "0.375rem",
                    boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                  }}
                >
                  <h4 
                    className="text-white"
                    style={{
                      padding: "0 0 0.625rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    RTP
                  </h4>
                  <div 
                    className="text-gray-400"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 400,
                      lineHeight: "0.75rem",
                    }}
                  >
                    <p className="mb-1">Game relies on a coefficient called "RTP" (Return to Player) which is the statistical average of payouts over billions of rounds.</p>
                    <p>Mines has a minimum RTP of 94.40%. The maximum RTP of 95.30% can be achieved by cashing out at a multiplier of x1.03.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Autoplay */}
          <div>
            <button
              onClick={() => toggleSection("autoplay")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>Autoplay</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "autoplay" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "autoplay" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 text-white space-y-3" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                <p>You can switch to the Auto mode and configure the bet settings so the system will play instead of you.</p>
                
                <div>
                  <p className="font-semibold mb-2">Settings:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• choose tiles to be opened on the playfield</li>
                    <li>• number of mines</li>
                    <li>• bet amount. This sum will be applied for every auto game</li>
                    <li>• number of rounds. If the field is left blank, the game will run until you press the stop button.</li>
                    <li>• actions on win/loss. You can increase your bet sum by N% or reset it to default value, which you've set in the "Amount" field</li>
                    <li>• "stop at any win" toggle will stop autoplay on win, even if number of rounds in the queue &gt; 0</li>
                  </ul>
                </div>
                
                <p>You can stop autobetting by clicking on "Stop Autoplay" button.</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <button
              onClick={() => toggleSection("settings")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>Settings</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "settings" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "settings" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 text-white space-y-3" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                <p>Click the gear icon in the top right corner of the screen to open the settings menu. In Settings you can:</p>
                
                <ul className="space-y-1 ml-4">
                  <li>• change the nickname</li>
                  <li>• view bet limits: Minimum bet, Maximum bet, Maximum Profit</li>
                  <li>• turn on/off sounds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bets History */}
          <div>
            <button
              onClick={() => toggleSection("betsHistory")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>Bets History</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "betsHistory" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "betsHistory" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 text-white space-y-3" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                <p>At the bottom of each Turbo game there is a panel with information about:</p>
                
                <ul className="space-y-1 ml-4">
                  <li>• "All bets" - recently played games across all users</li>
                  <li>• "Top bets" - recent winning bets with multiplier above x10</li>
                  <li>• "My bets" - list of your recent bets</li>
                </ul>
                
                <p>You can click on any bet to see the details.</p>
              </div>
            </div>
          </div>

          {/* Disconnection Policy */}
          <div>
            <button
              onClick={() => toggleSection("disconnection")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>Disconnection Policy</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "disconnection" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "disconnection" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 text-white space-y-3" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                <p>We prioritize the security and satisfaction of our players, even in the event of unexpected internet connection interruptions. Here's how we handle such situations:</p>
                
                <ul className="space-y-2 ml-4">
                  <li>• If a bet is placed after a disconnection, it will not be sent to the server, no funds will be deducted, and the game will not proceed.</li>
                  <li>• If a disconnection occurs during an active game, the game state on the server will remain unchanged. Players will be able to resume the game once the connection is restored.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Version */}
          <div>
            <button
              onClick={() => toggleSection("version")}
              className="w-full flex items-center justify-between py-3 text-left text-white font-semibold hover:text-white/80 transition-colors"
              style={{
                fontSize: "1rem",
              }}
            >
              <span>Version</span>
              <ChevronDown 
                size={16} 
                className={`text-white/60 transition-transform duration-200 ${
                  expandedSection === "version" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSection === "version" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 text-white space-y-2" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                <p>Game version: "1.0.3"</p>
                <p>RNG version: "2.0.0"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
