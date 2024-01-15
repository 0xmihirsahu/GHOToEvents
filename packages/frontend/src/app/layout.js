import { Inter } from 'next/font/google'
import ClientLayout from './Web3Provider'
import './globals.css'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EventsGHO',
  description: 'Events Dapp',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <NavBar/>
            {children}
        </ClientLayout>
        </body>
    </html>
  )
}
