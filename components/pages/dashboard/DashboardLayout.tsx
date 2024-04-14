// components/layouts/DashboardLayout.tsx

import React from 'react';
import Header from '@/components/ui/Header';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
     <DashboardHeader />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;