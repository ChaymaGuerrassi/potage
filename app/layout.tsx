import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/navbar/Navbar'
import {League_Spartan } from 'next/font/google'
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';


const font = League_Spartan({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ça patoge',
  description: 'l\'app qui patoge !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={font.className + ' bg-hero-pattern text-ptgGrey'}>
        <RegisterModal />
        {/* <Modal isOpen title='Hello' actionLabel='Delete' secondaryActionLabel='Save'/> */}
        <Navbar />
        {children}
      </body>
    </html>
  )
}
