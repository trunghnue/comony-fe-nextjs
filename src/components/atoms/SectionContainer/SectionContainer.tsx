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

const SectionContainer: React.FC<SectionContainerProps> = ({
  columns = "1",
  containerSize = "lg",
  position = "center",
  bgColor = "white",
  borderTopColor = "none",
  wrapSize = "normal",
  fullWidth = false,
  children,
  className = "",
}) => {
  const classes = useMemo(() => {
    return [
      className,
      styles[`_bgColor__${bgColor}`],
      styles[`_borderTopColor__${borderTopColor}`],
      styles[`_position__${position}`],
      styles[`_wrapSize__${wrapSize}`],
      fullWidth ?? styles["__fullWidth"],
    ]
      .filter(Boolean)
      .join(" ");
  }, [className, bgColor, borderTopColor, position, wrapSize, fullWidth]);

  return (
    <section className={`${styles.section} ${classes}`}>
      <div className={`${styles.section_inner} ${styles[`_containerSize__${containerSize}`]}`}>
        <div className={styles.section_contents}>
          <div className={`${styles.section_column} ${styles[`_col__${columns}`]}`}>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SectionContainer;
