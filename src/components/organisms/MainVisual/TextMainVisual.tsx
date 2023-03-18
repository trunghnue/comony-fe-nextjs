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
    let content = "";

    for (let index = 0; index < title.length; index++) {
      if (title[index] === " ") {
        content += '<span style="display: inline;"> </span>';
      } else {
        content += `<span>${title[index]}</span>`;
      }
    }

    if (html) {
      html.innerHTML = content;
    }

    if (["subTitle", "title"].includes(type)) {
      return;
    }

    const length = html?.children.length || 0;

    for (let index: number = 0; index < length; index++) {
      if (html) {
        const element = html.children[index] as HTMLElement;

        element.style["animation-delay"] = `${animationDelay * index}ms`;
      }
    }
  }, [color, id, isVertical, position, title, type]);

  return React.createElement(tag, {
    id,
    className: `${styles.textMainVisual} ${classes}`,
  });
}
