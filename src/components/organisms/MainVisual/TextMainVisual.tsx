import React, { useEffect, useMemo, useState } from "react";
import styles from "./TextMainVisual.module.scss";

interface TextMainVisualProps {
  tag?: string;
  type?: string;
  id?: string;
  position?: string;
  color?: string;
  isVertical?: boolean;
  title?: string;
}

export default function TextMainVisual({
  color = "white",
  id = "",
  isVertical = false,
  position = "left",
  tag = "p",
  title = "",
  type = "default",
}: TextMainVisualProps) {
  const [classes, setClasses] = useState({});

  useEffect(() => {
    const computedClasses = `${type && styles[`_type__${type}`]} ${position && styles[`_position__${position}`]} ${
      color && styles[`_color__${color}`]
    } ${isVertical ? styles.__vertical : ""}`;

    setClasses(computedClasses);

    const html = document.querySelector<HTMLElement>(`#${id}`);
    const animationDelay = 20;

    if (html) {
      html.innerHTML = title
        .split("")
        .map((char) => (char === " " ? '<span style="display: inline;"> </span>' : `<span>${char}</span>`))
        .join("");
      console.log("🚀 ~ file: TextMainVisual.tsx:40 ~ html:", html);

      if (!["subTitle", "title"].includes(type)) {
        Array.from(html.children).forEach((element, index: number) => {
          if (element instanceof HTMLElement) {
            element.style["animation-delay"] = `${animationDelay * index}ms`;
          }
        });
      }
    }
  }, [color, id, isVertical, position, title, type]);

  return React.createElement(tag, {
    id,
    className: `${styles.textMainVisual} ${classes}`,
  });
}
