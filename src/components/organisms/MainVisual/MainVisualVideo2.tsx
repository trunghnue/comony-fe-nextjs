import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import React from "react";
import styles from "./MainVisualVideo2.module.scss";
import TextMainVisual from "./TextMainVisual";

export default function MainVisualVideo2() {
  return (
    <div className={styles.mainVisual}>
      <div className={styles.mainVisual_background}>
        <div className={styles.mainVisual_inner}>
          <div className={styles.mainVisual_heading}>
            <TextMainVisual id="title1" isVertical type="heading" title="For All Architecture Fans" />
            <TextMainVisual id="title2" isVertical type="heading" title="Gain insight about architecture with the Architectural Metaverse" />
            <TextMainVisual id="subTitle" isVertical type="subTitle" title="Designing the future by the architectural metaverse." />
          </div>
          <div className={styles.mainVisual_inner_bannerRight}></div>
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
    </div>
  );
}
