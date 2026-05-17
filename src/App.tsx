import React, { useState, useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { useDesktopStore } from './store/useDesktopStore';

export default function App() {
  const { booting, setBooting } = useDesktopStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (booting) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setBooting(false), 500);
            return 100;
          }
          return p + Math.floor(Math.random() * 15) + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [booting, setBooting]);

  if (booting) {
    return (
      <div className="flex bg-black w-full h-screen items-center justify-center flex-col text-white font-mono select-none">
        <div className="max-w-xl w-full px-8">
          <div className="flex items-end gap-4 mb-8">
             <div className="text-4xl font-bold italic tracking-widest text-[var(--color-win-surface)] whitespace-nowrap">
               Microsoft<sup className="text-sm align-top">®</sup>
             </div>
             <div className="text-6xl font-bold tracking-tighter mb-[-4px]">
               Windows <span className="font-normal text-[var(--color-win-surface)]">2000</span>
             </div>
          </div>
          
          <div className="w-full border-2 border-gray-600 p-1 mb-2 bg-[#101010]">
            <div 
              className="h-4 bg-gradient-to-r from-[var(--color-win-blue-light)] to-[var(--color-win-blue)] transition-all duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm mt-8">Starting up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-[var(--color-win-bg)] overflow-hidden">
      <Desktop />
    </div>
  );
}
