import React from "react";
import styles from "./ButtonToTop.module.scss";
import Image from "next/image";

const ButtonToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <div className={styles.buttonToTop}>
      <button type="button" onClick={scrollToTop}>
        <Image src="/images/icon/icon-arrow-top.svg" alt="icon arrow top" width={28} height={14} />
      </button>
    </div>
  );
};

export default ButtonToTop;
