"use client";

import styles from "./navbar.module.scss";
import { BStoreLogo } from "../logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <BStoreLogo size="base" />
      <ul className={styles.navLinks}>
        <li>
          <Link href="/dashboard" className={styles.link}>
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link href="/profile" className={styles.link}>
            ข้อมูลส่วนตัว
          </Link>
        </li>
        {/* <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault(); // ป้องกันไม่ให้ลิงก์ทำงานตาม href
              push("/edit-profile"); // ใช้ router push ไปยังหน้าที่ต้องการ
            }}
            className={styles.link}
          >
            แก้ไขข้อมูล
          </Link>
        </li> */}
        <li>
          <Link href="/products" className={styles.link}>
            สินค้า
          </Link>
        </li>
        <li>
          <Link href="/stocks" className={styles.link}>
            สต็อค
          </Link>
        </li>
        <li>
          <Link href="/stock-report" className={styles.link}>
            รายงาน
          </Link>
        </li>
        <li>
          <Link href="/download-apk" className={styles.link}>
            ดาวน์โหลดแอป
          </Link>
        </li>
        <li>
          <Link href="/homepage" className={styles.link}>
            ออกจากระบบ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
