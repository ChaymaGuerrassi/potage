import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/navbar/Navbar'
import {League_Spartan } from 'next/font/google'
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import AnnounceModal from './components/modals/AnnounceModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/Footer';


const font = League_Spartan({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ça patoge',
  description: 'l\'app qui patoge !',
}

export default async function  RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="fr">
      <body className={font.className + ' bg-hero-pattern text-ptgGrey'}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <AnnounceModal />
        <Navbar currentUser={currentUser}/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
