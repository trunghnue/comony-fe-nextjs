import React, { useEffect, useMemo, useRef } from "react";
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
  onVisibilityChanged: (isVisible: boolean, element: HTMLDivElement) => void;
}

const ImageBox: React.FC<I_ImageBoxProps> = ({
  className = "",
  id,
  src = "",
  number = "",
  title = "",
  position = "left",
  description = "",
  onVisibilityChanged,
}) => {
  const classes = useMemo(() => {
    return [styles[`_position__${position}`], !number && styles._hasNumber].filter(Boolean).join(" ");
  }, [number, position]);
  const visibleImageBoxContent = true;
  const visibleText = true;
  const imageBoxWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      console.log("🚀 ~ file: ImageBox.tsx:37 ~ isVisible:", isVisible);
      if (isVisible && imageBoxWrapperRef.current) {
        onVisibilityChanged(isVisible, imageBoxWrapperRef.current);
        observer.unobserve(entries[0].target);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [onVisibilityChanged]);

  return (
    <section className={`${styles.imageBox} ${className}`}>
      <div className={styles.imageBox_wrapper} ref={imageBoxWrapperRef}>
        {src && <Image src={src} alt={title} width={1440} height={996} />}
      </div>
      <div className={`${styles.slideItems} ${styles[`_${position}Side`]}`}>
        {visibleImageBoxContent && (
          <div className={`${styles.imageBox_content} ${styles.box} ${classes}`}>
            <div className={styles.imageBox_first}>
              <div className={styles.imageBox_first_line}>
                <h2 className={styles.imageBox_first_number}>{number}</h2>
                <div className={styles.imageBox_first_forwardSlash} />
              </div>
              {visibleText && (
                <TextMainVisual id={`title-image-box-${id}`} className={styles.imageBox_first_title} type="imageBoxTitle" title={title} />
              )}
            </div>
            {description && (
              <div className={styles.imageBox_second}>
                <p>{description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageBox;
