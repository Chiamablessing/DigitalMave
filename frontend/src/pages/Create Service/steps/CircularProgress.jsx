import React from "react";
import styles from "../CreateService.module.css";

const CircularProgress = () => (
  <div className={styles.spinner}>
    <div className={styles.double_bounce1}></div>
    <div className={styles.double_bounce2}></div>
  </div>
);

export default CircularProgress;
