"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/store";

export function useAuth() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

  const router = useRouter();

  const { login, user, loading, setLoading } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    async function checkLogin() {
      try {
        const {
          data: { user },
        } = await axios.get(`${apiUrl}/loginCheckRoute`, {
          withCredentials: true,
        });

        if (user) {
          login(user);
        }
      } catch (err) {
        console.error("Login check failed:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    if (!user) checkLogin();
  }, [router]);

  useEffect(() => {
    const allowedRoutes = [
      "/",
      "/chooseuser",
      "/signup",
      "/login",
      "/studentlogin",
    ];

    if (!loading && !user && !allowedRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [router, loading, user, pathname]);

  return { user, loading };
}
