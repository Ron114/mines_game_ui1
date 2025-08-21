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
          maxWidth: "520px", // Reduced from 672px (max-w-2xl)
          background: "rgba(8, 10, 12, 0.95)",
          borderRadius: "10px", // Reduced from 12px
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "18px", // Reduced from 24px
          maxHeight: "70vh", // Reduced from 80vh
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-medium">Rules</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "18px" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Game Description */}
        <div className="mb-4 flex items-center">
          <span className="text-white/80 text-xs">
            Turn on your sixth sense and find all the gems without hitting a mine! 💎
          </span>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {/* How to Play */}
          <div>
            <button
              onClick={() => toggleSection("howToPlay")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">How to Play?</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "howToPlay" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "howToPlay" && (
              <div className="py-3 text-white/70 space-y-2">
                <ul className="space-y-1.5 list-disc list-inside text-xs">
                  <li>Choose the number of mines and press "Start Game" to begin</li>
                  <li>Look for the gems but beware of mines!</li>
                  <li>Cash Out before you hit a mine and a reward is yours!</li>
                </ul>
              </div>
            )}
          </div>

          {/* Game Details */}
          <div>
            <button
              onClick={() => toggleSection("gameDetails")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">Game Details</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "gameDetails" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Autoplay */}
          <div>
            <button
              onClick={() => toggleSection("autoplay")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">Autoplay</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "autoplay" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Settings */}
          <div>
            <button
              onClick={() => toggleSection("settings")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">Settings</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "settings" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Bets History */}
          <div>
            <button
              onClick={() => toggleSection("betsHistory")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">Bets History</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "betsHistory" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Disconnection Policy */}
          <div>
            <button
              onClick={() => toggleSection("disconnection")}
              className="w-full flex items-center justify-between py-3 text-left border-b border-white/10"
            >
              <span className="text-white text-base font-medium">Disconnection Policy</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "disconnection" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Version */}
          <div>
            <button
              onClick={() => toggleSection("version")}
              className="w-full flex items-center justify-between py-3 text-left"
            >
              <span className="text-white text-base font-medium">Version</span>
              <ChevronDown 
                size={18} 
                className={`text-white/60 transition-transform ${
                  expandedSection === "version" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
