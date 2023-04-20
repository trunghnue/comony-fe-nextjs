import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./SubHeadingBlock.module.scss";

interface SubHeadingBlockProps {
  bgColor?: "white" | "white_gradient";
  position?: "left" | "right";
  title?: { line1: string; line2?: string };
  description?: string;
  onVisibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry, delay?: number) => void;
}

export const SubHeadingBlock = ({ bgColor = "white", position = "left", title, description = "", onVisibilityChanged }: SubHeadingBlockProps) => {
  const classes = useMemo(() => {
    return [styles[`_bgColor__${bgColor}`], styles[`_position__${position}`]].join(" ");
  }, [bgColor, position]);

  const visibilityChanged = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        onVisibilityChanged(isVisible, entries[0], 600);
        observer.unobserve(entries[0].target);
      }
    },
    [onVisibilityChanged]
  );

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => visibilityChanged(entries, observer));

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [visibilityChanged]);

  return (
    <div className={`${styles.subHeadingBlock} ${classes}`}>
      <div className={styles.subHeadingBlock_wrapper}>
        <div className={`${styles.subHeadingBlock_title} mask-elem`} ref={titleRef}>
          <div>
            <span dangerouslySetInnerHTML={{ __html: `${title?.line1}` }} />
          </div>
          {title?.line2 && (
            <div>
              <span dangerouslySetInnerHTML={{ __html: title.line2 }} />
            </div>
          )}
        </div>
        {description && <div className={styles.subHeadingBlock_description}>{description}</div>}
      </div>
    </div>
  );
};
