import React, { useMemo } from "react";
import styles from "./LinkText.module.scss";
import Link from "next/link";

interface LinkTextProps {
  className?: string;
  value: string;
  link?: string;
  color?: "primary" | "secondary" | "black" | "notice" | "blue" | "white";
  underline: boolean;
  fontSize: "small" | "medium" | "standard" | "large";
}

export default function LinkText({
  className = "",
  value,
  link = "",
  color = "black",
  underline = false,
  fontSize = "small",
}: LinkTextProps) {
  const classes = useMemo(() => {
    return [className, styles[`_color__${color}`], styles[`_fontSize__${fontSize}`], underline && styles._underline]
      .filter(Boolean)
      .join(" ");
  }, [className, color, fontSize, underline]);

  return (
    <Link className={`${styles.link} ${classes}`} href={link}>
      {value}
    </Link>
  );
}
