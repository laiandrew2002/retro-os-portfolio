import React, { useState } from 'react';
import { Window } from '@/components/Window';
import { FileWarning, FileQuestion, Trash2 } from 'lucide-react';

export const RecycleBin = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'startup_idea_v1.txt', icon: FileQuestion },
    { id: 2, name: 'TODO_clean_code.md', icon: FileWarning },
    { id: 3, name: 'New Folder (2)', icon: FileQuestion },
    { id: 4, name: 'Untitled.png', icon: FileWarning },
  ]);

  return (
    <Window id="recycle-bin" defaultWidth={500} defaultHeight={400}>
       <div className="flex flex-col h-full bg-white text-black text-sm">
        <div className="bg-[var(--color-win-surface)] flex gap-2 p-1 border-b border-gray-400 items-center justify-between">
          <div className="flex-1 bg-white border border-gray-400 px-2 h-6 flex items-center shadow-inner text-gray-600 font-mono text-xs">
            C:\Recycled
          </div>
          <button 
            className="win-btn px-2 h-6 flex items-center gap-1 text-xs"
            onClick={() => setItems([])}
            disabled={items.length === 0}
          >
            <Trash2 size={12} /> Empty Bin
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 flex flex-wrap gap-6 content-start">
          {items.length === 0 ? (
            <div className="text-gray-400 w-full text-center mt-10 italic">The Recycle Bin is empty.</div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex flex-col items-center w-20 gap-1 cursor-pointer group">
                <item.icon size={36} className="text-gray-400 group-hover:text-gray-600" />
                <span className="text-center text-xs group-hover:bg-[var(--color-win-blue)] group-hover:text-white px-1 leading-tight">{item.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Window>
  );
};
