import Script from 'next/script'
import { Providers } from './Redux/providers'
import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthProvider from './components/NextAuthProvider'
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EZONE',
  description: 'Discover the latest electronics, clothes, and accessories at competitive prices on EZone - your one-stop online shop for all your needs. Browse our wide selection, enjoy fast and reliable shipping, and experience exceptional customer service. Shop now and elevate your digital lifestyle with EZone!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>
            <Navbar />
            <ToastContainer />
            {children}
            <Footer />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  )
}
