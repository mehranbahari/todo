import { RiCloseLargeFill } from "react-icons/ri";
import styles from "./Modal.module.css";

const Modal = ({ status, setStatus, children }) => {
  return (
    <div className={styles.modalWrapper}>
      <div
        onClick={() => setStatus(false)}
        className={`${styles.backdrop} ${status ? styles.active : ""}`}
      ></div>
      <div className={`${styles.modal} ${status ? styles.active : ""}`}>
        <div className={styles.close} onClick={() => setStatus(false)}>
          <RiCloseLargeFill size={24} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
