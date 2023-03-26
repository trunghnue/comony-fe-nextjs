import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import React from "react";
import styles from "./MainVisualVideo2.module.scss";
import TextMainVisual from "./TextMainVisual";
import { useTranslation } from "next-i18next";
import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import Link from "next/link";
import AppDownloadButton from "@/components/atoms/Button/AppDownloadButton/AppDownloadButton";

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
        <div className={styles.mainVisual_inner_bannerRight}>
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
            <div className={styles.mainVisual_inner_appDownload}>
              <div className={styles.appDownload_pc}>
                <AppDownloadButton os="mac" />
                <AppDownloadButton os="windows" />
              </div>
              <Link href="./downloads" className={styles.appDownload_link}>
                ※ System Requirements
              </Link>
            </div>
          </div>
        </div>
        {/* circleLively */}
        {/* <CTAButton
          className={styles.mainVisual_inner_button}
          type="default"
          label="Go to the gallery page"
          labelMb="space gallery"
          icon
          iconColor="black"
          link="/spaces"
        /> */}
      </div>
      <div className={styles.mainVisual_video}>
        <video controls src={"/video/mainvisual-movie.mp4"} poster="/images/mainvisual-poster.webp" playsInline autoPlay loop muted />
      </div>
    </div>
  );
}
