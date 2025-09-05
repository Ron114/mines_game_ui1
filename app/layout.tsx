import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mines Game',
  description: 'A mines game application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
            /* Prevent pull-to-refresh and overscroll */
            overscroll-behavior: none;
            overflow: hidden;
            height: 100%;
            position: fixed;
            width: 100%;
          }
          
          body {
            overscroll-behavior: none;
            overflow: hidden;
            height: 100%;
            position: fixed;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          
          @media (max-width: 819px) {
            html, body {
              touch-action: pan-x pan-y;
              -webkit-overflow-scrolling: touch;
            }
            
            /* Prevent elastic bounce */
            * {
              -webkit-overflow-scrolling: touch;
            }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
