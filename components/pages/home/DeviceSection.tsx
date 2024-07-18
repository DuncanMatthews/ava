'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const DeviceSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Transcript', src: '/images/mobile1.png', alt: 'Transcript' },
    { label: 'Summary', src: '/images/mobile2.png', alt: 'Summary' },
    { label: 'Action Items', src: '/images/mobile3.png', alt: 'Action Items' },
  ];

  return (
    <div className="max-w-screen-lg mx-auto py-10 px-4">
      <div className="block lg:hidden">
        <div className="flex justify-center mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 rounded-lg ${
                activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Image
          src={tabs[activeTab].src}
          width={300}
          height={400}
          alt={tabs[activeTab].alt}
          className="mx-auto rounded-md"
        />
      </div>

      <div className="hidden lg:block">
        <Image
          src="/images/dashboard.png"
          width={1200}
          height={600}
          alt="Desktop Dashboard"
          className="mx-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default DeviceSection;
