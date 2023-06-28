import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styles from "./TextInput.module.scss";
import Image from "next/image";

interface TextInputProps {
  className?: string;
  autoComplete?: string;
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
  emitInputChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  className = "",
  autoComplete = "",
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
  emitInputChange,
}) => {
  const [typeInputCheck, setTypeInputCheck] = useState(typeInput);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    emitInputChange(event.target.value);
  };

  const switchVisibility = () => {
    setTypeInputCheck(typeInputCheck === "password" ? "text" : "password");
  };

  const suffixClasses = suffix ? styles.input_suffix : "";
  const inputClasses = [
    styles[`_borderColor__${borderColor}`],
    styles[`_size__${size}`],
    borderRadius ? styles._border : "",
    disabled ? styles._disabled : "",
    errorMessage ? styles._error : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconInputClasses = icon ? styles[`)_icon__${iconPosition}`] : "";
  const colorInputClasses = styles[`_colorInput__${colorInput}`];
  const iconClasses = icon ? styles[`_position__${iconPosition}`] : "";

  const getPasswordIconSrc = () => {
    if (typeInputCheck === "password") {
      return "/images/icon/icon-password-hide.svg";
    } else {
      return "/images/icon/icon-password-show.svg";
    }
  };

  return (
    <div className={`${className} ${styles.input}`}>
      <input
        id={idInput ? idInput : undefined}
        ref={inputRef}
        className={`${styles.input_field} ${inputClasses} ${iconInputClasses} ${colorInputClasses}`}
        value={modelValue}
        type={typeInputCheck}
        placeholder={placeHolder}
        min={typeInputCheck === "number" ? minValue : undefined}
        max={typeInputCheck === "number" ? maxValue : undefined}
        disabled={disabled}
        autoComplete={autoComplete}
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
        <Image className={`${styles.input_icon} ${iconClasses}`} src={`/images/icon/icon-${icon}.svg`} alt={icon} />
      )}
      {suffix && <p className={`${styles.input_suffix} ${suffixClasses}`}>{suffix}</p>}
    </div>
  );
};

export default TextInput;
