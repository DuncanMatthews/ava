// components/ui/Header.tsx

import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <nav>
          {/* Add navigation items */}
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;