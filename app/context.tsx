"use client";
import { useAuthStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import Datafetch from "./datafetch";

export const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
  const { loadingTime } = useAuthStore();

  const { loading } = useAuth();

  if (loadingTime || loading) return <Loader />;

  return (
    <QueryClientProvider client={queryClient}>
      <Datafetch> {children}</Datafetch>
    </QueryClientProvider>
  );
}
