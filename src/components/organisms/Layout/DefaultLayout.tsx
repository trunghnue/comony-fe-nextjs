import React, { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";

interface I_CardProps {
  children: ReactNode;
  bgColor?: "white" | "gray" | "whiteGradient" | "blackGradient";
  title?: string;
}

const DefaultLayout: React.FC<I_CardProps> = ({ children, bgColor = "white", title = "" }) => {
  return <div className={styles.contents}>{children}</div>;
};

export default DefaultLayout;
