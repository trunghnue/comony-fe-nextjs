import React, { useMemo } from "react";
import styles from "./FigureCaptionItem.module.scss";
import Image from "next/image";

interface FigureCaptionItemProps {
  className?: string;
  image: string;
  isScroll?: boolean;
  size?: "small" | "medium";
  text?: string;
  title?: string;
}

const FigureCaptionItem: React.FC<FigureCaptionItemProps> = ({
  className,
  image,
  isScroll = false,
  size = "medium",
  text = "",
  title = "",
}) => {
  const classes = useMemo(() => {
    return styles[`_size__${size}`];
  }, [size]);

  return (
    <div className={`${className} ${styles.figureCaptionItem} ${isScroll ? "slide-in-item" : ""} ${classes}`}>
      <h2 className={styles.figureCaptionItem_title}>{title}</h2>
      <div className={styles.figureCaptionItem_image}>
        <Image src={`/images/${image}`} alt="title" width={330} height={size === "small" ? 240 : 422}></Image>
      </div>
      <p className={styles.figureCaptionItem_text} dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  );
};

export default FigureCaptionItem;
