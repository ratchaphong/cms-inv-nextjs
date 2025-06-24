"use client";

import { useProfileForm } from "./profile.hooks";
import styles from "./profile.module.scss";

export default function ProfileForm() {
  const { profile, handleUpdateProfileRedirect } = useProfileForm();

  if (!profile)
    return <p className={styles.error}>No profile data available.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.welcome}>👋 สวัสดีคุณ {profile.name}</h2>

      <img
        src={profile.avatarUrl || "/images/bstore.png"}
        alt="Avatar"
        className={styles.avatar}
      />

      <h1 className={styles.heading}>ข้อมูลส่วนตัว</h1>

      <div className={styles.infoGroup}>
        <p>
          <strong>ชื่อ - สกุล:</strong> <span>{profile.name}</span>
        </p>
        <p>
          <strong>อีเมล:</strong> <span>{profile.email}</span>
        </p>
        <p>
          <strong>เบอร์โทร:</strong> <span>{profile.phoneNumber || "-"}</span>
        </p>
        <p>
          <strong>ที่อยู่:</strong> <span>{profile.address || "-"}</span>
        </p>
        <p>
          <strong>สิทธิ์:</strong> <span>{profile.role}</span>
        </p>
      </div>

      <button
        className={styles.editButton}
        onClick={handleUpdateProfileRedirect}
      >
        ✏️ แก้ไขข้อมูลส่วนตัว
      </button>
    </div>
  );
}
