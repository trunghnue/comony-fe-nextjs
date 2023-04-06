import React, { useMemo } from "react";
import styles from "./LinkText.module.scss";
import Link from "next/link";

interface LinkTextProps {
  value: string;
  link?: string;
  color?: "primary" | "secondary" | "black" | "notice" | "blue" | "white";
  underline: boolean;
  fontSize: "small" | "medium" | "standard" | "large";
}

export default function LinkText({ value, link = "", color = "black", underline = false, fontSize = "small" }: LinkTextProps) {
  const classes = useMemo(() => {
    return [styles[`_color__${color}`], styles[`_fontSize__${fontSize}`], underline && styles._underline].join(" ");
  }, [color, fontSize, underline]);

  return (
    <Link className={`${classes} ${styles.link}`} href={link}>
      {value}
    </Link>
  );
}
