import React from "react";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <h4 className={styles.loadingTitle}>Loading...</h4>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loading;
