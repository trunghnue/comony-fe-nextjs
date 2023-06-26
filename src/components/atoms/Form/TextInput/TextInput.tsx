import React, { useState, useRef, useEffect } from "react";
import styles from "./TextInput.module.scss";
import Image from "next/image";

interface TextInputProps {
  modelValue?: string | number;
  typeInput?: "number" | "text" | "email" | "password";
  borderColor?: "primary" | "gray" | "white" | "none";
  borderRadius?: boolean;
  size?: "small" | "medium" | "large";
  minValue?: number;
  maxValue?: number;
  placeHolder?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: "none" | "left" | "right";
  errorMessage?: string;
  suffix?: string;
  hasFocus?: boolean;
  colorInput?: "black" | "white";
  idInput?: string;
  onUpdateModelValue: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  modelValue,
  typeInput = "text",
  borderColor = "gray",
  borderRadius = true,
  size = "medium",
  minValue = 0,
  maxValue = 100,
  placeHolder = "",
  disabled = false,
  icon = "",
  iconPosition,
  errorMessage = "",
  suffix = "",
  hasFocus = false,
  colorInput = "black",
  idInput = "",
  onUpdateModelValue,
}) => {
  const [typeInputCheck, setTypeInputCheck] = useState(typeInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateModelValue(event.target.value);
  };

  const switchVisibility = () => {
    setTypeInputCheck(typeInputCheck === "password" ? "text" : "password");
  };

  const suffixClasses = suffix ? styles.input_suffix : "";
  const inputClasses = [
    styles.input_field,
    styles[`-borderColor--${borderColor}`],
    styles[`-size--${size}`],
    borderRadius ? styles["-border"] : "",
    disabled ? styles["-disabled"] : "",
    errorMessage ? styles["-error"] : "",
  ].join(" ");

  const iconInputClasses = icon ? styles[`-icon--${iconPosition}`] : "";
  const colorInputClasses = styles[`-colorInput--${colorInput}`];
  const iconClasses = icon ? styles[`-position--${iconPosition}`] : "";

  const getPasswordIconSrc = () => {
    if (typeInputCheck === "password") {
      return require("@/assets/images/icon/icon-password-hide.svg");
    } else {
      return require("@/assets/images/icon/icon-password-show.svg");
    }
  };

  return (
    <div className={styles.input}>
      <input
        id={idInput ? idInput : undefined}
        ref={inputRef}
        className={`${icon ? styles[`_icon__${iconPosition}`] : ""} ${
          styles[`_colorInput__${colorInput}`]
        } ${inputClasses}`}
        value={modelValue}
        type={typeInputCheck}
        placeholder={placeHolder}
        min={typeInputCheck === "number" ? minValue : undefined}
        max={typeInputCheck === "number" ? maxValue : undefined}
        disabled={disabled}
        autoComplete="off"
        onChange={handleInputChange}
      />
      {icon === "password" && (
        <Image
          className={`${styles.input_icon} ${iconClasses}`}
          src={getPasswordIconSrc()}
          alt={icon}
          role="button"
          width="24"
          height="24"
          onClick={switchVisibility}
        />
      )}
      {icon !== "password" && icon && (
        <Image
          className={`${styles.input_icon} ${iconClasses}`}
          src={require(`@/assets/images/icon/icon-${icon}.svg`)}
          alt={icon}
        />
      )}
      {suffix && <p className={`${styles.input_suffix} ${suffixClasses}`}>{suffix}</p>}
    </div>
  );
};

export default TextInput;
