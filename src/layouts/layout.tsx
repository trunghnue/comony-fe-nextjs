import React from "react";
import styles from "./layout.module.scss";
import Header from "@/components/organisms/Header/Header";
import ButtonToTop from "@/components/atoms/Button/ButtonToTop/ButtonToTop";
import Footer from "@/components/organisms/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contents}>
        <Header bgColor="black" />
        {children}
        <ButtonToTop />
        <Footer />
      </div>
    </div>
  );
}
