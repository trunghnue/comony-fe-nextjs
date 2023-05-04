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
  onVisibilityChanged: (isVisible: boolean, id: string, styles: any) => void;
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
      if (isVisible && imageBoxWrapperRef.current) {
        onVisibilityChanged(isVisible, id, styles);
        observer.unobserve(entries[0].target);
      }
    });

    imageBoxWrapperRef.current && observer.observe(imageBoxWrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [id, onVisibilityChanged]);

  return (
    <section className={`${styles.imageBox} ${className}`}>
      <div className={styles.imageBox_wrapper} ref={imageBoxWrapperRef}>
        {src && <Image id={id} src={src} alt={title} width={1440} height={996} />}
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
