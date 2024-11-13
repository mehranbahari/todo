import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div>
            <div>
              <div className={styles.four_zero_four_bg}>
                <h1>404</h1>
              </div>

              <div className={styles.contant_box_404}>
                <h3 className={styles.h2}>Look like you&apos;re lost</h3>

                <p>the page you are looking for not avaible!</p>

                <Link to="/" className={styles.link_404}>
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
