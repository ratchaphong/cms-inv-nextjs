"use client";

import { Formik } from "formik";
import { useStocks } from "./stocks.hooks";
import styles from "./stocks.module.scss";
import FormikInput from "@/components/input";
import { STOCK_ACTION } from "@/store/slices/stocks/stocks.types";
import { PRODUCT_STATUS } from "@/store/slices/products/products.types";
import Navbar from "@/components/navbar";
import Modal from "@/components/modal";

export default function StocksPage() {
  const {
    stockItems,
    products,
    loading,
    showAddForm,
    formikConfig,
    handleShowAddForm,
    handleCloseForm,
  } = useStocks();

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.heading}>📦 จัดการสต็อกสินค้า</h1>
        <button className={styles.addButton} onClick={handleShowAddForm}>
          + เพิ่มการเคลื่อนไหวสต็อก
        </button>
        {showAddForm && (
          <Modal title="เพิ่มการเคลื่อนไหวสินค้า" onClose={handleCloseForm}>
            <Formik {...formikConfig}>
              {(formik) => {
                const selectedProduct = products.find(
                  (p) => String(p.id) === String(formik.values.productId)
                );

                const actionOptions =
                  selectedProduct?.status === PRODUCT_STATUS.OUT_OF_STOCK
                    ? [STOCK_ACTION.IN]
                    : Object.values(STOCK_ACTION);

                const maxQuantity =
                  formik.values.action === STOCK_ACTION.OUT
                    ? selectedProduct?.currentStock || 0
                    : undefined;

                return (
                  <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <select
                      name="productId"
                      value={formik.values.productId}
                      onChange={formik.handleChange}
                    >
                      <option value="" disabled hidden>
                        -- กรุณาเลือกสินค้า --
                      </option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="action"
                      value={formik.values.action}
                      onChange={formik.handleChange}
                    >
                      <option value="" disabled hidden>
                        -- กรุณาเลือกประเภทการเคลื่อนไหว --
                      </option>
                      {actionOptions.map((p) => (
                        <option key={p} value={p}>
                          {p === STOCK_ACTION.IN ? "นำเข้า" : "จ่ายออก"}
                        </option>
                      ))}
                    </select>
                    <FormikInput
                      name="quantity"
                      placeholder="จำนวน"
                      type="number"
                      max={maxQuantity}
                      min={1}
                      className="input-primary"
                    />
                    <FormikInput
                      name="note"
                      placeholder="หมายเหตุ (ถ้ามี)"
                      className="input-primary"
                    />
                    <div className={styles.formActions}>
                      <button type="submit">บันทึก</button>
                      <button
                        type="button"
                        onClick={handleCloseForm}
                        className={styles.cancelBtn}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </Modal>
        )}
        {loading ? (
          <p className={styles.loading}>กำลังโหลดข้อมูล...</p>
        ) : stockItems.length === 0 ? (
          <p className={styles.noData}>ไม่มีข้อมูลสต็อก</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>สินค้า</th>
                <th>จำนวน</th>
                <th>ประเภท</th>
                <th>อัปเดตล่าสุด</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.type === STOCK_ACTION.IN ? "นำเข้า" : "จ่ายออก"}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleString("th-TH")}</td>
                  <td>{item.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
