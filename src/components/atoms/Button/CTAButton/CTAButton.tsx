import React, { useMemo } from "react";
import styles from "./CTAButton.module.scss";
import Link from "next/link";

interface I_ButtonProps {
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
}: I_ButtonProps) {
  const classes = useMemo(() => {
    return `${type && styles[`_type__${type}`]} ${size && styles[`_size__${size}`]} ${disabled ? styles._disabled : ""} ${
      textChangeHover ? styles._textChanged : ""
    }`;
  }, [type, size, disabled, textChangeHover]);

  const iconClasses = useMemo(() => {
    return `${iconColor && `_iconColor__${iconColor}`}`;
  }, [iconColor]);
  const Component: React.ElementType = externalLink ? "a" : link !== "" ? Link : "button";

  return (
    <Component
      href={link}
      target={externalLink ? "_blank" : ""}
      className={`${className} ${classes} ${classNameForGa && styles[classNameForGa]} ${styles.CTAButton}`}
    >
      <span className={`${styles.CTAButton_label} ${labelMb ? "is-pc" : ""}`}>{label}</span>
      {labelMb && <span className={`${styles.CTAButton_label} is-sp`}>{labelMb}</span>}
      {textChangeHover && <span className={`${styles.CTAButton_label} ${styles.is_pc}`}>buttonTextChange</span>}
      {icon && <span className={`${styles.CTAButton_icon} ${styles[iconClasses]}`} />}
    </Component>
  );
}
