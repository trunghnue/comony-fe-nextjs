import React, { FC } from "react";
import styles from "./DividerWithText.module.scss";

interface DividerWithTextProps {
  className?: string;
  fontSize?: string;
  msg: string;
}

const DividerWithText: FC<DividerWithTextProps> = (props) => {
  return (
    <div className={`${props.className} ${styles.dividerWithText}`}>
      <span style={{ fontSize: props.fontSize }}>{props.msg}</span>
    </div>
  );
};

DividerWithText.defaultProps = {
  className: "",
  fontSize: "1.5rem",
};

export default DividerWithText;
