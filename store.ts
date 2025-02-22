// store/sidebarStore.ts
import { create } from "zustand";

interface SidebarState {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
}

interface usertype {
  name: string;
  email: string;
  role: "CENTER" | "ADMIN";
  avatar: "";
}

interface userAuthState {
  utype: "admin" | "center";
  setUtype: (s: "admin" | "center") => void;
  user: null | usertype;
  login: (userData: usertype) => void;
  logout: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  selectedComponent: "Dashboard", // Default component
  setSelectedComponent: (component) => set({ selectedComponent: component }),
}));

const useAuthStore = create<userAuthState>((set) => ({
  utype: "center",
  setUtype: (s) => set({ utype: s }),

  user: null,
  login: (userData: usertype) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export { useSidebarStore, useAuthStore };
