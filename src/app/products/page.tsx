"use client";

import styles from "./products.module.scss";
import { useProducts } from "./products.hooks";
import { Formik } from "formik";
import FormikInput from "@/components/input";
import { PRODUCT_STATUS } from "@/store/slices/products/products.types";
import { CATEGORY_OPTIONS, PRODUCT_STATUS_OPTIONS } from "./products.utils";
import Navbar from "@/components/navbar";
import Modal from "@/components/modal";

export default function ProductsPage() {
  const {
    products,
    showAddForm,
    formikConfig,
    handleShowAddForm,
    handleCloseAddForm,
    handleEdit,
    handleDelete,
  } = useProducts();

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>📦 รายการสินค้า</h1>
          <button onClick={handleShowAddForm} className={styles.addButton}>
            + เพิ่มสินค้า
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ชื่อสินค้า</th>
              <th>หมวดหมู่</th>
              <th>จำนวนในสต็อก</th>
              <th>สถานะ</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.currentStock}</td>
                <td>
                  {PRODUCT_STATUS_OPTIONS.find((o) => o.value === p.status)
                    ?.text || "-"}
                </td>
                {[PRODUCT_STATUS.AVAILABLE, PRODUCT_STATUS.LOW_STOCK].includes(
                  p.status
                ) ? (
                  <td></td>
                ) : (
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(p.id)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(p.id)}
                    >
                      ลบ
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {showAddForm && (
          <Modal title="เพิ่มสินค้าใหม่" onClose={handleCloseAddForm}>
            <Formik {...formikConfig}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                  <FormikInput
                    name="name"
                    placeholder="ชื่อสินค้า"
                    className="input-primary"
                  />
                  {/* <FormikInput
                    name="category"
                    placeholder="หมวดหมู่"
                    className="input-primary"
                  /> */}
                  <select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled hidden>
                      -- กรุณาประเภทหมวดหมู่ --
                    </option>
                    {CATEGORY_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.text}
                      </option>
                    ))}
                  </select>
                  <FormikInput
                    name="initialStock"
                    placeholder="จำนวนในสต็อกเริ่มต้น"
                    type="number"
                    className="input-primary"
                  />
                  <div className={styles.formActions}>
                    <button type="submit">บันทึก</button>
                    <button
                      type="button"
                      onClick={handleCloseAddForm}
                      className={styles.cancelBtn}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </Modal>
        )}
      </main>
    </>
  );
}
