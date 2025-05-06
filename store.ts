// store/sidebarStore.ts
import { create } from "zustand";

interface usertype {
  name: string;
  email: string;
  role: "CENTER" | "ADMIN";
  avatar: "";
}

export interface Course {
  id: number;
  CName: string;
  Duration: number;
  price: number;
}

export interface CourseFramework {
  value: string;
  label: string;
  courseId: string;
}

interface userAuthState {
  utype: "admin" | "center";
  setUtype: (s: "admin" | "center") => void;
  user: null | usertype;
  login: (userData: usertype) => void;
  logout: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (s: true | false) => void;
  loadingTime: boolean;
  setloadingTime: (val: boolean) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  frameworksCourse: CourseFramework[];
  setframeworksCourse: (frameworks: CourseFramework[]) => void;
}

export const useAuthStore = create<userAuthState>((set) => ({
  isSidebarOpen: true,
  setSidebarOpen(s) {
    set({ isSidebarOpen: s });
  },
  utype: "center",
  setUtype: (s) => set({ utype: s }),
  user: null,
  login: (userData: usertype) => set({ user: userData }),
  logout: () => set({ user: null, loading: false }),
  loadingTime: false,
  setloadingTime(val) {
    set({ loadingTime: val });
  },
  loading: true,
  setLoading(val) {
    set({ loading: val });
  },
  frameworksCourse: [],
  setframeworksCourse: (frameworksCourse) => set({ frameworksCourse }),
}));
