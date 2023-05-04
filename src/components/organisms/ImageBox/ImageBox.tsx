import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ImageBox.module.scss";
import Image from "next/image";
import TextMainVisual from "../MainVisual/TextMainVisual";
import { handleScroll } from "@/utilities/scroll";

interface I_ImageBoxProps {
  className: string;
  id: string;
  src?: string;
  number?: string;
  title?: string;
  position?: "left" | "right";
  description?: string;
  onVisibilityChanged: (id: string, styles: any) => void;
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
  const [visibleImageBoxContent, setVisibleImageBoxContent] = useState<boolean>(false);
  const [visibleText, setVisibleText] = useState<boolean>(false);
  const imageBoxWrapperRef = useRef<HTMLDivElement>(null);
  const slideItemsRef = useRef<HTMLDivElement>(null);
  const { visibilityChangedImageBoxContent } = handleScroll();

  useEffect(() => {
    const imageBoxWrapperObserver = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        onVisibilityChanged(id, styles);
        imageBoxWrapperObserver.unobserve(entries[0].target);
      }
    });

    imageBoxWrapperRef.current && imageBoxWrapperObserver.observe(imageBoxWrapperRef.current);

    const slideItemsObserver = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        setVisibleImageBoxContent(true);
        setVisibleText(true);
        visibilityChangedImageBoxContent(entries[0], styles);
        slideItemsObserver.unobserve(entries[0].target);
      }
    });

    slideItemsRef.current && slideItemsObserver.observe(slideItemsRef.current);

    return () => {
      imageBoxWrapperObserver.disconnect();
      slideItemsObserver.disconnect();
    };
  }, [id, onVisibilityChanged, visibilityChangedImageBoxContent]);

  return (
    <section className={`${styles.imageBox} ${className}`}>
      <div className={styles.imageBox_wrapper} ref={imageBoxWrapperRef}>
        {src && <Image id={id} src={src} alt={title} width={1440} height={996} />}
      </div>
      <div className={`${styles.slideItems} ${styles[`_${position}Side`]}`} ref={slideItemsRef}>
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
