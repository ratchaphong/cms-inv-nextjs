"use client";

import { Formik } from "formik";
import FormikInput from "@/components/input";
import { useEditProfileForm } from "./edit-profile.hooks";
import styles from "./edit-profile.module.scss";
import classNames from "classnames";
import { useRef } from "react";

export default function EditProfileForm() {
  const { formikConfig, profile } = useEditProfileForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!formikConfig.initialValues || !profile)
    return <p className={styles.error}>ไม่พบข้อมูลผู้ใช้</p>;

  return (
    <div className={styles.container}>
      <Formik {...formikConfig}>
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className={classNames(styles.form, styles.formContainer)}
          >
            <h1 className={styles.heading}>แก้ไขข้อมูลส่วนตัว</h1>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    formik.setFieldValue("avatarUrl", reader.result); // base64
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <img
              src={formik.values.avatarUrl || "/images/bstore.png"}
              alt="Avatar"
              className={styles.avatar}
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer" }}
            />
            <p className={styles.subtext}>คลิกที่รูปเพื่อเปลี่ยนภาพโปรไฟล์</p>
            <FormikInput
              name="name"
              placeholder="ชื่อ - นามสกุล"
              className="input-primary"
            />
            <FormikInput
              name="email"
              placeholder="อีเมล"
              className="input-primary"
            />
            <FormikInput
              name="phoneNumber"
              placeholder="เบอร์โทรศัพท์"
              className="input-primary"
            />
            <FormikInput
              name="address"
              placeholder="ที่อยู่"
              className="input-primary"
            />
            <button type="submit" className="btn-primary">
              บันทึก
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
