import React, { useMemo } from "react";
import styles from "./ImageBox.module.scss";
import Image from "next/image";
import TextMainVisual from "../MainVisual/TextMainVisual";

interface I_ImageBoxProps {
  className: string;
  id: string;
  src?: string;
  number?: string;
  title?: string;
  position?: "left" | "right";
  description?: string;
}

const ImageBox: React.FC<I_ImageBoxProps> = ({ className = "", id, src = "", number = "", title = "", position = "left", description = "" }) => {
  const classes = useMemo(() => {
    return [styles[`_position__${position}`], !number && styles._hasNumber].filter(Boolean).join(" ");
  }, [number, position]);

  const visibleImageBoxContent = true;
  const visibleText = true;

  return (
    <section className={`${styles.imageBox} ${className}`}>
      <div className={styles.imageBox_wrapper}>{src && <Image src={src} alt={title} width={1440} height={996} />}</div>
      <div className={`${styles.slideItems} ${styles[`_${position}Side`]}`}>
        {visibleImageBoxContent && (
          <div className={`${styles.imageBox_content} ${styles.box} ${classes}`}>
            <div className={styles.imageBox_first}>
              <div className={styles.imageBox_first_line}>
                <h2 className={styles.imageBox_first_number}>{number}</h2>
                <div className={styles.imageBox_first_forwardSlash}></div>
              </div>
              {visibleText && (
                <TextMainVisual id={`title-image-box-${id}`} className={styles.imageBox_first_title} type="imageBoxTitle" title={title} />
              )}
            </div>
            {description && <div className={styles.imageBox_second}>{description}</div>}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageBox;
