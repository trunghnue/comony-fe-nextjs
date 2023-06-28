import React, { FC } from "react";

import styles from "./HeadingSet.module.scss";
import Heading from "@/components/atoms/Heading/Heading";

export interface HeadingLineInterface {
  text: string;
  color: string;
  spBreak: boolean;
}

interface HeadingSetProps {
  className?: string;
  label?: string;
  note?: string;
  labelColor?: "primary" | "secondary" | "black" | "white" | "darkblue" | "alert";
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  align?: "left" | "center" | "right";
  labelSize?: "small" | "medium" | "large" | "extra";
  headings: HeadingLineInterface[];
  fontWeight?: string;
  noteSize?: "small" | "medium" | "large" | "extra";
}

const HeadingSet: FC<HeadingSetProps> = ({
  className = "",
  align = "center",
  fontWeight = "400",
  headings,
  label = "",
  labelColor = "primary",
  labelSize = "small",
  level = "1",
  note = "",
  noteSize = "small",
}) => {
  const labelClasses = `${styles.headingSet_label} ${styles[`_labelSize__${labelSize}`]} ${
    styles[`_labelColor__${labelColor}`]
  }`;
  const noteClasses = `${styles.headingSet_note} ${styles[`_noteSize__${noteSize}`]} ${
    styles[`_labelColor__${labelColor}`]
  }`;

  return (
    <div className={`${className} ${styles.headingSet} ${labelClasses}`} style={{ textAlign: align }}>
      {label && <div className={styles.headingSet_label}>{label}</div>}

      <Heading level={level} align={align} headings={headings} fontWeight={fontWeight} />

      {note && <div className={noteClasses} dangerouslySetInnerHTML={{ __html: note }} />}
    </div>
  );
};

export default HeadingSet;
