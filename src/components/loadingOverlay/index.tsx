"use client";

import styles from "./loadingOverlay.module.scss";

type LoadingOverlayProps = {
  visible: boolean;
};

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}
