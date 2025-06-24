"use client";

import LoadingOverlay from "@/components/loadingOverlay";
import { useAuthInitializer } from "@/utils/useAuthInitializer";
import React from "react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { visible } = useAuthInitializer(); // ✅ Hook ที่ใช้ dispatch()
  return (
    <React.Fragment>
      <LoadingOverlay visible={visible} />
      {children}
    </React.Fragment>
  );
}
