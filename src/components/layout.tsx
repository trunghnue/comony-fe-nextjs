import React, { useState } from "react";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [inLoaded, setInLoaded] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={`${inLoaded ? styles["-loaded"] : ""} ${styles["initial-loading"]} `} />
      <div className={styles.contents}>
        <h1>Header</h1>
        <main>{children}</main>
        <h1>Button to top</h1>
        <h1>Footer</h1>
      </div>
    </div>
  );
}
