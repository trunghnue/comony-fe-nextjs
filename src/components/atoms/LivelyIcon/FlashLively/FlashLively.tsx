import React from "react";
import styles from "./FlashLively.module.scss";

const FlashLively: React.FC = () => {
  return (
    <div className={`${styles.flashLively} ${styles.__animated}`}>
      <div className={`${styles.flashLively_shootingStar} ${styles.flashLively_shootingStar__dashed}`} />
      <div className={`${styles.flashLively_shootingStar} ${styles.flashLively_shootingStar__line} ${styles._dotted}`} />
      <div className={`${styles.flashLively_shootingStar} ${styles.flashLively_shootingStar__line}`} />
      <div className={styles.flashLively_shootingStar} />
      <div className={`${styles.flashLively_shootingStar} ${styles.flashLively_shootingStar__line}`} />
    </div>
  );
};

export default FlashLively;
