import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import TextMainVisual from "./TextMainVisual";
import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import AppDownloadButton from "@/components/atoms/Button/AppDownloadButton/AppDownloadButton";
import CircleLively from "@/components/atoms/CircleLively/CircleLively";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef } from "react";
import styles from "./MainVisualVideo2.module.scss";

export default function MainVisualVideo2() {
  // console.log("🚀 ~ file: MainVisualVideo2.tsx:11 ~ MainVisualVideo2:");
  const { t } = useTranslation("top");

  const bannerRightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bannerRight = bannerRightRef.current;
    bannerRight?.classList.add(styles.mainVisual_inner_bannerRight__animated);
  }, []);

  return (
    <div className={styles.mainVisual}>
      <div className={styles.mainVisual_background}></div>
      <div className={styles.mainVisual_inner}>
        <div className={styles.mainVisual_heading}>
          <TextMainVisual id="title1" isVertical type="heading" title={t("mainVisual.title1") || ""} />
          <TextMainVisual id="title2" isVertical type="heading" title={t("mainVisual.title2") || ""} />
          <TextMainVisual id="subTitle" isVertical type="subTitle" title={t("mainVisual.subTitle") || ""} />
        </div>
        <div className={styles.mainVisual_inner_bannerRight} ref={bannerRightRef}>
          <div className={styles.mainVisual_inner_bannerRight_inner}>
            <AppLogo className={styles.mainVisual_inner_logo} iconColor="#ffffff" size="medium" direction="vertical" />
            <TextMainVisual id="title3" type="title" title={t("mainVisual.title3") || ""} position="center" />
            <div className={styles.mainVisual_inner_description}>
              <TextMainVisual id="description1" type="default" position="left" color="white" title={t("mainVisual.description1") || ""} />
              <br />
              <TextMainVisual id="description2" type="default" position="left" color="white" title={t("mainVisual.description3") || ""} />
              <br />
              <TextMainVisual id="description3" type="default" position="left" color="white" title={t("mainVisual.description6") || ""} />
            </div>
            <AppDownloadButton className={styles.mainVisual_inner_appDownload} />
          </div>
        </div>
        <CircleLively visibleAnimated className={styles.mainVisual_inner_circleLively} />
        <CTAButton
          className={styles.mainVisual_inner_button}
          type="default"
          label={t("mainVisual.button") || ""}
          labelMb={t("mainVisual.button_mb") || ""}
          icon
          iconColor="black"
          link="/spaces"
        />
      </div>
      <div className={styles.mainVisual_video}>
        <video controls src={"/video/mainvisual-movie.mp4"} poster="/images/mainvisual-poster.webp" playsInline autoPlay loop muted />
      </div>
    </div>
  );
}
