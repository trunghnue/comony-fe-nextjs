import React from "react";
import styles from "./Footer.module.scss";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import AppLogo from "@/components/atoms/AppLogo/AppLogo";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_menu}>
        <div className={styles.footer_sitemap}>
          <div className={styles.footer_sitemap_items}>
            {/* First Column */}
            <dl>
              <dt className={styles.footer_sitemap_title}>{t("footer.first.title")}</dt>
              {[...Array(4)].map((_, index) => (
                <dd id={`firstColumnItem${index + 1}`} key={index}>
                  <Link href={t(`footer.first.link${index + 1}`) || ""}>{t(`footer.first.name${index + 1}`)}</Link>
                </dd>
              ))}
            </dl>

            {/* Second Column */}
            <dl>
              <dt className={styles.footer_sitemap_title}>{t("footer.second.title")}</dt>
              {[...Array(5)].map((_, index) => (
                <dd id={`secondColumnItem${index + 1}`} key={index}>
                  <Link href={t(`footer.second.link${index + 1}`) || ""}>{t(`footer.second.name${index + 1}`)}</Link>
                </dd>
              ))}
            </dl>
          </div>
        </div>
        <div className={styles.footer_actions}>
          <div>{t("footer.action")}</div>
          <div className={styles.footer_button}>
            <CTAButton
              className={styles.forCreatorBusinessCTABanner_button}
              type="outline"
              size="small"
              label={t("footer.login") || ""}
              icon
              iconColor="white"
              link="./login"
            />
          </div>
        </div>
      </div>
      <div className={styles.footer_copyright}>
        <AppLogo size="xsmall" direction="vertical" iconColor="#fff" />
        <small className={styles.footer_copyright_text}>Made by Trung Nguyen Thanh. Copyright © LASTMILE WORKS Co., Ltd. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
