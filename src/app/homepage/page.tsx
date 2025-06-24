"use client";

import { BStoreLogo } from "@/components/logo";
import { useHomepage } from "./homepage.hooks";
import styles from "./homepage.module.scss";

export default function HomePage() {
  const { handleLogout, isLoggedIn, handleLoginRedirect } = useHomepage();

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <BStoreLogo />
        <p>มุ่งมั่นที่จะส่งมอบบริการที่ดีที่สุดให้แก่ลูกค้าของเรา</p>
        <p>
          ด้วยความรับผิดชอบ และใส่ใจในการให้บริการ
          โดยคำนึงถึงการรับส่งพัสดุที่รวดเร็ว และปลอดภัย
          ควบคู่ไปกับการสร้างประโยชน์ และคุณค่าร่วมระหว่างบริษัทฯ คู่ค้า
          และสังคม ให้ทุกฝ่ายสามารถเติบโตร่วมกันได้อย่างยั่งยืน
        </p>

        {isLoggedIn ? (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            ออกจากระบบ
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={handleLoginRedirect}>
            เข้าสู่ระบบ
          </button>
        )}
      </div>
    </main>
  );
}
