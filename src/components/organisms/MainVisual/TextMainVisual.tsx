import React, { useMemo } from "react";
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
  const Component = tag;
  const classes = useMemo(() => {
    return `${type && styles[`_type__${type}`]} ${position && styles[`_position__${position}`]} ${color && styles[`_color__${color}`]} ${
      isVertical ? styles.__vertical : ""
    }`;
  }, [type, position, color, isVertical]);
  return <Component id={id} className={`${styles.textMainVisual} ${classes}`}></Component>;
}
