import type { Metadata } from 'next';
import './globals.css';
import ConvexClientProvider from './ConvexClientProvider';
import Footer from '@/components/ui/Footer';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

let title = 'AVA - Artficial Virtual Assistant';
let description = 'AVA is an AI-powered virtual assistant that helps you write better notes.';
let url = 'https://ava.io/';
let ogimage = 'https://ava.io/ogimage.png';
let sitename = 'ava.io';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          {children}
          <Analytics />
          <Footer />
          <Toaster position="bottom-right" reverseOrder={false} />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
