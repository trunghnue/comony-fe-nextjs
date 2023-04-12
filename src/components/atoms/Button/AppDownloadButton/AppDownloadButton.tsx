import React, { useMemo } from "react";
import styles from "./AppDownloadButton.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import LinkText from "../../LinkText/LinkText";
import { isMobile } from "react-device-detect";
import constants from "@/constants";

interface Props {
  className?: string;
  size?: "small" | "medium";
}

export default function AppDownloadButton({ className = "", size = "small" }: Props) {
  const { t } = useTranslation(["downloads", "top"]);

  const classes = useMemo(() => {
    return styles[`_size__${size}`];
  }, [size]);

  const appConstants = useMemo(() => constants, []);
  const appInstallerPath = (pctype: string) => {
    const extensions = pctype === "win" ? "exe" : "pkg";

    return `${appConstants.S3_APP_FOLDER_PATH}/download/${pctype}/comony.${extensions}`;
  };

  return (
    <div className={styles.appDownload}>
      <div className={`${className} ${styles.appDownload_pc}`}>
        {/* Mac Button  */}
        <Link className={`${styles.appDownload_button} ${classes}`} href={appInstallerPath("mac")}>
          <div className={styles.appDownload_button_inner}>
            <Image src="/images/icon/icon-mac-home.svg" alt="Mac App" width="18" height="19"></Image>
            <div className={styles.appDownload_button_label}>
              {t("downloads.osApp") || ""} <br /> {t("downloads.dl") || ""}
            </div>
          </div>
        </Link>

        {/* Window Button */}
        <Link className={`${styles.appDownload_button} ${classes}`} href={appInstallerPath("win")}>
          <div className={styles.appDownload_button_inner}>
            <Image src="/images/icon/icon-windows-home.svg" alt="Mac App" width="18" height="19"></Image>
            <div className={styles.appDownload_button_label}>
              {t("downloads.winApp") || ""} <br /> {t("downloads.dl") || ""}
            </div>
          </div>
        </Link>
      </div>

      {/* Link Text */}
      <LinkText
        className={styles.appDownload_link}
        color="white"
        link="./downloads"
        underline
        value={isMobile ? t("mainVisual.linkTextSp", { ns: "top" }) : t("mainVisual.linkText", { ns: "top" })}
        fontSize="medium"
      />
    </div>
  );
}
