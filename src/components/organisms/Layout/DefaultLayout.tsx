import React, { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";

interface Props {
  children: ReactNode;
  bgColor?: "white" | "gray" | "whiteGradient" | "blackGradient";
  title?: string;
}

export default function DefaultLayout({ children, bgColor = "white", title = "" }: Props) {
  return <div className={styles.contents}>{children}</div>;
}
