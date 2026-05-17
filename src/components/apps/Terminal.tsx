import React, { useState, useRef, useEffect } from 'react';
import { Window } from '@/components/Window';

export const Terminal = () => {
  const [history, setHistory] = useState<string[]>(['Microsoft Windows 2000 [Version 5.00.2195]', '(C) Copyright 1985-2000 Microsoft Corp.', '']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `C:\\> ${input}`];
      
      switch (cmd) {
        case 'help':
          newHistory.push('Available commands:');
          newHistory.push('  help     - Show this help message');
          newHistory.push('  whoami   - Display current user information');
          newHistory.push('  skills   - List technical skills');
          newHistory.push('  clear    - Clear the screen');
          newHistory.push('  contact  - Display contact information');
          newHistory.push('  ping     - Pong');
          break;
        case 'whoami':
          newHistory.push('admin\\full_stack_engineer');
          break;
        case 'skills':
          newHistory.push('Loading skills modules...');
          newHistory.push('OK: React, Node.js, TypeScript, PostgreSQL, Web3');
          break;
        case 'contact':
          newHistory.push('Email: hello@example.com');
          newHistory.push('GitHub: github.com/engineer');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'ping':
          newHistory.push('Pinging localhost [127.0.0.1] with 32 bytes of data:');
          newHistory.push('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128');
          break;
        default:
          if (cmd !== '') {
            newHistory.push(`'${cmd}' is not recognized as an internal or external command,`);
            newHistory.push('operable program or batch file.');
          }
      }
      
      newHistory.push('');
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <Window id="terminal" defaultWidth={550} defaultHeight={350} className="bg-black" contentClassName="bg-black border-none">
      <div 
        className="w-full h-full bg-black text-gray-300 font-mono text-sm p-2 overflow-y-auto cursor-text win-scrollbar"
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex">
          <span className="mr-2">C:\&gt;</span>
          <input 
            id="terminal-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none text-gray-300"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Window>
  );
};
