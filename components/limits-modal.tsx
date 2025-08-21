"use client"

import { X } from "lucide-react"

interface LimitsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LimitsModal({ isOpen, onClose }: LimitsModalProps) {
  if (!isOpen) return null

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
          maxWidth: "300px", // Reduced from 384px (max-w-md)
          background: "rgba(8, 10, 12, 0.95)",
          borderRadius: "10px", // Reduced from 12px
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "18px", // Reduced from 24px
          minHeight: "300px", // Reduced from 400px
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-medium">Limits</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            style={{ fontSize: "18px" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Min Bet Section */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs mb-1.5">Min bet</label>
          <div
            className="w-full px-3 py-2.5 rounded-lg text-white text-base font-semibold"
            style={{
              background: "rgba(16, 20, 24, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            $0.1
          </div>
        </div>

        {/* Max Bet Section */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs mb-1.5">Max bet</label>
          <div
            className="w-full px-3 py-2.5 rounded-lg text-white text-base font-semibold"
            style={{
              background: "rgba(16, 20, 24, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            $100
          </div>
        </div>

        {/* Max Profit Section */}
        <div className="mb-4">
          <label className="block text-white/60 text-xs mb-1.5">Max Profit</label>
          <div
            className="w-full px-3 py-2.5 rounded-lg text-white text-base font-semibold"
            style={{
              background: "rgba(16, 20, 24, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            $10000
          </div>
        </div>
      </div>
    </div>
  )
}
