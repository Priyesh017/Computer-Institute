"use client";
import { useAuthStore } from "@/store";
import axios from "axios";
import { useCallback, useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
  const { login } = useAuthStore();

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
  }, [apiUrl]);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return <>{children}</>;
}
