import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sora AI - Video Generation',
  description: 'Create stunning videos from text prompts using advanced AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
