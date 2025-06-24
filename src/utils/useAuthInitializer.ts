"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCookie } from "cookies-next";
import { restoreToken } from "@/store/slices/auth/auth.thunks";

export function useAuthInitializer() {
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector((state) => state.auth.loading);
  const userLoading = useAppSelector((state) => state.user.loading);
  const productLoading = useAppSelector((state) => state.products.loading);
  const stockLoading = useAppSelector((state) => state.stocks.loading);

  useEffect(() => {
    const token = getCookie("token");
    if (token && typeof token === "string") {
      dispatch(restoreToken(token));
    }
  }, [dispatch]);

  return {
    visible: authLoading || userLoading || productLoading || stockLoading,
  };
}
