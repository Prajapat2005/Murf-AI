import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="relative">
            <div className='absolute right-8 top-8'>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "35px",
                      height: "35px",
                    },
                  },
                }}
              />
            </div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
