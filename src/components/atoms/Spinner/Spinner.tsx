import React, { FC } from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: string;
  color?: string;
  bgColor?: string;
}

const Spinner: FC<SpinnerProps> = (props) => {
  const spinnerClasses = [
    styles.spinner,
    styles[`_size__${props.size}`],
    styles[`_bgColor__${props.bgColor}`],
    styles[`_color__${props.color}`],
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={spinnerClasses} />;
};

Spinner.defaultProps = {
  size: "medium",
  color: "primary",
  bgColor: "white",
};

export default Spinner;
