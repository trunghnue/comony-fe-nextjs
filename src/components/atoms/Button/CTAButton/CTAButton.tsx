import React, { useMemo } from "react";
import styles from "./CTAButton.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface Props {
  className?: string;
  type?: string;
  label?: string;
  labelMb?: string;
  size?: string;
  icon?: boolean;
  iconColor?: string;
  externalLink?: boolean;
  link?: string;
  disabled?: boolean;
  textChangeHover?: boolean;
  classNameForGa?: string;
}

export default function CTAButton({
  className = "",
  classNameForGa = "",
  disabled = false,
  externalLink = false,
  icon = false,
  iconColor = "black",
  label = "",
  labelMb = "",
  link = "",
  size = "medium",
  textChangeHover = false,
  type = "default",
}: Props) {
  const { t } = useTranslation("top");
  const classes = useMemo(() => {
    return [className, styles[`_type__${type}`], styles[`_size__${size}`], disabled && styles._disabled, textChangeHover && styles._textChanged]
      .filter(Boolean)
      .join(" ");
  }, [className, type, size, disabled, textChangeHover]);
  // const Component: React.ElementType = externalLink ? "a" : link !== "" ? Link : "button";

  return (
    <Link className={`${styles.CTAButton} ${classes}`} href={link} target={externalLink ? "_blank" : ""}>
      <span className={`${styles.CTAButton_label} ${labelMb && "is-pc"}`}>{label}</span>
      {labelMb && <span className={`${styles.CTAButton_label} is-sp`}>{labelMb}</span>}
      {textChangeHover && <span className={`${styles.CTAButton_label} is_pc`}>{t("buttonTextChange")}</span>}
      {icon && <span className={`${styles.CTAButton_icon} ${styles[`_iconColor__${iconColor}`]}`} />}
    </Link>
  );
}
