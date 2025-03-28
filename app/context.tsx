"use client";
import { useAuthStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";

export const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
  const { loadingTime } = useAuthStore();

  useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      {loadingTime && <Loader />}
      {children}
    </QueryClientProvider>
  );
}
