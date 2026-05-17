import { create } from 'zustand';

export type AppId = 'my-computer' | 'projects' | 'skills' | 'experience' | 'terminal' | 'ie' | 'recycle-bin' | 'paint' | 'winamp';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string | React.ElementType; // Can be a string path or lucide icon
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface DesktopStore {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  booting: boolean;
  openWindow: (id: AppId, defaults?: Partial<WindowState>) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  setBooting: (booting: boolean) => void;
}

let zIndexCounter = 10;

const initialWindows: Record<AppId, WindowState> = {} as any; // initialized dynamically or partly

export const useDesktopStore = create<DesktopStore>((set) => ({
  windows: initialWindows,
  activeWindowId: null,
  booting: true,

  openWindow: (id, defaults) => set((state) => {
    const win = state.windows[id];
    if (win && win.isOpen) {
      // Already open, just focus and restore if minimized
      zIndexCounter++;
      return {
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: { ...win, zIndex: zIndexCounter, isMinimized: false }
        }
      };
    }
    
    // Open new
    zIndexCounter++;
    return {
      activeWindowId: id,
      windows: {
        ...state.windows,
        [id]: {
          id,
          title: id,
          icon: 'box',
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: zIndexCounter,
          ...state.windows[id],
          ...defaults,
        }
      }
    };
  }),

  closeWindow: (id) => set((state) => {
    const nextWindows = { ...state.windows };
    if (nextWindows[id]) {
      nextWindows[id] = { ...nextWindows[id], isOpen: false };
    }
    return {
      windows: nextWindows,
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: true }
    }
  })),

  restoreWindow: (id) => set((state) => {
    zIndexCounter++;
    return {
      activeWindowId: id,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: false, zIndex: zIndexCounter }
      }
    };
  }),

  focusWindow: (id) => set((state) => {
    const win = state.windows[id];
    if (!win || !win.isOpen) return state;
    if (state.activeWindowId === id) return state; // Already focused
    
    zIndexCounter++;
    return {
      activeWindowId: id,
      windows: {
        ...state.windows,
        [id]: { ...win, zIndex: zIndexCounter }
      }
    };
  }),

  setBooting: (booting) => set({ booting })
}));
