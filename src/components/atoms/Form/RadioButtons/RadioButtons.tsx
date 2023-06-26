import React, { FC, ChangeEvent } from "react";
import styles from "./RadioButtons.module.scss";
import InputError from "../InputError/InputError";

interface RadioElement {
  id: string;
  label: string;
  subLabel?: string;
  value: string;
}

interface RadioButtonsProps {
  isVerticalItem?: boolean;
  InputError?: string;
  tableCheckbox?: boolean;
  autoSelect?: boolean;
  errorMessage?: string;
  modelValue: string;
  disabled?: boolean;
  modelName?: string;
  type?: "default" | "privacy";
  labelColor?: "black" | "white" | "gray";
  dotColor?: "blue" | "yellow";
  radioButtonsData: RadioElement[];
  handleEmitButtonRadio: (event?: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtons: FC<RadioButtonsProps> = ({
  isVerticalItem = false,
  errorMessage = "",
  modelValue,
  radioButtonsData,
  disabled = false,
  tableCheckbox = false,
  autoSelect = false,
  type = "default",
  dotColor = "blue",
  labelColor = "black",
  handleEmitButtonRadio,
}) => {
  const classes = [styles[`_type__${type}`], styles[`_labelColor__${labelColor}`], styles[`_dotColor__${dotColor}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${styles.radioButton} ${classes}`}>
      {radioButtonsData.map((item) => (
        <div key={item.id} className={`${styles.radioButton_group} ${isVerticalItem ? styles._vertical : ""}`}>
          <input
            id={item.id}
            disabled={disabled}
            className={styles.radio}
            type="radio"
            value={item.value}
            checked={item.value == modelValue}
            onChange={handleEmitButtonRadio}
          />
          {isVerticalItem ? (
            <label className={styles.verticalItem} htmlFor={item.id}>
              <span className={styles.label} />
              <span className={styles.label_text}>
                <span className={styles.label_mainText}>{item.label}</span>
                <span className={styles.label_subText}>{item.subLabel}</span>
              </span>
            </label>
          ) : (
            <label className={styles.label} htmlFor={item.id}>
              <span className={styles.label_text}>{item.label}</span>
            </label>
          )}
          {errorMessage && <InputError value={errorMessage} />}
          <br />
          {/* Render slot */}
          {tableCheckbox && item.id !== radioButtonsData.length.toString() && <hr className={styles.line} />}
        </div>
      ))}
      {!autoSelect && <InputError value={errorMessage} />}
    </div>
  );
};

export default RadioButtons;
