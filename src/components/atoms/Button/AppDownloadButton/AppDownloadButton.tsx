import React from "react";
import styles from "./AppDownloadButton.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  os: string;
}

export default function AppDownloadButton({ os }: Props) {
  const linkDownload = os === "windows" ? "/comony_web/app/web/static/download/win/comony.exe" : "/comony_web/app/web/static/download/mac/comony.pkg";
  const iconPath = os === "windows" ? "/images/icon/icon-windows-home.svg" : "/images/icon/icon-mac-home.svg";
  const altString = os === "windows" ? "Mac App" : "Windows App";
  const title = os === "windows" ? `comony for Windows` : `comony for Mac`;

  return (
    <Link href={linkDownload} className={styles.appDownload_button}>
      <div className={styles.appDownload_button_inner}>
        <Image className={styles.appDownload_button_img} src={iconPath} alt={altString} width="25" height="25"></Image>
        <div className={styles.appDownload_button_label}>
          {title} <br /> Download
        </div>
      </div>
    </Link>
  );
}
