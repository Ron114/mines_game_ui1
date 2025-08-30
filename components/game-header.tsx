"use client"

import { ChevronLeft, Volume2, Settings } from "lucide-react"
import { useState } from "react"
import SettingsModal from "./settings-modal"
import LimitsModal from "./limits-modal"
import RulesModal from "./rules-modal"
import { useGame } from '../contexts/GameContext'

export default function GameHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLimitsOpen, setIsLimitsOpen] = useState(false)
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { balance } = useGame()
  return (
    <div className="flex items-center relative px-2 text-white/50 pt-2" style={{ maxWidth: '880px', margin: '0 auto', width: '100%' }}>
      {/* Left side - Back button and Logo */}
      <div className="flex items-center">
        <button
          className="flex items-center justify-center w-7 h-7 min-w-7 mr-3 text-xl cursor-pointer rounded-full relative"
          style={{
            backgroundImage: "linear-gradient(135deg, #32383e 0%, #17191c 100%)",
            boxShadow: "0.1875rem 0.1875rem 0.25rem rgba(10, 9, 9, 0.4)",
          }}
        >
          <ChevronLeft size={16} className="text-white/70" />
        </button>

        <div className="flex items-center">
          <img
            src="/assets/minesgamelogo.svg"
            alt="Mines Game Logo"
            className="game-header__logo"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              marginRight: "auto",
              position: "relative",
            }}
          />
        </div>
      </div>

      {/* Right side - Balance and Controls */}
      <div className="flex items-center ml-auto">
        <div className="balance-label text-white/60 ml-auto mr-1.5 font-bold" style={{ fontWeight: 700 }}>
          Balance:
        </div>

        <div
          className="flex items-center relative text-sm font-bold px-1.5 h-6 min-w-24"
          style={{
            backgroundImage: "linear-gradient(315deg, #24282c 0%, #141619 100%)",
            borderRadius: "0.375rem",
            boxShadow:
              "inset -0.125rem -0.125rem 0.75rem rgba(255, 255, 255, 0.06), inset 0.125rem 0.1875rem 0.5rem rgba(7, 7, 9, 0.8)",
            color: "#d6e1ef",
            fontSize: "0.8125rem",
            fontWeight: 700,
          }}
        >
          ${balance.toFixed(1)}
        </div>
        <button 
          className="w-7 h-7 ml-3 cursor-pointer relative"
          onClick={() => setIsMuted(!isMuted)}
        >
          <div
            className="flex items-center justify-center w-7 h-7 min-w-full min-h-full rounded-full relative"
            style={{
              background: "linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%)",
            }}
          >
            <Volume2 size={14} className="text-white/70" />
            {/* Dash overlay when muted */}
            {isMuted && (
              <div className="volume-mute-dash"></div>
            )}
          </div>
        </button>

        <button 
          className="w-7 h-7 ml-3 cursor-pointer relative"
          onClick={() => setIsSettingsOpen(true)}
        >
          <div
            className="flex items-center justify-center w-7 h-7 min-w-full min-h-full rounded-full"
            style={{
              background: "linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%)",
            }}
          >
            <Settings size={14} className="text-white/70" />
          </div>
        </button>
      </div>

      <style jsx>{`
        /* Volume mute dash overlay */
        .volume-mute-dash {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 18px;
          height: 2px;
          background: #888;
          border-radius: 1px;
          z-index: 10;
        }

        /* Button reset styles */
        button {
          border: none;
          background: none;
          outline: none;
        }

        /* Mobile responsive styles */
        @media (max-width: 819px) {
          .balance-label {
            display: none;
          }

          .game-header__logo {
            width: 130px;
            height: 45px;
          }

          .volume-mute-dash {
            width: 16px;
            height: 2px;
          }
        }

        /* Desktop styles */
        @media (min-width: 820px) {
          .balance-label {
            display: block;
          }

          .game-header__logo {
            width: 120px;
            height: 45px;
          }
        }
      `}</style>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onOpenLimits={() => setIsLimitsOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
      />
      
      {/* Limits Modal */}
      <LimitsModal 
        isOpen={isLimitsOpen} 
        onClose={() => setIsLimitsOpen(false)} 
      />
      
      {/* Rules Modal */}
      <RulesModal 
        isOpen={isRulesOpen} 
        onClose={() => setIsRulesOpen(false)} 
      />
    </div>
  )
}
