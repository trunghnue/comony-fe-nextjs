import React, { useState, useEffect } from "react";
import styles from "./layout.module.scss";
import Header from "./organisms/Header/Header";
import ButtonToTop from "./atoms/Button/ButtonToTop/ButtonToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log("🚀 ~ file: layout.tsx:6 ~ Layout:");
  const [inLoaded, setInLoaded] = useState(false);

  // cách dùng use effect
  //Chung: Callback trong use effect luôn được gọi sau khi component mounted
  //Riêng:
  // useEffect(callback): Gọi callback mỗi khi re-render & Gọi callback sau khi component thêm element vào DOM
  // useEffect(callback, []): Chỉ gọi callback 1 lần sau khi component mounted
  // useEffect(callback, [deps]): Callback sẽ được gọi lại mỗi khi deps thay đổi

  useEffect(() => {
    setInLoaded(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${inLoaded ? styles._loaded : ""} ${styles.initial_loading} `} />
      <div className={styles.contents}>
        <Header bgColor="black" />
        {children}
        <ButtonToTop />
        <h1>Footer</h1>
      </div>
    </div>
  );
}
