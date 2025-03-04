"use client";
import { useAuthStore } from "@/store";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "@/components/Loader";

export default function App({ children }: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
  const { login, loadingTime, setloadingTime } = useAuthStore();
  const queryClient = new QueryClient();

  const checkLoginState = useCallback(async () => {
    setloadingTime(true);
    try {
      const {
        data: { user },
      } = await axios.get(`${apiUrl}/loginCheckRoute`, {
        withCredentials: true,
      });

      if (user) login(user);
    } catch (err) {
      console.log(err);
    }
    setloadingTime(false);
  }, [apiUrl, login]);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <QueryClientProvider client={queryClient}>
      {loadingTime && <Loader />}
      {children}
    </QueryClientProvider>
  );
}
