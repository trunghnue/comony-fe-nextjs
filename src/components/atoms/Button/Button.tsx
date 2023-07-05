import React, { FC } from "react";
import styles from "./Button.module.scss";
import Link from "next/link";
import Image from "next/image";

interface ButtonProps {
  className?: string;
  type?: string;
  label: string;
  borderColor?: "transparent" | "primary" | "secondary" | "white" | "gray" | "black" | "blue" | "red";
  bgColor?:
    | "primary"
    | "secondary"
    | "notice"
    | "white"
    | "black"
    | "gray"
    | "facebook"
    | "twitter"
    | "blue"
    | "red"
    | "transparent";
  size?: string;
  rounded?: boolean;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  externalLink?: boolean;
  fullSize?: boolean;
  disabled?: boolean;
  labelColor?: "white" | "blue" | "red";
  link?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const ButtonComponent = props.externalLink ? "a" : props.icon || !props.onClick ? "button" : Link;
  const handleClick = () => {
    // if (onClick) {
    //   onClick();
    // }
  };

  const classes = [
    styles[`_type__${props.type}`],
    styles[`_bgColor__${props.bgColor}`],
    styles[`_borderColor__${props.borderColor}`],
    styles[`_size__${props.size}`],
    props.disabled ? styles._disabled : "",
    props.fullSize ? styles._fullSize : "",
    props.rounded ? styles._rounded : "",
    styles[`_labelColor__${props.labelColor}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ButtonComponent
      href={props.link ? props.link : ""}
      target={props.externalLink ? "_blank" : undefined}
      className={`${styles.button} ${classes} ${props.className}`}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.icon && (
        <Image
          className={styles.button_icon}
          width={props.iconWidth}
          height={props.iconHeight}
          src={`/images/icon/icon-${props.icon}.svg`}
          alt={props.label}
        />
      )}
      <span className={styles.button_label}>{props.label}</span>
    </ButtonComponent>
  );
};

Button.defaultProps = {
  className: "",
  type: "button",
  label: "button",
  borderColor: "transparent",
  bgColor: "black",
  size: "medium",
  rounded: false,
  icon: "",
  iconWidth: 20,
  iconHeight: 20,
  externalLink: false,
  fullSize: false,
  disabled: false,
  labelColor: "white",
  link: "",
};

export default Button;
