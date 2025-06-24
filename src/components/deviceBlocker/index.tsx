// src/components/device-blocker/index.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./deviceBlocker.module.scss";

export default function DeviceBlocker() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isSmallScreen) return null;

  return (
    <div className={styles.overlay}>
      <p>
        เว็บไซต์นี้รองรับเฉพาะหน้าจอ Desktop เท่านั้น
        <br />
        กรุณาใช้งานผ่านหน้าจอที่ใหญ่กว่า
      </p>
    </div>
  );
}
