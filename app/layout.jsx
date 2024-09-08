import { Poppins } from 'next/font/google'

import './globals.css'
//import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}) {
  return (
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html> 
  )
}