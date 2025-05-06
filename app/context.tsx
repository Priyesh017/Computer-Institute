"use client";
import { useAuthStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { ApiEnd } from "@/helper";
import Datafetch from "./datafetch";

export const queryClient = new QueryClient();

ApiEnd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/noauth";
    }
    return Promise.reject(error);
  }
);

export default function App({ children }: { children: React.ReactNode }) {
  const { loadingTime } = useAuthStore();

  useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      {loadingTime && <Loader />}
      <Datafetch> {children}</Datafetch>
    </QueryClientProvider>
  );
}
