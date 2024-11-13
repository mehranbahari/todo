import styles from "./Spiner.module.css";
const Spiner = () => {
  return (
    <div className={styles.wrapperSpiner}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>{" "}
    </div>
  );
};

export default Spiner;
