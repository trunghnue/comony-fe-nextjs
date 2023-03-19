import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import React from "react";
import styles from "./MainVisualVideo2.module.scss";
import TextMainVisual from "./TextMainVisual";
import { useTranslation } from "next-i18next";

export default function MainVisualVideo2() {
  const { t } = useTranslation("top");
  return (
    <div className={styles.mainVisual}>
      <div className={styles.mainVisual_background}></div>
      <div className={styles.mainVisual_inner}>
        <div className={styles.mainVisual_heading}>
          <TextMainVisual id="title1" isVertical type="heading" title={t("mainVisual.title1") || ""} />
          <TextMainVisual id="title2" isVertical type="heading" title={t("mainVisual.title2") || ""} />
          <TextMainVisual id="subTitle" isVertical type="subTitle" title={t("mainVisual.subTitle") || ""} />
        </div>
        <div className={styles.mainVisual_inner_bannerRight}></div>
        {/* circleLively */}
        <CTAButton
          className={styles.mainVisual_inner_button}
          type="default"
          label="Go to the gallery page"
          labelMb="space gallery"
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
