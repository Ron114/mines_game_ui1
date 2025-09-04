"use client"

import { ChevronLeft, Volume2, Settings } from "lucide-react"
import { useState, useRef } from "react"
import SettingsModal from "./settings-modal"
import LimitsModal from "./limits-modal"
import RulesModal from "./rules-modal"
import { useGame } from '../contexts/GameContext'
import { useAudioContext } from '../contexts/AudioContext'

export default function GameHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLimitsOpen, setIsLimitsOpen] = useState(false)
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const { balance, showAlert, alertMessage } = useGame()
  const { isMuted, setMuted } = useAudioContext()
  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  return (
    <div className="flex items-center relative px-2 pr-5 text-white/50 md:pt-2 pt-0" style={{ maxWidth: '950px', margin: '0 auto', width: '100%' }}>
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
      <div className="flex items-center ml-auto relative">
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
          onClick={() => setMuted(!isMuted)}
          suppressHydrationWarning
        >
          <div
            className="flex items-center justify-center w-7 h-7 min-w-full min-h-full rounded-full relative"
            style={{
              background: "linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%)",
            }}
          >
            {/* <Volume2 size={14} className="text-white/70" /> */}
            <svg fill="#969698" className="w-5 settings-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,416a23.88,23.88,0,0,1-14.2-4.68,8.27,8.27,0,0,1-.66-.51L125.76,336H56a24,24,0,0,1-24-24V200a24,24,
            0,0,1,24-24h69.75l91.37-74.81a8.27,8.27,0,0,1,.66-.51A24,24,0,0,1,256,120V392a24,24,0,0,1-24,24ZM125.82,336Zm-.27-159.86Z" />
              <path d="M320,336a16,16,0,0,1-14.29-23.19c9.49-18.87,14.3-38,14.3-56.81,0-19.38-4.66-37.94-14.25-56.73a16,16,0,0,1,28.5-14.54C346.19,208.12,352,231.44,352,256c0,23.86-6,47.81-17.7,71.19A16,16,0,0,1,320,336Z" /><path d="M368,384a16,16,0,0,1-13.86-24C373.05,327.09,384,299.51,384,256c0-44.17-10.93-71.56-29.82-103.94a16,16,0,0,1,27.64-16.12C402.92,172.11,416,204.81,416,256c0,50.43-13.06,83.29-34.13,120A16,16,0,0,1,368,384Z" /></svg>
            {/* Dash overlay when muted */}
            {isMuted && (
              <div className="volume-mute-dash"></div>
            )}
          </div>
        </button>

        <button
          ref={settingsButtonRef}
          className="w-7 h-7 ml-3 cursor-pointer relative"
          onClick={() => setIsSettingsOpen(true)}
          suppressHydrationWarning
        >
          <div
            className="flex items-center justify-center w-7 h-7 min-w-full min-h-full rounded-full"
            style={{
              background: "linear-gradient(320.64deg, #17191c -42.09%, #32383e 167.71%)",
            }}
          >
            <svg className="w-5 settings-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="style=fill">
                <g id="setting">
                  <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M10.8946 3.00654C10.2226 1.87704 8.75191 1.45656 7.59248 2.14193L5.86749 3.12906C4.59518 3.85639 4.16378 5.48726 4.8906 6.74522L4.89112 6.74611C5.26606 7.39298 5.20721 7.8062 5.09018 8.00929C4.97308 8.21249 4.64521 8.47001 3.9 8.47001C2.43322 8.47001 1.25 9.66837 1.25 11.12V12.88C1.25 14.3317 2.43322 15.53 3.9 15.53C4.64521 15.53 4.97308 15.7875 5.09018 15.9907C5.20721 16.1938 5.26606 16.607 4.89112 17.2539L4.8906 17.2548C4.16378 18.5128 4.59558 20.1439 5.8679 20.8712L7.59257 21.8581C8.75199 22.5434 10.2226 22.123 10.8946 20.9935L11.0091 20.7958C11.3841 20.1489 11.773 19.9925 12.0087 19.9925C12.2434 19.9925 12.6293 20.1476 12.9993 20.793L13.0009 20.7958L13.1109 20.9858L13.1154 20.9935C13.7874 22.123 15.258 22.5434 16.4174 21.8581L18.1425 20.871C19.4157 20.1431 19.8444 18.5235 19.1212 17.2579L19.1189 17.2539C18.7439 16.607 18.8028 16.1938 18.9198 15.9907C19.0369 15.7875 19.3648 15.53 20.11 15.53C21.5768 15.53 22.76 14.3317 22.76 12.88V11.12C22.76 9.65323 21.5616 8.47001 20.11 8.47001C19.3648 8.47001 19.0369 8.21249 18.9198 8.00929C18.8028 7.8062 18.7439 7.39298 19.1189 6.74611L19.1194 6.74522C19.8463 5.48713 19.4147 3.85604 18.1421 3.12883L16.4175 2.14193C15.2581 1.45656 13.7874 1.877 13.1154 3.00651L13.0009 3.20423C12.6259 3.85115 12.237 4.00751 12.0012 4.00751C11.7666 4.00751 11.3807 3.85247 11.0107 3.20701L11.0091 3.20423L10.8991 3.01421L10.8946 3.00654ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="#969698" />
                </g>
              </g>
            </svg>
          </div>
        </button>

        {/* Alert Message */}
        {showAlert && (
          <div className="alert-message">
            <div className="_success"></div>
            <div className="message-content">
              Please press "Start Game"
            </div>
          </div>
        )}
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

        /* Settings icon hover effect */
        .settings-icon {
          transition: fill 0.2s ease;
        }

        button:hover .settings-icon path {
          fill: white;
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

        /* Alert Message Styles */
        .alert-message {
          z-index: 10000;
          width: 230px;
          position: absolute;
          top: 5px;
          right: -5px;
          padding: 18px 20px;
        }

        .message-content {
          z-index: 3;
          color: rgb(255, 255, 255);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          position: relative;
        }

        .alert-message:after {
          content: "";
          backdrop-filter: blur(10px);
          z-index: 2;
          background-image: radial-gradient(circle at -42% -120%, rgba(255, 255, 255, 0.69), rgba(255, 255, 255, 0) 103%), radial-gradient(circle at -3% 100%, rgb(0, 0, 0), rgba(255, 255, 255, 0) 30%);
          border-radius: 15px;
          position: absolute;
          inset: 0px;
        }

        ._success {
          width : 55px;
          height : 55px;
          top: -13px;
          left: -15px;
          border-radius: 50%;
          position: absolute;
          background-image: linear-gradient(136.4deg, rgb(80, 224, 139) 9.61%, rgb(28, 86, 106) 63.95%);
        }

        .alert-content {
          font-size: 15px;
          color: white;
        }

        /* Mobile responsive alert styles */
        @media (max-width: 819px) {
          .alert-message {
            right: -20px;
            top: 50%;
          }

          .alert-content {
            padding: 6px 10px;
            font-size: 11px;
            border-radius: 4px;
            min-width: 120px;
          }
        }
      `}</style>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onOpenLimits={() => setIsLimitsOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        triggerRef={settingsButtonRef}
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
