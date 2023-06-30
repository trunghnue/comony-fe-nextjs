import React, { useMemo } from "react";
import styles from "./CTAButton.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface I_ButtonProps {
  className?: string;
  classNameForGa?: string;
  disabled?: boolean;
  externalLink?: boolean;
  icon?: boolean;
  iconColor?: "black" | "white";
  label?: string;
  labelMb?: string;
  link?: string;
  size?: "small" | "medium" | "standard";
  textChangeHover?: boolean;
  type?: "default" | "outline" | "whiteBgr" | "transparent" | "outlineBlack" | "blackBgr";
  onClick?: () => void;
}

const CTAButton: React.FC<I_ButtonProps> = ({
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
  onClick,
}) => {
  const { t } = useTranslation("top");
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const buttonClasses = [
    styles.CTAButton,
    className,
    styles[`_type__${type}`],
    styles[`_size__${size}`],
    disabled && styles._disabled,
    textChangeHover && styles._textChanged,
    classNameForGa,
  ]
    .filter(Boolean)
    .join(" ");
  const ButtonComponent = externalLink ? "a" : link !== "" ? Link : "button";
  const buttonProps = {
    to: !externalLink ? link : undefined,
    href: link,
    target: externalLink ? "_blank" : undefined,
    onClick: externalLink || link !== "" ? undefined : handleClick,
    className: buttonClasses,
  };

  return (
    <ButtonComponent {...buttonProps}>
      <span className={`${styles.CTAButton_label} ${labelMb && "is-pc"}`}>{label}</span>
      {labelMb && <span className={`${styles.CTAButton_label} is-sp`}>{labelMb}</span>}
      {textChangeHover && <span className={`${styles.CTAButton_label} is_pc`}>{t("buttonTextChange")}</span>}
      {icon && <span className={`${styles.CTAButton_icon} ${styles[`_iconColor__${iconColor}`]}`} />}
    </ButtonComponent>
  );
};

export default CTAButton;
