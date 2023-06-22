import React, { useEffect, useRef, useState } from "react";
import styles from "./FAQ.module.scss";
import AccordionItem from "@/components/molecules/AccordionItem/AccordionItem";

interface I_ListItemFAQ {
  question: string;
  answer: string;
  link?: string;
}
interface I_FAQProps {
  bgColor?: string;
  listItem: I_ListItemFAQ[];
  isScroll?: boolean;
  visibilityChanged: (
    isVisible: boolean,
    entry: IntersectionObserverEntry,
    delayTime: number,
    classes?: string
  ) => void;
}

const FAQ: React.FC<I_FAQProps> = ({ bgColor = "black", isScroll, listItem, visibilityChanged }) => {
  const [showText, setShowText] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const faqObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const isVisible = entry.isIntersecting;
      if (isVisible) {
        visibilityChanged(isVisible, entry, 400);
      }
      setShowText(isVisible);
    });

    faqRef.current && faqObserver.observe(faqRef.current);

    return () => faqObserver.disconnect();
  }, [visibilityChanged]);

  return (
    <div className={`${styles.faq} ${styles[`_bgColor__${bgColor}`]}`}>
      <div ref={faqRef}>
        {listItem.map((item, index) => (
          <AccordionItem
            id={`accordionItem${index}`}
            key={index}
            isScroll={isScroll}
            accordionItem={item}
            color="transparent"
            showText={showText}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
