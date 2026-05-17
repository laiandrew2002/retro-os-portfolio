import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'motion/react';
import { useDesktopStore, AppId } from '@/store/useDesktopStore';
import { Minus, Square, X, Maximize } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface WindowProps {
  id: AppId;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  contentClassName?: string;
}

export const Window: React.FC<WindowProps> = ({ 
  id, 
  children, 
  defaultWidth = 600, 
  defaultHeight = 400,
  minWidth = 300,
  minHeight = 200,
  className,
  contentClassName
}) => {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, activeWindowId } = useDesktopStore();
  const windowState = windows[id];
  const isActive = activeWindowId === id;
  const dragControls = useDragControls();

  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isResizing, setIsResizing] = useState(false);
  // Default positioning
  const [initialPos] = useState({ x: 50 + (Object.keys(windows).length * 20) % 100, y: 50 + (Object.keys(windows).length * 20) % 100 });

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const handleMaximizeToggle = () => {
    useDesktopStore.setState({
      windows: {
        ...windows,
        [id]: { ...windowState, isMaximized: !windowState.isMaximized }
      }
    });
  };

  const startResize = (e: React.PointerEvent, dir: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (windowState.isMaximized) return;

    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.width;
    const startH = size.height;

    const onPointerMove = (moveEvent: PointerEvent) => {
      let newW = startW;
      let newH = startH;
      if (dir.includes('e')) newW = startW + (moveEvent.clientX - startX);
      if (dir.includes('s')) newH = startH + (moveEvent.clientY - startY);
      
      setSize({
        width: Math.max(minWidth, newW),
        height: Math.max(minHeight, newH)
      });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  return (
    <motion.div
      drag={!windowState.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, x: initialPos.x, y: initialPos.y }}
      animate={
        windowState.isMaximized 
        ? { opacity: 1, scale: 1, x: 0, y: 0, width: '100%', height: 'calc(100vh - 40px)' }
        : { opacity: 1, scale: 1, width: size.width, height: size.height }
      }
      transition={{ duration: isResizing ? 0 : 0.2 }}
      style={{ zIndex: windowState.zIndex, touchAction: 'none' }}
      onPointerDown={() => focusWindow(id)}
      className={cn(
        "absolute top-0 left-0 flex flex-col bg-[var(--color-win-surface)] win-border overflow-hidden shadow-[2px_2px_10px_rgba(0,0,0,0.5)]",
        windowState.isMaximized ? "bottom-10 right-0 !w-full !h-[calc(100vh-40px)]" : "",
        className
      )}
    >
      {/* Resize handles */}
      {!windowState.isMaximized && (
        <>
          <div className="absolute top-0 bottom-0 right-0 w-1.5 cursor-e-resize z-50" onPointerDown={(e) => startResize(e, 'e')} />
          <div className="absolute left-0 right-0 bottom-0 h-1.5 cursor-s-resize z-50" onPointerDown={(e) => startResize(e, 's')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50" onPointerDown={(e) => startResize(e, 'se')} />
        </>
      )}

      {/* Title Bar */}
      <div 
        className={cn(
          "h-7 flex items-center justify-between px-1 select-none cursor-pointer",
          isActive ? "bg-[var(--color-win-blue)] text-white" : "bg-[var(--color-win-dark)] text-[#c0c0c0]"
        )}
        style={{ touchAction: 'none' }}
        onDoubleClick={handleMaximizeToggle}
        onPointerDown={(e) => {
          dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-1.5 font-bold tracking-wide text-sm overflow-hidden whitespace-nowrap pl-1">
          {typeof windowState.icon === 'string' ? (
            <img src={windowState.icon} className="w-4 h-4" style={{ imageRendering: 'pixelated' }} alt="icon" draggable={false} />
          ) : windowState.icon ? (
            <windowState.icon size={16} />
          ) : null}
          <span>{windowState.title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-0.5 mr-0.5" onPointerDown={e => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="win-btn w-5 h-5 flex items-center justify-center focus:outline-none"
            aria-label="Minimize"
          >
            <Minus size={12} strokeWidth={3} className="mt-1" color="black" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleMaximizeToggle(); }}
            className="win-btn w-5 h-5 flex items-center justify-center focus:outline-none"
            aria-label="Maximize"
          >
            {windowState.isMaximized ? (
              <div className="relative w-3 h-3 border-[1.5px] border-black mt-0.5">
                <div className="absolute -top-1 -right-1 w-3 h-3 border-[1.5px] border-black border-b-0 border-l-0" />
              </div>
            ) : (
              <Square size={11} strokeWidth={2} color="black" />
            )}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="win-btn w-5 h-5 flex items-center justify-center focus:outline-none"
            aria-label="Close"
          >
            <X size={14} strokeWidth={2.5} color="black" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div 
        className="flex text-xs px-2 py-0.5 gap-3 border-b border-[var(--color-win-shadow)] text-black"
        onPointerDown={e => e.stopPropagation()}
      >
        <span className="hover:bg-[var(--color-win-blue)] hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-[var(--color-win-blue)] hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-[var(--color-win-blue)] hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-[var(--color-win-blue)] hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Window Content */}
      <div 
        className={cn("flex-1 bg-white border border-[var(--color-win-dark)] m-1 mt-0 overflow-auto win-scrollbar", contentClassName)}
      >
        {children}
      </div>
    </motion.div>
  );
};
