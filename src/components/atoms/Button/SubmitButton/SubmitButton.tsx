import React, { FC } from "react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps {
  isLoading?: boolean;
  spinner?: boolean;
  spinnerColor?: "primary" | "secondary" | "black" | "white";
  label: string;
  borderColor?: "transparent" | "primary" | "secondary" | "white" | "gray" | "black";
  bgColor?: "primary" | "secondary" | "white" | "black" | "facebook" | "twitter";
  size?: "xsmall" | "small" | "medium" | "large";
  rounded?: boolean;
  icon?: string;
  iconWidth?: string;
  iconHeight?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const buttonClasses = [
    styles.button,
    styles[`_bgColor__${props.bgColor}`],
    styles[`_borderColor__${props.borderColor}`],
    styles[`_size__${props.size}`],
    props.disabled && styles._disabled,
    props.isLoading && styles._isLoading,
    props.rounded && styles._rounded,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} type="submit" onClick={props.onClick}>
      {props.spinner && props.isLoading && (
        <div className={styles.button_spinner}>
          <Spinner size="small" color={props.spinnerColor} />
        </div>
      )}
      <span>{props.label}</span>
    </button>
  );
};

SubmitButton.defaultProps = {
  isLoading: false,
  spinner: false,
  spinnerColor: "black",
  borderColor: "transparent",
  bgColor: "black",
  size: "medium",
  rounded: false,
  icon: "",
  iconWidth: "20px",
  iconHeight: "20px",
  disabled: false,
};

export default SubmitButton;
