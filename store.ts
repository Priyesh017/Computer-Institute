// store/sidebarStore.ts
import { create } from "zustand";

interface SidebarState {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedComponent: "Dashboard", // Default component
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));
