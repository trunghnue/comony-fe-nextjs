import React, { FC } from "react";
import styles from "./InputLabel.module.scss";
import { useTranslation } from "next-i18next";

interface InputLabelProps {
  className?: string;
  value?: string;
  color?: "black" | "gray" | "label" | "white";
  colorRequired?: "black" | "white" | "notice";
  size?: "small" | "medium" | "large";
  required?: boolean;
  tagRequired?: boolean;
  forr?: string;
}

const InputLabel: FC<InputLabelProps> = ({
  className = "",
  value = "",
  color = "black",
  colorRequired = "notice",
  size = "medium",
  required = false,
  tagRequired = false,
  forr = "",
}) => {
  const labelClasses = `${styles.label} ${styles[`_color__${color}`]} ${styles[`_size__${size}`]}`;
  const requiredClasses = `${styles.label_required} ${styles[`_colorRequired__${colorRequired}`]}`;
  const { t } = useTranslation("form");

  return (
    <label className={`${className} ${labelClasses} ${styles.classes}`} htmlFor={forr}>
      {value}
      {required && (
        <>
          {tagRequired ? (
            <label className={styles.label_required_tag}>{t("form.label.required")}</label>
          ) : (
            <span className={`${requiredClasses} ${styles.label_required}`}>*</span>
          )}
        </>
      )}
    </label>
  );
};

export default InputLabel;
