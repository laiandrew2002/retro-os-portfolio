import React, { useState } from 'react';
import { Window } from '@/components/Window';
import { Globe, RefreshCw, X, Home, Search, Link2 } from 'lucide-react';

export const InternetExplorer = () => {
  const [url, setUrl] = useState('https://www.linkedin.com/in/investor-profile');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <Window id="ie" defaultWidth={750} defaultHeight={550}>
      <div className="flex flex-col h-full bg-white text-black">
        {/* Toolbar */}
        <div className="bg-[var(--color-win-surface)] flex flex-col border-b border-gray-400">
          <div className="flex items-center gap-1 p-1 border-b border-gray-300">
            <button className="p-1 hover:win-btn-active rounded-sm border border-transparent"><Home size={16} /></button>
            <div className="w-px h-4 bg-gray-400 mx-1"></div>
            <button className="p-1 hover:win-btn-active rounded-sm border border-transparent text-gray-500"><X size={16} /></button>
            <button className="p-1 hover:win-btn-active rounded-sm border border-transparent" onClick={() => {setLoading(true); setTimeout(() => setLoading(false), 500);}}><RefreshCw size={16} /></button>
            <div className="w-px h-4 bg-gray-400 mx-1"></div>
            <button className="p-1 hover:win-btn-active rounded-sm border border-transparent flex gap-1 items-center px-2 text-sm"><Search size={14}/> Search</button>
          </div>
          
          <div className="flex items-center gap-2 p-1.5 bg-[var(--color-win-surface)]">
            <span className="text-sm px-1">Address</span>
            <form onSubmit={handleSubmit} className="flex-1 flex pb-[2px]">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-2 px-1 text-sm bg-white"
              />
            </form>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-100 flex flex-col items-center p-8">
          {loading ? (
            <div className="text-xl font-bold mt-20 animate-pulse text-gray-400">Loading...</div>
          ) : (
            <div className="max-w-2xl w-full bg-white border border-gray-300 shadow-md p-8">
              <div className="border-b-4 border-blue-800 pb-4 mb-6">
                <h1 className="text-3xl font-serif text-blue-900 font-bold tracking-tight">Engineer's Personal Homepage</h1>
                <p className="italic text-gray-600 mt-1">"Welcome to my little corner of the Netscape."</p>
              </div>

              <div className="flex gap-4">
                <div className="w-1/3 border-r-2 border-dashed border-gray-300 pr-4">
                  <h3 className="font-bold bg-gray-200 p-1 mb-2">Web Links</h3>
                  <ul className="space-y-3 text-blue-700 underline">
                    <li><a href="#" className="flex items-center gap-1"><Link2 size={14}/> GitHub Repository</a></li>
                    <li><a href="#" className="flex items-center gap-1"><Link2 size={14}/> LinkedIn Profile</a></li>
                    <li><a href="#" className="flex items-center gap-1"><Link2 size={14}/> Twitter Feed</a></li>
                    <li><a href="#" className="flex items-center gap-1"><Link2 size={14}/> Send an Email</a></li>
                  </ul>
                  <div className="mt-8 p-2 bg-yellow-100 border border-yellow-400 text-xs text-center">
                    <p>Designed for Netscape Navigator 4.0</p>
                    <p className="mt-1">Resolution 800x600</p>
                  </div>
                </div>
                
                <div className="w-2/3">
                  <h2 className="text-xl font-bold mb-3">Latest Updates</h2>
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold text-sm text-gray-500">October 12, 1999</span>
                      <h4 className="font-bold">Deployed new Next.js project on Vercel</h4>
                      <p className="text-sm mt-1">Wait, Next.js doesn't exist yet... spacetime anomaly detected.</p>
                    </div>
                    <div>
                      <span className="font-bold text-sm text-gray-500">September 4, 1998</span>
                      <h4 className="font-bold">Learned to center a div using tables</h4>
                      <p className="text-sm mt-1">It was difficult, but nested tables are the future of web design!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};
