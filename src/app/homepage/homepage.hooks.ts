"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth/auth.slice";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function useHomepage() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const token = useAppSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie("token");
    deleteCookie("loginTime");
    push("/login"); // ✅ ใช้ locale-aware redirect
  };

  const handleLoginRedirect = () => {
    push("/login");
  };

  return {
    isLoggedIn,
    handleLogout,
    handleLoginRedirect,
  };
}
