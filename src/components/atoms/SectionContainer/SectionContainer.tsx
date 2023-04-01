import React, { useMemo } from "react";
import styles from "./SectionContainer.module.scss";

interface SectionContainerProps {
  columns?: string;
  containerSize?: string;
  position?: string;
  bgColor?: string;
  borderTopColor?: string;
  wrapSize?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  columns = "1",
  containerSize = "lg",
  position = "center",
  bgColor = "white",
  borderTopColor = "none",
  wrapSize = "normal",
  fullWidth = false,
  children,
  className = "",
}: SectionContainerProps) {
  const classes = useMemo(() => {
    return [
      styles[`_bgColor__${bgColor}`],
      styles[`_borderTopColor__${borderTopColor}`],
      styles[`_position__${position}`],
      styles[`_wrapSize__${wrapSize}`],
      fullWidth ? styles["__fullWidth"] : "",
    ].join(" ");
  }, [bgColor, borderTopColor, fullWidth, position, wrapSize]);

  const sizeClass = useMemo(() => {
    return styles[`_containerSize__${containerSize}`];
  }, [containerSize]);

  const colClasses = useMemo(() => {
    return styles[`_col__${columns}`];
  }, [columns]);

  return (
    <section className={`${styles.section} ${classes} ${className}`}>
      <div className={`${styles.section_inner} ${sizeClass}`}>
        <div className={styles.section_content}>
          <div className={`${styles.section_column} ${colClasses}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
