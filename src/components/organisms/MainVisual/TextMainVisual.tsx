import React, { useEffect, useMemo, useState } from "react";
import styles from "./TextMainVisual.module.scss";

interface TextMainVisualProps {
  className?: string;
  tag?: string;
  type?: "default" | "heading" | "subTitle" | "title" | "accordionTitle" | "imageBoxTitle" | "heroTitle";
  id?: string;
  position?: string;
  color?: string;
  isVertical?: boolean;
  title?: string;
}

export default function TextMainVisual({
  className = "",
  color = "white",
  id = "",
  isVertical = false,
  position = "",
  tag = "p",
  title = "",
  type = "default",
}: TextMainVisualProps) {
  const classes = useMemo(() => {
    return [
      styles[`_type__${type}`],
      styles[`_position__${position}`],
      styles[`_color__${color}`],
      isVertical && styles["__vertical"],
    ]
      .filter(Boolean)
      .join(" ");
  }, [color, isVertical, position, type]);

  useEffect(() => {
    const html = document.querySelector<HTMLElement>(`#${id}`);
    const animationDelay = 20;

    if (html) {
      html.innerHTML = title
        .split("")
        .map((char) => (char === " " ? '<span style="display: inline;"> </span>' : `<span>${char}</span>`))
        .join("");

      if (!["subTitle", "title"].includes(type)) {
        Array.from(html.children).forEach((element, index: number) => {
          if (element instanceof HTMLElement) {
            (element.style as any)["animation-delay"] = `${animationDelay * index}ms`;
          }
        });
      }
    }
  }, [color, id, isVertical, position, title, type]);

  return React.createElement(tag, {
    id,
    className: ` ${className} ${styles.textMainVisual} ${classes}`,
  });
}
