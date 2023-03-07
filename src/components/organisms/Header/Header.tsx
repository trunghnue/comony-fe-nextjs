import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import { useMemo } from "react";
import styles from "./Header.module.scss";

export default function Header({ bgColor }: { bgColor: string }) {
  const iconColor = useMemo(() => {
    return bgColor === "white" ? "black" : "white";
  }, [bgColor]);

  const bgColorClass = useMemo(() => {
    return `${bgColor && styles[`-bgColor--${bgColor}`]}`;
  }, [bgColor]);

  return (
    <header className={`${styles.header} ${bgColorClass}`}>
      <AppLogo iconColor={iconColor} size="small" direction="vertical" />
      <div className={styles["header_menu"]}>
        <nav className={styles["header_nav"]}>
          <div className={styles["header_nav_item"]}>Space Gallery</div>
          <div className={styles["header_nav_item"]}>For Business</div>
          <div className={styles["header_nav_item"]}>For Creator</div>
          <div className={styles["header_nav_item"]}>Contact</div>
          <div className={styles["header_nav_item"]}>Download App</div>
          <div className={styles["header_nav_item"]}>Language</div>
        </nav>
        <div className="headerButton">Sign in</div>
      </div>
    </header>
  );
}
