"use client";

import Navbar from "@/components/navbar";
import { useDashboardData } from "./dashboard.hooks";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const { dashboardStats } = useDashboardData();

  if (!dashboardStats) return <p className={styles.error}>ไม่พบข้อมูล</p>;
  const now = new Date();
  const formattedDate = now.toLocaleString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  });

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>{formattedDate}</h1>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <p className={styles.label}>จำนวนสินค้าทั้งหมด</p>
            <p className={styles.value}>{dashboardStats.totalProducts}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.label}>สินค้าที่รับเข้า (วันนี้)</p>
            <p className={styles.value}>{dashboardStats.stockInToday}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.label}>สินค้าที่จ่ายออก (วันนี้)</p>
            <p className={styles.value}>{dashboardStats.stockOutToday}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.label}>จำนวนผู้ใช้งาน</p>
            <p className={styles.value}>{dashboardStats.totalUsers}</p>
          </div>
        </div>

        <section className={styles.productSection}>
          <h2 className={styles.subHeading}>สินค้าที่มีในคลัง</h2>
          {dashboardStats.availableProducts.length === 0 ? (
            <p className={styles.empty}>ไม่มีสินค้าในคลัง</p>
          ) : (
            <div className={styles.productGrid}>
              {dashboardStats.availableProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productCategory}>
                    {product.category || "ไม่ระบุหมวดหมู่"}
                  </p>
                  <p className={styles.productStock}>
                    คงเหลือ: {product.currentStock}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
