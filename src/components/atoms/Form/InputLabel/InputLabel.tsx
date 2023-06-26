import React, { FC } from "react";
import styles from "./InputLabel.module.scss";
import { useTranslation } from "next-i18next";

interface InputLabelProps {
  value?: string;
  color?: "black" | "gray" | "label" | "white";
  colorRequired?: "black" | "white" | "notice";
  size?: "small" | "medium" | "large";
  required?: boolean;
  tagRequired?: boolean;
}

const InputLabel: FC<InputLabelProps> = ({
  value = "",
  color = "black",
  colorRequired = "notice",
  size = "medium",
  required = false,
  tagRequired = false,
}) => {
  const labelClasses = `${styles.label} ${styles[`_color__${color}`]} ${styles[`_size__${size}`]}`;
  const requiredClasses = `${styles.label_required} ${styles[`_colorRequired__${colorRequired}`]}`;
  const { t } = useTranslation("form");

  return (
    <label className={`${labelClasses} ${styles.classes}`}>
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
