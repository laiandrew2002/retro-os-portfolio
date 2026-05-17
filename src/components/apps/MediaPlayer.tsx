import React, { useState } from 'react';
import { Window } from '@/components/Window';
import { Play, Square, Pause, SkipForward, SkipBack } from 'lucide-react';

export const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track] = useState("Lofi Hip Hop Radio - Beats to relax/study to");

  return (
    <Window id="winamp" defaultWidth={350} defaultHeight={200}>
      <div className="flex flex-col h-full bg-slate-800 text-green-400 font-mono text-sm border-2 border-slate-900 border-t-slate-700 border-l-slate-700">
        
        <div className="p-2 border-b-2 border-b-slate-900 shadow-[0_2px_0_0_#334155] mb-1">
          <div className="text-xs text-slate-400 mb-1">WINAMP</div>
          <div className="bg-black text-green-500 p-2 win-border-inset flex flex-col justify-center max-h-16 h-16 relative overflow-hidden">
             <div className="whitespace-nowrap overflow-hidden text-ellipsis mb-1">
               {isPlaying ? `▶ ${track}` : `⏹ ${track}`}
             </div>
             
             {/* Fake visualizer */}
             <div className="flex items-end gap-[1px] h-4 mt-auto">
                {Array.from({length: 20}).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-gradient-to-t from-green-600 via-yellow-500 to-red-500 transition-all duration-200" 
                    style={{
                      height: isPlaying ? `${Math.random() * 100}%` : '10%'
                    }}
                  />
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 p-2 flex flex-col justify-between">
          <div className="w-full bg-slate-900 h-2 rounded-full mb-4 win-border-inset relative">
            <div className="absolute left-0 top-0 h-full bg-slate-500 w-[30%]"></div>
          </div>

          <div className="flex justify-center gap-2 mb-2">
            <button className="win-btn flex items-center justify-center p-1 px-3 bg-slate-700" onClick={() => setIsPlaying(false)}>
              <SkipBack fill="white" stroke="white" size={12}/>
            </button>
            <button className="win-btn flex items-center justify-center p-1 px-3 bg-slate-700" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause fill="white" stroke="white" size={16}/> : <Play fill="white" stroke="white" size={16}/>}
            </button>
            <button className="win-btn flex items-center justify-center p-1 px-3 bg-slate-700" onClick={() => setIsPlaying(false)}>
              <Square fill="white" stroke="white" size={14}/>
            </button>
            <button className="win-btn flex items-center justify-center p-1 px-3 bg-slate-700" onClick={() => setIsPlaying(false)}>
              <SkipForward fill="white" stroke="white" size={12}/>
            </button>
          </div>
        </div>
        
      </div>
    </Window>
  );
};
