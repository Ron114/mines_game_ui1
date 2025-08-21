"use client"

import { X, Target, FileText, Volume2 } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal positioned below settings icon */}
      <div 
        className="absolute z-10"
        style={{
          top: "140px", // Position below the header
          right: "150px", // Align with settings icon
          width: "280px", // 30% smaller than max-w-md (384px)
          background: "linear-gradient(135deg, #2a2f35 0%, #1a1e22 50%, #12151a 100%)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "18px", // Reduced from 24px
          minHeight: "320px", // Reduced from 400px
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-medium">Settings</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "18px" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nickname Section */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs mb-1.5">Nickname</label>
          <div
            className="w-full px-3 py-2.5 rounded-lg text-white text-sm"
            style={{
              background: "rgba(32, 37, 43, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            Official Fowl
          </div>
        </div>

        {/* Buttons Section */}
        <div className="space-y-2.5 mb-4">
          <button
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-white/70 hover:text-white transition-colors text-sm"
            style={{
              background: "rgba(32, 37, 43, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Target size={16} className="mr-2.5" />
            <span>Limits</span>
          </button>

          <button
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-white/70 hover:text-white transition-colors text-sm"
            style={{
              background: "rgba(32, 37, 43, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <FileText size={16} className="mr-2.5" />
            <span>Rules</span>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <Volume2 size={16} className="text-white/70" />
          <div className="flex-1 relative">
            <div
              className="w-full h-1.5 rounded-full"
              style={{
                background: "rgba(32, 37, 43, 0.8)",
              }}
            >
              <div
                className="h-full rounded-full relative"
                style={{
                  background: "linear-gradient(90deg, #00ff88 0%, #00cc6a 100%)",
                  width: "60%",
                }}
              >
                <div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full shadow-lg"
                  style={{
                    background: "#00ff88",
                    right: "-6px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
