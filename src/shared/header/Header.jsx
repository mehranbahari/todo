import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <ul className={styles.navList}>
          <Link to="">
            <li className={styles.navItem}>All List</li>
          </Link>
          <Link to="">
            <li className={styles.navItem}>Logs</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
