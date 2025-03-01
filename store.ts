// store/sidebarStore.ts
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

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
  isSidebarOpen: boolean;
  setSidebarOpen: (s: true | false) => void;
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
}

const useAuthStore = create<userAuthState>((set) => ({
  selectedComponent: "Dashboard", // Default component
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  isSidebarOpen: true,
  setSidebarOpen(s) {
    set({ isSidebarOpen: s });
  },
  utype: "center",
  setUtype: (s) => set({ utype: s }),
  user: null,
  login: (userData: usertype) => set({ user: userData }),
  logout: () => set({ user: null, selectedComponent: "" }),
}));

export { useAuthStore };
