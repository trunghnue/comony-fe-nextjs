import { useState } from "react";
import Link from "next/link";
import { i18n, useTranslation } from "next-i18next";
import { icons } from "@/constants/icons";
import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import IconBase from "@/components/atoms/IconBase/IconBase";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import styles from "./Header.module.scss";
import { useAuth } from "@/contexts/AuthContext";

export default function Header({ bgColor }: { bgColor: string }) {
  const { t } = useTranslation("common");
  const iconColor = bgColor === "white" ? "black" : "white";
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState({ isHumbergerOpen: false });
  const onClickHumbergerMenu = () => {
    setNavigation({
      ...navigation,
      isHumbergerOpen: !navigation.isHumbergerOpen,
    });
  };
  const onCloseHumbergerMenu = () => {
    setNavigation({
      ...navigation,
      isHumbergerOpen: false,
    });
  };
  const { authUser, isLoggedIn } = useAuth();

  return (
    <header className={`${styles.header} ${styles[`_bgColor__${bgColor}`]}`}>
      <Link className={styles.header_logo} href="./">
        <AppLogo iconColor={iconColor} size="small" direction="vertical" />
      </Link>
      <div onClick={onClickHumbergerMenu}>
        <label className={`${styles.header_menuButton} ${navigation.isHumbergerOpen ? styles.is_open : ""}`}>
          <span />
        </label>
      </div>
      <div className={`${styles.header_menu_overlay} ${navigation.isHumbergerOpen ? styles.is_open : ""}`}></div>
      <div className={`${styles.header_menu} ${navigation.isHumbergerOpen ? styles.is_open : ""}`}>
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

          {/* Language Menu in pc */}
          <div
            className={`${styles.header_nav_item} is-header-pc`}
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
            <div
              className={`${styles.header_dropdown} ${isLanguageMenuOpen ? styles.is_open : ""}  ${
                styles[`_bgColor__${bgColor}`]
              }`}
            >
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
          {/* End language menu in pc */}

          {/* Language Menu in mobile */}
          <div className={`${styles.header_nav_lang} is-header-mb`}>
            <Link
              className={i18n?.language === "en" ? styles._active : ""}
              href="/"
              locale="en"
              onClick={onCloseHumbergerMenu}
            >
              English
            </Link>
            <Link
              className={i18n?.language === "ja" ? styles._active : ""}
              href="/"
              locale="ja"
              onClick={onCloseHumbergerMenu}
            >
              日本語
            </Link>
          </div>
          {/* End language menu */}
        </nav>
        <div>
          {!isLoggedIn ? (
            <div className={styles.header_button}>
              <CTAButton link="/login" label={t("header.tryNow") || ""} type="outline" size="small" />
            </div>
          ) : (
            <div className={`${styles.header_nav} is-header-pc`}>
              <button className={styles.header_dropdown_parent}></button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
