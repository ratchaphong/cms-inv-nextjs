"use client";

import { BStoreLogo } from "@/components/logo";
import styles from "./apk.module.scss";
import { useDownloadAPKForm } from "./apk.hooks";
import Navbar from "@/components/navbar";

export default function DownloadAPKPage() {
  const { loading, qrBase64 } = useDownloadAPKForm();

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <BStoreLogo size="base" />
          <h1 className={styles.heading}>
            เริ่มต้นประสบการณ์ใหม่กับ BStore — ดาวน์โหลดแอปเลย!
          </h1>
          {loading ? (
            <p className={styles.loadingText}>กำลังโหลด QR Code...</p>
          ) : qrBase64 ? (
            <img
              className={styles.qrImage}
              src={qrBase64}
              alt="QR Code สำหรับดาวน์โหลดแอป"
            />
          ) : (
            <p className={styles.errorText}>ไม่สามารถโหลด QR Code ได้</p>
          )}
        </div>
      </div>
    </main>
  );
}
