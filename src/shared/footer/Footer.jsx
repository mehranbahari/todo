import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <h3 className={styles.title}>طراحی شده برای ایران فاوا گستر</h3>
        <p className={styles.copy}>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
