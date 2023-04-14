import React, { useMemo } from "react";
import styles from "./AppDownloadButton.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import LinkText from "../../LinkText/LinkText";
import constants from "@/constants";
import Device from "../../Device";

interface Props {
  className?: string;
  size?: "small" | "medium";
}

interface AppButtonProps {
  size: string;
  href: string;
  iconSrc: string;
  appName: string;
  downloadText: string;
}

const AppButton = ({ size, href, iconSrc, appName, downloadText }: AppButtonProps) => (
  <Link className={`${styles.appDownload_button} ${styles[`_size__${size}`]}`} href={href}>
    <div className={styles.appDownload_button_inner}>
      <Image src={iconSrc} alt={`${appName} App`} width="18" height="19" />
      <div className={styles.appDownload_button_label}>
        {appName} <br /> {downloadText}
      </div>
    </div>
  </Link>
);

export default function AppDownloadButton({ className = "", size = "small" }: Props) {
  const { t } = useTranslation(["downloads", "top"]);
  const appConstants = useMemo(() => constants, []);
  const appInstallerPath = (pctype: string) => {
    const extensions = pctype === "win" ? "exe" : "pkg";

    return `${appConstants.S3_APP_FOLDER_PATH}/download/${pctype}/comony.${extensions}`;
  };

  return (
    <div className={`${className}`}>
      <div className={`${styles.appDownload_pc}`}>
        {/* Mac Button  */}
        <AppButton
          size={size}
          href={appInstallerPath("mac")}
          iconSrc="/images/icon/icon-mac-home.svg"
          appName={t("downloads.osApp")}
          downloadText={t("downloads.dl")}
        />

        {/* Window Button */}
        <AppButton
          size={size}
          href={appInstallerPath("win")}
          iconSrc="/images/icon/icon-windows-home.svg"
          appName={t("downloads.winApp")}
          downloadText={t("downloads.dl")}
        />
      </div>

      {/* Link Text */}
      {/* <LinkText
        className={styles.appDownload_link}
        color="white"
        link="./downloads"
        underline
        value={t("mainVisual.linkText", { ns: "top" })}
        fontSize="medium"
      /> */}
      <Device>
        {({ isMobile }) => {
          if (isMobile)
            return (
              <LinkText
                className={styles.appDownload_link}
                color="white"
                link="./downloads"
                underline
                value={t("mainVisual.linkTextSp", { ns: "top" })}
                fontSize="medium"
              />
            );
          return (
            <LinkText
              className={styles.appDownload_link}
              color="white"
              link="./downloads"
              underline
              value={t("mainVisual.linkText", { ns: "top" })}
              fontSize="medium"
            />
          );
        }}
      </Device>
    </div>
  );
}
