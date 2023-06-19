import React, { useEffect, useRef } from "react";
import styles from "./FigureCaptionList.module.scss";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import FigureCaptionItem from "@/components/molecules/FigureCaptionItem/FigureCaptionItem";

interface I_FigureCaptionListElement {
  title: string;
  text: string;
  image: string;
}

interface FigureCaptionListProps {
  className?: string;
  figureCaptionList: I_FigureCaptionListElement[];
  isScroll?: boolean;
  size?: "small" | "medium";
  onVisibilityChanged?: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
}

const FigureCaptionList: React.FC<FigureCaptionListProps> = ({
  className,
  figureCaptionList,
  isScroll = false,
  size = "medium",
  onVisibilityChanged,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (onVisibilityChanged && entry) {
        const isVisible = entry.isIntersecting;
        if (isVisible) {
          onVisibilityChanged(isVisible, entry);
          itemObserver.unobserve(entry.target);
        }
      }
    });

    itemRef.current && itemObserver.observe(itemRef.current);

    return () => itemObserver.disconnect();
  }, [onVisibilityChanged]);

  return (
    <SectionContainer className={className} bgColor="black-gradient" columns="1" containerSize="lg" position="left">
      <div className={styles.figureCaptionList} ref={itemRef}>
        {figureCaptionList.map((item, index) => (
          <FigureCaptionItem
            className={styles.figureCaptionList_item}
            key={index}
            image={item.image}
            title={item.title}
            text={item.text}
            isScroll={isScroll}
            size={size}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FigureCaptionList;
