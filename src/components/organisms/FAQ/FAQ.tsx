import React from "react";
import styles from "./FAQ.module.scss";
import AccordionItem from "@/components/molecules/AccordionItem/AccordionItem";

const FAQ = () => {
  return (
    <div className={styles.faq}>
      <AccordionItem />
    </div>
  );
};

export default FAQ;
