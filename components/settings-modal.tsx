"use client"

import { X, Target, FileText, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLimits?: () => void
  onOpenRules?: () => void
}

export default function SettingsModal({ isOpen, onClose, onOpenLimits, onOpenRules }: SettingsModalProps) {
  const [volume, setVolume] = useState(1)
  const [isDragging, setIsDragging] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Modal positioned below settings icon */}
      <div 
        className="absolute z-10 settings-modal pointer-events-auto"
        style={{
          width: "280px",
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "25px",
          border: "none",
          padding: "18px 18px 12px 18px",
          minHeight: "280px",
          boxShadow: "0 0 1.25rem rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(1.25rem)",
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
              background: "linear-gradient(148.95deg, rgba(190, 191, 192, 0.8) -14.69%, rgba(35, 47, 57, 0.23) 180.58%)",
              borderRadius: "0.6875rem",
              height: "2.875rem",
              padding: "0.0625rem",
              boxShadow: "inset 0.125rem 0.125rem 0.125rem rgba(26, 32, 38, 0.4)",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                background: "linear-gradient(318.44deg, #1a1b1f 21.28%, #242a30 141.88%)",
                borderRadius: "0.625rem",
                boxShadow: "inset 0.125rem 0.1875rem 0.625rem #070709, inset -0.125rem -0.125rem 0.625rem rgba(255, 255, 255, 0.05)",
                border: "none",
              }}
            >
              <label 
                className="absolute font-medium"
                style={{
                  fontSize: "0.625rem",
                  top: "0.5rem",
                  left: "0.625rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  zIndex: 10,
                }}
              >
                Nickname
              </label>
              <input
                type="text"
                defaultValue="Diplomatic Frog"
                className="absolute w-full h-full outline-none text-white font-bold"
                style={{
                  background: "#000000",
                  border: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "0.625rem",
                  padding: "1.25rem 3.0625rem 0.375rem 0.625rem",
                  fontSize: "0.8125rem",
                  color: "#d6e1ef",
                }}
              />
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="space-y-1.5 mb-4">
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
              <Target size={14} />
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
              <FileText size={14} />
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
            margin: "0rem 0 0.25rem 0",
            height: "2.25rem",
            padding: "0.75rem",
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
            {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </div>
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
      </div>


      {/* Responsive positioning styles */}
      <style jsx>{`
        .settings-modal {
          top: 60px;
          right: 20px;
        }

        @media (min-width: 1200px) {
          .settings-modal {
            top: 155px;
            right: calc((98vw - 880px) / 2 + 20px);
          }
        }

        @media (max-width: 920px) {
          .settings-modal {
            top: 60px;
            right: 20px;
            left: auto;
          }
        }
      `}</style>
    </div>
  )
}
