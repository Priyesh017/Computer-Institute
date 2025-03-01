"use client";
import { useAuthStore } from "@/store";
import axios from "axios";
import { useCallback, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export default function App({ children }: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
  const { login } = useAuthStore();
  const queryClient = new QueryClient();

  const checkLoginState = useCallback(async () => {
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
  }, [apiUrl, login]);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
