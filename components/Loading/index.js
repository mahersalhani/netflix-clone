import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.holder}>
      <p className={styles.loader}></p>
    </div>
  );
};

export default Loading;
