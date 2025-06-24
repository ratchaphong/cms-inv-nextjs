"use client";

import Navbar from "@/components/navbar";
import styles from "./stock-report.module.scss";
import { useStockReport } from "./stock-report.hooks";
import { StockArchivedReport } from "@/store/slices/stocks/stocks.types";

export default function StockReportPage() {
  const { data } = useStockReport();

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.heading}>
          📦 รายงานสรุปการเคลียร์ข้อมูลสต็อก (รายสัปดาห์)
        </h1>
        <p className={styles.subtext}>
          แสดงรายการสต็อกที่ถูกเก็บเข้า report
          และลบออกจากระบบทุกสัปดาห์โดยอัตโนมัติ
        </p>
        <TableData data={data} />
      </main>
    </>
  );
}

const TableData = ({ data }: { data: StockArchivedReport[] }) => {
  if (!data || data.length === 0)
    return <p className={styles.noData}>ไม่มีข้อมูลรายงาน</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>สินค้า</th>
          <th>ประเภท</th>
          <th>จำนวน</th>
          <th>หมายเหตุ</th>
          <th>วันที่สร้าง</th>
          <th>วันที่ลบ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.stockId}>
            <td>{item.productName}</td>
            <td>{item.type === "IN" ? "นำเข้า" : "จ่ายออก"}</td>
            <td>{item.quantity}</td>
            <td>{item.note || "-"}</td>
            <td>{new Date(item.createdAt).toLocaleString("th-TH")}</td>
            <td>{new Date(item.archivedAt).toLocaleString("th-TH")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
