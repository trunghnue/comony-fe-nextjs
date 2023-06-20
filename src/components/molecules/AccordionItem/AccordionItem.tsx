import React from "react";
import styles from "./AccordionItem.module.scss";
import TextMainVisual from "@/components/organisms/MainVisual/TextMainVisual";
import Image from "next/image";
import LinkText from "@/components/atoms/LinkText/LinkText";

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

const AccordionItem: React.FC<I_AccordionItemProps> = ({
  isScroll,
  color = "black",
  accordionItem,
  id = "",
  showText,
}) => {
  return (
    <dl className={`${styles.accordionItem} slide-in-item`}>
      <dt className={`${styles.accordionItem_trigger} ${styles.is_open} ${styles[`_color__${color}`]}`}>
        <TextMainVisual
          className={styles.accordionItem_trigger_item}
          id={id}
          type="accorditionTitle"
          title={accordionItem.question}
        />
        <Image
          className={`${styles.accordionItem_trigger_icon} ${styles.is_open}`}
          src="/images/icon/icon-arrow-up-down.svg"
          alt="icon"
          width={20}
          height={15}
        />
      </dt>
      <div className={`${styles.accordionItem_target} ${styles.is_open}`}>
        <div
          className={`${styles.accordionItem_contents} ${styles[`_color__${color}`]} ${
            accordionItem.link ? styles._hasLink : ""
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: accordionItem.answer }} />
          {accordionItem.link && (
            <LinkText link="./contact" value={accordionItem.link} fontSize="standard" color="white" underline />
          )}
        </div>
      </div>
    </dl>
  );
};

export default AccordionItem;
