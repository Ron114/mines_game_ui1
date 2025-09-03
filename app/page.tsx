"use client"

import GameModal from "@/components/game-modal"

export default function Home() {
  const handleClose = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Desktop background - hidden on mobile */}
      <div className="desktop-bg min-h-screen bg-black">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "45px 100%",
          }}
        />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "30px 100%",
          }}
        />
      </div>

      <GameModal />
      
      {/* Close button positioned at app level - hidden on mobile */}
      <button
        onClick={handleClose}
        className="desktop-close-btn fixed z-50 text-white hover:text-gray-300 transition-colors duration-200"
        suppressHydrationWarning
        style={{
          fontSize: "24px",
          lineHeight: "1",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          top: "12%",
          right: "6%",
          transform: "translateY(-50%)",
        }}
      >
        ✕
      </button>

      <style jsx>{`
        /* Hide desktop background and close button on mobile */
        @media (max-width: 819px) {
          .desktop-bg,
          .desktop-close-btn {
            display: none;
          }
        }

        /* Show desktop elements only on desktop */
        @media (min-width: 820px) {
          .desktop-bg,
          .desktop-close-btn {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}
