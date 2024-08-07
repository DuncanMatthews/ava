import Header from '@/components/ui/Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
         <Header />
      {children}
    </div>
  )
}
