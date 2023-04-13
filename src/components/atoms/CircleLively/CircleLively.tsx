import React from "react";
import styles from "./CircleLively.module.scss";

interface Props {
  className?: string;
  visibleAnimated?: boolean;
  type?: string;
}

export default function CircleLively({ className = "", type = "default", visibleAnimated = false }: Props) {
  return (
    <div className={`${className} ${styles.circleLively} ${visibleAnimated && styles.__animated}`}>
      <svg className={`${styles.circleLively_svg} ${styles[`_type__${type}`]}`} viewBox="0 0 502 502" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="251" cy="251" r="249" stroke="white" strokeWidth="4" strokeDasharray="4 5"></circle>
        </g>
      </svg>
    </div>
  );
}
