import React from "react";
import styles from "./CircleLively.module.scss";

export default function CircleLively() {
  return (
    <div className={styles.circleLively}>
      <svg viewBox="0 0 502 502" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.circleLively_svg}>
        <g>
          <circle cx="251" cy="251" r="249" stroke="white" strokeWidth="4" strokeDasharray="4 5"></circle>
        </g>
      </svg>
    </div>
  );
}
