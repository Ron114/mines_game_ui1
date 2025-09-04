"use client"

import { X, FileText, Volume2, VolumeX, Edit } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useAudioContext } from '../contexts/AudioContext'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLimits?: () => void
  onOpenRules?: () => void
  triggerRef?: React.RefObject<HTMLElement>
}

export default function SettingsModal({ isOpen, onClose, onOpenLimits, onOpenRules, triggerRef }: SettingsModalProps) {
  const { volume, setVolume, isMuted, setMuted } = useAudioContext()
  const [isDragging, setIsDragging] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 50, right: 20 })
  const [nickname, setNickname] = useState("Diplomatic Frog")
  const [isNicknameFocused, setIsNicknameFocused] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Calculate modal position based on settings button position
  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const headerContainer = triggerRef.current.closest('.flex.items-center.relative') as HTMLElement

      if (headerContainer) {
        const containerRect = headerContainer.getBoundingClientRect()

        // Position modal below the settings button with some spacing
        const top = triggerRect.bottom - containerRect.top + 5
        const right = containerRect.right - triggerRect.right

        setModalPosition({ top, right })
      }
    }
  }, [isOpen, triggerRef])

  // Handle click outside to close modal and prevent mobile scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)

      // Prevent background scrolling on mobile
      const isMobile = window.innerWidth <= 920
      if (isMobile) {
        document.body.style.overflow = 'hidden'
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        // Restore scrolling when modal closes
        if (isMobile) {
          document.body.style.overflow = 'auto'
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="absolute z-10 settings-modal pointer-events-auto"
      style={{
        width: "280px",
        background: "rgba(0, 0, 0, .4)",
        borderRadius: "28px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        padding: "18px",
        minHeight: "260px",
        boxShadow: "0 0 1.25rem rgba(0, 0, 0, .5)",
        backdropFilter: "blur(10px)",
        top: `50px`,
        right: `20px`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-white font-semibold relative"
          style={{
            color: "rgba(255, 255, 255, 0.5)",
            marginBottom: "0.75rem",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Settings
        </h2>
        <button
          onClick={onClose}
          className="cursor-pointer text-white/70 hover:text-white transition-colors absolute z-10"
          style={{
            top: "1.5rem",
            right: "1.5rem",
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Nickname Section */}
      <div className="mb-4">
        <div
          className="relative"
          style={{
            // background: "linear-gradient(148.95deg, rgba(190, 191, 192, 0.8) -14.69%, rgba(35, 47, 57, 0.23) 180.58%)",
            borderRadius: "0.6875rem",
            height: "3.1rem",
            padding: "0.0625rem",
            boxShadow: "inset 0.125rem 0.125rem 0.125rem rgba(26, 32, 38, 0.4)",
          }}
        >
          <div
            className="relative w-full h-full border-b-2 border-[#393b3d] border-r-2"
            style={{
              background: "#0f1012",
              borderRadius: "0.375rem",
            }}
          >
            <label
              className="absolute text-white/50 font-medium"
              style={{
                fontSize: "0.625rem",
                top: "0.5rem",
                left: "0.625rem",
              }}
            >
              Nickname
            </label>

            {/* Character count - only show when focused */}
            {isNicknameFocused && (
              <div
                className="absolute text-white/50 font-medium"
                style={{
                  fontSize: "0.625rem",
                  top: "0.5rem",
                  right: "2.5rem",
                }}
              >
                {nickname.length}/32
              </div>
            )}

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setIsNicknameFocused(true)}
              onBlur={() => setIsNicknameFocused(false)}
              maxLength={32}
              className="absolute w-full h-full bg-transparent border-none outline-none text-white font-bold"
              style={{
                padding: "1.25rem 3.0625rem 0.375rem 0.625rem",
                fontSize: "0.8125rem",
                color: "#d6e1ef",
              }}
            />

            {/* Edit icon - only show when focused */}
            {isNicknameFocused && (
              <div
                className="absolute cursor-pointer"
                style={{
                  bottom: "0.375rem",
                  right: "0.625rem",
                }}
              >
                <svg version="1.1" id="Edit--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 16 16" enableBackground="new 0 0 32 32" height="16" width="16">
                  <path d="M1 13h14v1H1Z" fill="#969698" strokeWidth="1"></path>
                  <path d="M12.7 4.5c0.4 -0.4 0.4 -1 0 -1.4l-1.8 -1.8c-0.4 -0.4 -1 -0.4 -1.4 0l-7.5 7.5V12h3.2l7.5 -7.5zm-2.5 -2.5L12 3.8l-1.5 1.5L8.7 3.5l1.5 -1.5zM3 11v-1.8l5 -5 1.8 1.8 -5 5H3z" fill="#969698" strokeWidth="1"></path>
                  <path id="_Transparent_Rectangle_" d="M0 0h16v16H0Z" fill="none" strokeWidth="1"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="space-y-1.5 mb-6">
        <button
          onClick={() => {
            onClose()
            onOpenLimits?.()
          }}
          className="w-full flex items-center cursor-pointer transition-colors"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "0.0625rem solid rgba(255, 255, 255, 0.35)",
            borderRadius: "0.375rem",
            height: "2.25rem",
            padding: "0.75rem",
            boxShadow: "0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.35)",
          }}
        >
          <div
            className="flex items-center justify-center mr-3"
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              borderRadius: "0.375rem",
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "0.875rem",
            }}
          >
            {/* <Target size={14} /> */}
            <div className="w-4 h-4 bg-none border-4 border-[#969698] rounded-full relative">
              <div className="w-[0.45rem] h-[0.45rem] bg-[#969698] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          <span
            className="flex-1 text-center font-bold"
            style={{
              color: "#fff",
              opacity: 0.5,
              fontSize: "0.75rem",
            }}
          >
            Limits
          </span>
        </button>

        <button
          onClick={() => {
            onClose()
            onOpenRules?.()
          }}
          className="w-full flex items-center cursor-pointer transition-colors mb-6"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "0.0625rem solid rgba(255, 255, 255, 0.35)",
            borderRadius: "0.375rem",
            height: "2.25rem",
            padding: "0.75rem",
            boxShadow: "0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.35)",
          }}
        >
          <div
            className="flex items-center justify-center mr-3"
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              borderRadius: "0.375rem",
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "0.875rem",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32" fill="none" className="w-[18px]">
              <path d="M4 2H17L24 9V30H4V2Z" fill="#969698" />

              <rect x="8" y="12" width="12" height="1" fill="#2c2e31" />
              <rect x="8" y="18" width="12" height="1" fill="#2c2e31" />
              <rect x="8" y="24" width="12" height="1" fill="#2c2e31" />
            </svg>

          </div>
          <span
            className="flex-1 text-center font-bold"
            style={{
              color: "#fff",
              opacity: 0.5,
              fontSize: "0.75rem",
            }}
          >
            Rules
          </span>
        </button>
      </div>

      {/* Volume Control */}
      <div
        className="flex items-center cursor-pointer"
        style={{
          margin: "0.5rem 0 0.25rem 0",
          height: "2.25rem",
          padding: "0.75rem",
        }}
      >
        <button
          onClick={() => setMuted(!isMuted)}
          className="flex items-center justify-center mr-3 cursor-pointer border-none bg-transparent outline-none"
          style={{
            color: "rgba(255, 255, 255, 0.5)",
            borderRadius: "0.375rem",
            width: "1.5rem",
            height: "1.5rem",
            fontSize: "0.875rem",
          }}
        >
          {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <div className="flex-1 relative" style={{ height: "1.125rem" }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
            style={{ margin: 0, padding: 0 }}
          />
          <div
            className="w-full block relative overflow-hidden"
            style={{
              borderRadius: "0.5625rem",
              height: "1.125rem",
              boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25), inset 0.125rem 0.125rem 0.5rem 0.0625rem rgba(4, 4, 5, 0.6)",
            }}
          >
            {/* Green gradient background - only visible portion */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-150 ease-out"
              style={{
                background: "linear-gradient(270deg, #01ffa4 -33.45%, rgba(0, 165, 125, 0.5) 100%)",
                filter: "blur(0.25rem)",
                borderRadius: "0.5625rem",
                boxShadow: "0 0 0.625rem #a6ff60",
                width: `${volume * 100}%`,
                opacity: volume > 0 ? 1 : 0,
              }}
            />
            {/* Dark overlay for remaining portion */}
            <div
              className="absolute top-0 h-full transition-all duration-150 ease-out"
              style={{
                background: "#051c18",
                left: `${volume * 100}%`,
                right: 0,
                borderRadius: "0.5625rem",
              }}
            />
          </div>
          {/* Draggable button */}
          <div
            className="absolute top-1/2 transition-all duration-150 ease-out"
            style={{
              left: `${volume * 100}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div
              className="flex items-center justify-center overflow-hidden relative"
              style={{
                background: "linear-gradient(312.89deg, #121416 -8.2%, #353a40 103.29%)",
                borderRadius: "50%",
                width: "1.5rem",
                height: "1.5rem",
                boxShadow: "-0.1875rem -0.1875rem 1rem rgba(232, 237, 243, 0.05), 0.1875rem 0.125rem 0.25rem rgba(2, 3, 3, 0.486), inset -1rem -0.375rem 5rem rgba(248, 249, 249, 0.03)",
                transition: "all 0.15s ease-out",
                transform: isDragging ? "scale(1.1)" : "scale(1)",
              }}
            >
              {/* Outer shadow ring */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-150 ease-out"
                style={{
                  background: "linear-gradient(135deg, #000 0%, rgba(255, 255, 255, 0) 100%)",
                  margin: "0.125rem",
                }}
              />
              {/* Inner glowing dot */}
              <div
                className="absolute rounded-full transition-all duration-150 ease-out"
                style={{
                  background: volume > 0 ? "#00ff75" : "#666",
                  top: "0.25rem",
                  bottom: "0.25rem",
                  left: "0.25rem",
                  right: "0.25rem",
                  boxShadow: volume > 0 ? "0 0 0.3125rem #a6ff60, 0 0 0.625rem #76ff60" : "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback positioning */}
      <style jsx>{`
        @media (max-width: 920px) {
          .settings-modal {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, -50%) !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}
