import React, { useMemo } from "react";
import styles from "./Heading.module.scss";

// props type
interface HeadingLineInterface {
  text: string;
  color: string;
  spBreak: boolean;
}

interface HeadingProps {
  align?: "left" | "center" | "right";
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  headings: HeadingLineInterface[];
  fontWeight?: string;
}

export default function Heading({ align = "center", level = "1", headings, fontWeight = "400" }: HeadingProps) {
  const Component: React.ElementType = `h${level}`;

  const classes = useMemo(() => {
    return styles[`_lv__${level}`];
  }, [level]);

  const styless = useMemo(() => {
    return {
      fontWeight: fontWeight,
      textAlign: align,
    };
  }, [fontWeight, align]);
  return (
    <Component className={`${styles.heading} ${classes}`} style={styless}>
      {headings.map((heading, index) => {
        return (
          //   <span
          //     key={index}
          //     className={[styles[`_fontColor__${heading.color}`], heading.spBreak ? styles["-spBreak"] : ""].join(" ")}
          //     dangerouslySetInnerHTML={{ __html: heading.text }}
          //   />
          <span key={index} className={[styles[`_fontColor__${heading.color}`], heading.spBreak ? styles["-spBreak"] : ""].join(" ")}>
            {heading.text}{" "}
          </span>
        );
      })}
    </Component>
  );
}
