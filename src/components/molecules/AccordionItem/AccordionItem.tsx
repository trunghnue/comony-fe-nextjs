import React, { useRef, useState } from "react";
import styles from "./AccordionItem.module.scss";
import TextMainVisual from "@/components/organisms/MainVisual/TextMainVisual";
import Image from "next/image";
import LinkText from "@/components/atoms/LinkText/LinkText";
import { Transition } from "react-transition-group";

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
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const accordionToggle = () => {
    setIsOpened(!isOpened);
  };
  const beforeEnter = () => {
    if (targetRef.current) {
      targetRef.current.style.height = "0";
    }
  };

  const enter = () => {
    if (targetRef.current) {
      targetRef.current.style.height = `${targetRef.current.scrollHeight}px`;
    }
  };

  const beforeLeave = () => {
    if (targetRef.current) {
      targetRef.current.style.height = `${targetRef.current.scrollHeight}px`;
    }
  };

  const leave = () => {
    if (targetRef.current) {
      targetRef.current.style.height = "0";
    }
  };

  return (
    <dl className={`${styles.accordionItem} slide-in-item`} onClick={accordionToggle}>
      <dt className={`${styles.accordionItem_trigger} ${styles[`_color__${color}`]}`}>
        {showText && isScroll ? (
          <TextMainVisual
            className={styles.accordionItem_trigger_item}
            id={id}
            type="accordionTitle"
            title={accordionItem.question}
          />
        ) : (
          <div
            className={styles.accordionItem_trigger_item}
            dangerouslySetInnerHTML={{ __html: accordionItem.question }}
          ></div>
        )}
        <Image
          className={`${styles.accordionItem_trigger_icon} ${isOpened ? styles.is_open : ""}`}
          src="/images/icon/icon-arrow-up-down.svg"
          alt="icon"
          width={20}
          height={15}
        />
      </dt>
      <Transition
        in={isOpened}
        timeout={0}
        onEnter={beforeEnter}
        onEntered={enter}
        onExit={beforeLeave}
        onExited={leave}
        mountOnEnter
      >
        <dd className={`${styles.accordionItem_target} ${isOpened ? styles.is_open : ""}`} ref={targetRef}>
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
        </dd>
      </Transition>
    </dl>
  );
};

export default AccordionItem;
