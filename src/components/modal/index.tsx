// components/modal/Modal.tsx
import styles from "./modal.module.scss";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {title && <h2>{title}</h2>}
        {children}
        {/* <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelBtn}>
            ✖ ปิด
          </button>
        </div> */}
      </div>
    </div>
  );
}
