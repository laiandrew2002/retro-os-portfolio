import React, { useState, useEffect } from 'react';
import { useDesktopStore, AppId } from '@/store/useDesktopStore';
import { cn } from '@/components/Window';
import { MonitorPlay, ChevronRight, X } from 'lucide-react';

export const Taskbar: React.FC = () => {
  const { windows, activeWindowId, openWindow, restoreWindow, focusWindow } = useDesktopStore();
  const [time, setTime] = useState<string>('');
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openApps = Object.values(windows).filter(w => w.isOpen);

  const handleStartMenuClick = () => {
    setStartOpen(!startOpen);
  };

  const closeStartMenu = () => {
    if (startOpen) setStartOpen(false);
  };

  const handleAppClick = (id: AppId) => {
    const win = windows[id];
    if (win.isMinimized) {
      restoreWindow(id);
    } else if (activeWindowId === id) {
      useDesktopStore.getState().minimizeWindow(id);
    } else {
      focusWindow(id);
    }
    closeStartMenu();
  };

  return (
    <>
      {/* Start Menu Overlay */}
      {startOpen && (
        <div className="fixed inset-0 z-[9998]" onClick={closeStartMenu} />
      )}

      {/* Start Menu */}
      {startOpen && (
        <div className="absolute bottom-10 left-0 bg-[var(--color-win-surface)] win-border z-[9999] w-64 flex flex-row">
          <div className="w-8 bg-gradient-to-b from-[var(--color-win-blue)] to-[var(--color-win-blue-light)] flex items-end pb-2">
            <span className="text-white font-bold tracking-widest -rotate-90 transform origin-bottom-left w-[200px] absolute ml-2 mb-8 text-xl">
              Windows<span className="font-normal text-[var(--color-win-surface)] ml-1">2000</span>
            </span>
          </div>
          <div className="flex-1 py-1 flex flex-col pt-1">
            <StartMenuItem 
              label="My Computer" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
              onClick={() => { openWindow('my-computer', { title: 'My Computer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png' }); closeStartMenu(); }} 
            />
            <StartMenuItem 
              label="Projects" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
              onClick={() => { openWindow('projects', { title: 'Projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png' }); closeStartMenu(); }} 
            />
            <StartMenuItem 
              label="Skills" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/gears-0.png"
              onClick={() => { openWindow('skills', { title: 'Skills.exe', icon: 'https://win98icons.alexmeub.com/icons/png/gears-0.png' }); closeStartMenu(); }} 
            />
            <div className="mx-2 my-1 border-t border-[var(--color-win-shadow)] border-b border-white h-[2px]"></div>
             <StartMenuItem 
              label="Terminal" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
              onClick={() => { openWindow('terminal', { title: 'Command Prompt', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png' }); closeStartMenu(); }} 
            />
             <StartMenuItem 
              label="Internet Explorer" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/msie1-4.png"
              onClick={() => { openWindow('ie', { title: 'Internet Explorer', icon: 'https://win98icons.alexmeub.com/icons/png/msie1-4.png' }); closeStartMenu(); }} 
            />
            <StartMenuItem 
              label="Paint" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/paint_file-4.png"
              onClick={() => { openWindow('paint', { title: 'ms-paint', icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-4.png' }); closeStartMenu(); }} 
            />
            <StartMenuItem 
              label="Media Player" 
              iconUrl="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png"
              onClick={() => { openWindow('winamp', { title: 'Winamp', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png' }); closeStartMenu(); }} 
            />
            <div className="mx-2 my-1 border-t border-[var(--color-win-shadow)] border-b border-white h-[2px]"></div>
            <StartMenuItem 
              label="Shut Down..." 
              iconUrl="https://win98icons.alexmeub.com/icons/png/shut_down_cool-0.png"
              onClick={() => { alert('It is now safe to turn off your computer.'); closeStartMenu(); }} 
            />
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-win-surface)] win-border-inset z-[9999] flex flex-row items-center justify-between px-1">
        
        {/* Start Button */}
        <button 
          onClick={handleStartMenuClick}
          className={cn(
            "h-8 px-2 flex items-center gap-1 font-bold text-sm",
            startOpen ? "win-btn-active font-bold" : "win-btn shadow-none"
          )}
        >
          <div className="flex space-x-1 items-center">
            <img src="https://win98icons.alexmeub.com/icons/png/windows-4.png" className="w-5 h-5 mr-0.5" style={{ imageRendering: 'pixelated' }} alt="Windows logo" draggable={false} />
            <span className="italic font-bold tracking-wider">Start</span>
          </div>
        </button>

        {/* Separator */}
        <div className="h-7 w-1 border-l border-[var(--color-win-shadow)] border-r border-white mx-1 my-1"></div>

        {/* Open Applications */}
        <div className="flex-1 flex gap-1 px-1 h-full items-center overflow-x-auto win-scrollbar">
          {openApps.map(app => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className={cn(
                "h-8 px-2 flex items-center min-w-[120px] max-w-[160px] truncate text-sm flex-shrink-0 font-bold gap-1.5",
                activeWindowId === app.id && !app.isMinimized ? "win-btn-active bg-gray-200" : "win-btn shadow-none"
              )}
            >
              {typeof app.icon === 'string' ? (
                <img src={app.icon} className="w-4 h-4 shrink-0" style={{ imageRendering: 'pixelated' }} alt="" draggable={false} />
              ) : app.icon ? (
                <app.icon size={16} className="shrink-0" />
              ) : null}
              <span className="truncate">{app.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="h-8 win-border-inset flex items-center px-3 ml-1 bg-gray-300">
          <span className="text-xs">{time}</span>
        </div>
      </div>
    </>
  );
};

const StartMenuItem = ({ label, onClick, hasChildren = false, iconUrl }: { label: string, onClick: () => void, hasChildren?: boolean, iconUrl?: string }) => (
  <button 
    onClick={onClick} 
    className="flex items-center justify-between px-4 py-2 hover:bg-[var(--color-win-blue)] hover:text-white text-left text-sm"
  >
    <div className="flex items-center gap-2">
      {iconUrl && <img src={iconUrl} className="w-6 h-6" style={{ imageRendering: 'pixelated' }} alt="" draggable={false} />}
      <span>{label}</span>
    </div>
    {hasChildren && <ChevronRight size={14} />}
  </button>
);
