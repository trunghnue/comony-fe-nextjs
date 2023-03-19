import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import { useMemo, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import IconBase from "@/components/atoms/IconBase/IconBase";
import { icons } from "@/constants/icons";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import { useTranslation } from "next-i18next";

export default function Header({ bgColor }: { bgColor: string }) {
  const { t } = useTranslation("common");

  const iconColor = useMemo(() => {
    return bgColor === "white" ? "black" : "white";
  }, [bgColor]);

  const bgColorClass = useMemo(() => {
    return `${bgColor && styles[`_bgColor__${bgColor}`]}`;
  }, [bgColor]);

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${bgColorClass}`}>
      <AppLogo iconColor={iconColor} size="small" direction="vertical" />
      <div className={styles.header_menu}>
        <nav className={styles.header_nav}>
          <div className={styles.header_nav_item}>
            <Link className={styles.header_nav_link} href="/spaces">
              {t("header.spaceList")}
            </Link>
          </div>
          <div className={styles.header_nav_item}>
            <Link className={styles.header_nav_link} href="/spaces">
              {t("header.business")}
            </Link>
          </div>
          <div className={styles.header_nav_item}>
            <Link className={styles.header_nav_link} href="/spaces">
              {t("header.creator")}
            </Link>
          </div>
          <div className={styles.header_nav_item}>
            <Link className={styles.header_nav_link} href="/spaces">
              {t("header.contact")}
            </Link>
          </div>
          <div className={styles.header_nav_item}>
            <Link className={`${styles.header_nav_link} ${styles.__right_border}`} href="/spaces">
              {t("header.appDl")}
            </Link>
          </div>
          <div
            className={`${styles.header_nav_item} ${styles.is_header_pc}`}
            onMouseOver={() => setIsLanguageMenuOpen(true)}
            onMouseOut={() => setIsLanguageMenuOpen(false)}
          >
            <button className={styles.header_dropdown_parent}>
              <IconBase
                iconName="earth"
                className={styles.icon_earth}
                width={icons.earth.width}
                height={icons.earth.height}
                path={icons.earth.path}
                viewBox={icons.earth.viewBox}
                transform={icons.earth.transform}
                iconColor={bgColor === "black" ? "#fff" : "#2b5ba9"}
                iconHoverColor={bgColor === "black" ? "#fff" : "#2b5ba9"}
              />
              <span>Language</span>
              <IconBase
                iconName="arrow"
                className={styles.icon_arrow}
                width={icons.arrow.width}
                height={icons.arrow.height}
                path={icons.arrow.path}
                viewBox={icons.arrow.viewBox}
                transform={icons.arrow.transform}
                iconColor={bgColor === "black" ? "#fff" : "#2b5ba9"}
                iconHoverColor={bgColor === "black" ? "#fff" : "#2b5ba9"}
              />
            </button>
            <div className={`${styles.header_dropdown} ${isLanguageMenuOpen ? styles.is_open : ""}  ${bgColorClass}`}>
              <div className={styles.header_dropdown_item}>
                <Link href="/" locale="ja">
                  日本語
                </Link>
              </div>
              <div className={`${styles.header_dropdown_item} ${styles._active}`}>
                <Link href="/" locale="en">
                  English
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <div className={styles.header_button}>
            <CTAButton link="/login" label={t("header.tryNow") || ""} type="outline" size="small" />
          </div>
        </div>
      </div>
    </header>
  );
}
