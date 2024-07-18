import React from 'react';
import Link from 'next/link';
import './Button.css';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ href, children }) => {
  return (
    <Link href={href}>
    <div className="glow-on-hover shiny border-slate-50	  mt-8 flex items-center justify-center">
      <span className="text-center">{children}</span>
    </div>
  </Link>
  );
};

export default CustomButton;