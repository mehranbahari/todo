import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link to="">About Project</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
