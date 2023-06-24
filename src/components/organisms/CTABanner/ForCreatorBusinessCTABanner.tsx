import React from "react";
import styles from "./ForCreatorBusinessCTABanner.module.scss";
import Image from "next/image";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";

interface ForCreatorBusinessCTABannerProps {
  className?: string;
  link?: string;
  image?: string;
  title?: string;
  buttonLabel?: string;
  description?: string;
}

const ForCreatorBusinessCTABanner: React.FC<ForCreatorBusinessCTABannerProps> = ({
  className = "",
  link = "",
  image = "",
  title = "",
  buttonLabel = "",
  description = "",
}) => {
  return (
    <div className={`${styles.forCreatorBusinessCTABanner} ${className}`}>
      <div className={styles.forCreatorBusinessCTABanner_image}>
        <Image src={`/images/${image}`} alt="title" width={1440} height={531} />
      </div>
      {title && (
        <div className={styles.forCreatorBusinessCTABanner_inner}>
          <p className={styles.forCreatorBusinessCTABanner_text}>{title}</p>
          <p
            className={styles.forCreatorBusinessCTABanner_description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      )}
      <div className={styles.forCreatorBusinessCTABanner_wrapperButton}>
        <CTAButton
          className={styles.forCreatorBusinessCTABanner_button}
          type="outline"
          icon
          iconColor="white"
          label={buttonLabel}
          link={link}
        />
      </div>
    </div>
  );
};

export default ForCreatorBusinessCTABanner;
