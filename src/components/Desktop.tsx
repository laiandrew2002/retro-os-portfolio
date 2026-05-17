import React from 'react';
import { useDesktopStore, AppId } from '@/store/useDesktopStore';
import { Taskbar } from './Taskbar';
import { cn } from './Window';
import { FileCode, FileText, Monitor, AppWindow, FileText as FileTextIcon, MonitorPlay, Terminal as TerminalIcon, Globe, Trash2, Paintbrush, Music } from 'lucide-react';

// Specific Apps to put into Window
import { MyComputer } from '@/components/apps/MyComputer';
import { Projects } from '@/components/apps/Projects';
import { Skills } from '@/components/apps/Skills';
import { Terminal } from '@/components/apps/Terminal';
import { InternetExplorer } from '@/components/apps/InternetExplorer';
import { RecycleBin } from '@/components/apps/RecycleBin';
import { Experience } from '@/components/apps/Experience';
import { Paint } from '@/components/apps/Paint';
import { MediaPlayer } from '@/components/apps/MediaPlayer';

const DESKTOP_ICONS = [
  { id: 'my-computer', label: 'My Computer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', defaults: { title: 'My Computer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', defaultWidth: 700, defaultHeight: 500 } },
  { id: 'projects', label: 'Projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', defaults: { title: 'Projects', icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', defaultWidth: 800, defaultHeight: 600 } },
  { id: 'skills', label: 'Skills.exe', icon: 'https://win98icons.alexmeub.com/icons/png/gears-0.png', defaults: { title: 'Skills.exe', icon: 'https://win98icons.alexmeub.com/icons/png/gears-0.png', defaultWidth: 450, defaultHeight: 400 } },
  { id: 'experience', label: 'Experience.doc', icon: 'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png', defaults: { title: 'Experience.doc', icon: 'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png', defaultWidth: 600, defaultHeight: 700 } },
  { id: 'terminal', label: 'Command Prompt', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', defaults: { title: 'Command Prompt', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', defaultWidth: 600, defaultHeight: 400 } },
  { id: 'ie', label: 'Internet Explorer', icon: 'https://win98icons.alexmeub.com/icons/png/msie1-4.png', defaults: { title: 'Internet Explorer', icon: 'https://win98icons.alexmeub.com/icons/png/msie1-4.png', defaultWidth: 800, defaultHeight: 600 } },
  { id: 'paint', label: 'Paint', icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-4.png', defaults: { title: 'ms-paint', icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-4.png', defaultWidth: 600, defaultHeight: 500 } },
  { id: 'winamp', label: 'Media Player', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png', defaults: { title: 'Winamp', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png', defaultWidth: 350, defaultHeight: 200 } },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png', defaults: { title: 'Recycle Bin', icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png', defaultWidth: 500, defaultHeight: 400 } },
];


export const Desktop = () => {
  const { openWindow, activeWindowId, windows } = useDesktopStore();
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);
  const [lastClick, setLastClick] = React.useState<{id: string, time: number} | null>(null);

  const handleIconDoubleClick = (id: AppId, defaults: any) => {
    openWindow(id, defaults);
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden text-white" 
      onClick={handleDesktopClick}
      onContextMenu={(e) => {
        // A right click menu could go here, but prevent default for now to keep it clean
        // e.preventDefault(); 
      }}
    >
      <div className="flex flex-col flex-wrap h-[calc(100vh-40px)] p-2 gap-4 content-start">
        {DESKTOP_ICONS.map((icon) => (
          <div
            key={icon.id}
            className={cn(
              "flex flex-col items-center justify-center p-1 cursor-default text-center w-20 hover:bg-white/10 group",
              selectedIcon === icon.id ? "bg-[var(--color-win-blue-light)]/40" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleIconDoubleClick(icon.id as AppId, icon.defaults);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              const now = Date.now();
              if (lastClick && lastClick.id === icon.id && now - lastClick.time < 500) {
                handleIconDoubleClick(icon.id as AppId, icon.defaults);
                setLastClick(null);
              } else {
                setSelectedIcon(icon.id);
                setLastClick({ id: icon.id, time: now });
              }
            }}
          >
            {typeof icon.icon === 'string' ? (
              <img src={icon.icon} className="mb-1 w-9 h-9 drop-shadow-md" style={{ imageRendering: 'pixelated' }} alt={icon.label} draggable={false} />
            ) : (
              <icon.icon size={36} className="mb-1 drop-shadow-md text-[var(--color-win-surface)] fill-[var(--color-win-blue)] shadow-black" />
            )}
            <span 
              className={cn(
                "text-xs drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] px-1 leading-tight",
                selectedIcon === icon.id ? "bg-[var(--color-win-blue)]" : ""
              )}
            >
              {icon.label}
            </span>
          </div>
        ))}
      </div>

      {/* Render Open Windows */}
      <MyComputer />
      <Projects />
      <Skills />
      <Experience />
      <Terminal />
      <InternetExplorer />
      <Paint />
      <MediaPlayer />
      <RecycleBin />

      <Taskbar />
    </div>
  );
};
