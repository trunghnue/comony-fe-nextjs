import React, { useMemo } from "react";
import styles from "./AppDownloadCTABanner.module.scss";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import AppDownloadButton from "@/components/atoms/Button/AppDownloadButton/AppDownloadButton";

interface I_AppDownloadCTABannerProps {
  className?: string;
  text?: string;
  image?: string;
  link?: string;
}

const AppDownloadCTABanner: React.FC<I_AppDownloadCTABannerProps> = ({ className = "", text = "", image = "", link = "" }) => {
  const classes = useMemo(() => {
    return text ? styles.__hasText : "";
  }, [text]);
  const { t } = useTranslation("top");

  return (
    <section className={`${className} ${styles.appDownloadCTABanner} ${classes}`}>
      <div className={styles.appDownloadCTABanner_inner}>
        <AppLogo size="medium" direction="vertical" iconColor="#fff" />
        <p className={styles.appDownloadCTABanner_text}>{text}</p>
        <AppDownloadButton />
      </div>
      <CTAButton
        className={styles.appDownloadCTABanner_button}
        classNameForGa=""
        type="default"
        label={t("appDownloadCTABanner.button") || ""}
        labelMb={t("appDownloadCTABanner.button_mb") || ""}
        icon
        iconColor="black"
        link={link}
      />
      <Image className={styles.appDownloadCTABanner_image} src={`/images/${image}`} alt="text" width={1440} height={493}></Image>
    </section>
  );
};

export default AppDownloadCTABanner;
