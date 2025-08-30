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
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative z-10 w-full mx-4"
        style={{
          width: "17.5rem",
          height: "max-content",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(1.25rem)",
          border: "1px solid transparent",
          borderRadius: "1.5rem",
          padding: "1.5rem 1.5rem 0",
          margin: "0 auto",
          boxShadow: "0 12px 15px rgba(0, 0, 0, 0.25)",
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
          Limits
        </div>

        {/* Min Bet Block */}
        <div 
          style={{
            background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
            borderRadius: "0.375rem",
            height: "3rem",
            marginBottom: "1.5rem",
            padding: "0.5rem 0.75rem",
            boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
          }}
        >
          <div 
            className="text-white/50"
            style={{
              marginBottom: "0.0625rem",
              fontSize: "0.625rem",
              fontWeight: 400,
              lineHeight: "0.75rem",
            }}
          >
            Min bet
          </div>
          <div 
            className="text-white"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              lineHeight: "0.9375rem",
            }}
          >
            $0.1
          </div>
        </div>

        {/* Max Bet Block */}
        <div 
          style={{
            background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
            borderRadius: "0.375rem",
            height: "3rem",
            marginBottom: "1.5rem",
            padding: "0.5rem 0.75rem",
            boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
          }}
        >
          <div 
            className="text-white/50"
            style={{
              marginBottom: "0.0625rem",
              fontSize: "0.625rem",
              fontWeight: 400,
              lineHeight: "0.75rem",
            }}
          >
            Max bet
          </div>
          <div 
            className="text-white"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              lineHeight: "0.9375rem",
            }}
          >
            $100
          </div>
        </div>

        {/* Max Profit Block */}
        <div 
          style={{
            background: "linear-gradient(312.27deg, rgba(0, 0, 0, 0.125) 0.02%, rgba(0, 0, 0, 0.376) 100.02%)",
            borderRadius: "0.375rem",
            height: "3rem",
            marginBottom: "1.5rem",
            padding: "0.5rem 0.75rem",
            boxShadow: "-0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.25), 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.25)",
          }}
        >
          <div 
            className="text-white/50"
            style={{
              marginBottom: "0.0625rem",
              fontSize: "0.625rem",
              fontWeight: 400,
              lineHeight: "0.75rem",
            }}
          >
            Max Profit
          </div>
          <div 
            className="text-white"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              lineHeight: "0.9375rem",
            }}
          >
            $10000
          </div>
        </div>
      </div>
    </div>
  )
}
