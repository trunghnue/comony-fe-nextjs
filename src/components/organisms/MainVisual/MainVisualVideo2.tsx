import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import React from "react";
import styles from "./MainVisualVideo2.module.scss";

export default function MainVisualVideo2() {
  return (
    <div className={styles.mainVisual}>
      <div className={styles.mainVisual_background}>
        <div className={styles.mainVisual_inner}>
          <div className={styles.mainVisual_heading}></div>
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
        <div className={styles.mainVisual_video}></div>
      </div>
    </div>
  );
}
