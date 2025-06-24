"use client";

import { Formik } from "formik";
import FormikInput from "@/components/input";
import { useLoginForm } from "./login.hooks";
import styles from "./login.module.scss";
import { BStoreLogo } from "@/components/logo";

export default function LoginForm() {
  const { formikConfig, isRegisterMode, setIsRegisterMode } = useLoginForm();

  return (
    <div className={styles.container}>
      <BStoreLogo />
      <Formik {...formikConfig} key={isRegisterMode ? "register" : "login"}>
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            {isRegisterMode ? (
              <>
                <FormikInput
                  name="name"
                  placeholder="ชื่อ-นามสกุล"
                  className="input-primary"
                />
                <FormikInput
                  name="email"
                  placeholder="อีเมล"
                  type="email"
                  className="input-primary"
                />
                <FormikInput
                  name="password"
                  placeholder="รหัสผ่าน"
                  type="password"
                  className="input-primary"
                />
              </>
            ) : (
              <>
                <FormikInput
                  name="username"
                  placeholder="ชื่อผู้ใช้"
                  className="input-primary"
                />
                <FormikInput
                  name="password"
                  type="password"
                  placeholder="รหัสผ่าน"
                  className="input-primary"
                />
              </>
            )}

            <button type="submit" className="btn-primary">
              {isRegisterMode ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
            </button>

            <p className={styles.toggle}>
              {isRegisterMode ? (
                <>
                  มีบัญชีแล้ว?{" "}
                  <span onClick={() => setIsRegisterMode(false)}>
                    เข้าสู่ระบบ
                  </span>
                </>
              ) : (
                <>
                  ยังไม่มีบัญชี?{" "}
                  <span onClick={() => setIsRegisterMode(true)}>ลงทะเบียน</span>
                </>
              )}
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}
