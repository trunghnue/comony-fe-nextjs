import React, { useMemo } from "react";
import styles from "./SubHeadingBlock.module.scss";

interface Props {
  bgColor?: "white" | "white_gradient";
  position?: "left" | "right";
  title?: string;
  description?: string;
}

export default function SubHeadingBlock({ bgColor = "white", position = "left", title = "", description = "" }: Props) {
  const classes = useMemo(() => {
    return [styles[`_bgColor__${bgColor}`], styles[`_position__${position}`]].join(" ");
  }, [bgColor, position]);
  return <div>SubHeadingBlock</div>;
}
