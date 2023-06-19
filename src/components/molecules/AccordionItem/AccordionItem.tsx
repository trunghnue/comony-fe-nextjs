import React from "react";
import styles from "./AccordionItem.module.scss";

const AccordionItem = () => {
  interface I_AccordItemElement {
    question: string;
    answer: string;
    link?: string;
  }

  interface I_AccordionItemProps {
    isScroll?: boolean;
    color?: string;
    accordionItem: I_AccordItemElement;
    id?: string;
    showText?: boolean;
  }

  return (
    <dl className={`${styles.accordionItem} slide-in-item`}>
      <div>
        <dt className={`${styles.accordionItem_trigger} ${styles.is_open}`}></dt>
      </div>
    </dl>
  );
};

export default AccordionItem;
