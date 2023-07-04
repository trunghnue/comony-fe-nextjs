import React, { FC } from "react";
import InputError from "@/components/atoms/Form/InputError/InputError";
import InputLabel from "@/components/atoms/Form/InputLabel/InputLabel";
import TextInput from "@/components/atoms/Form/TextInput/TextInput";
import styles from "./InputFieldSet.module.scss";

interface InputFieldSetProps {
  className?: string;
  autocomplete?: string;
  borderColor?: "primary" | "gray" | "white" | "none";
  disabled?: boolean;
  errorMessage?: string;
  hasFocus?: boolean;
  icon?: string;
  iconPosition?: "none" | "left" | "right";
  idInput?: string;
  label?: string;
  modelValue?: string;
  placeHolder?: string;
  required?: boolean;
  size?: "small" | "medium" | "large";
  type?: "number" | "text" | "email" | "password";
  value?: string;
  onUpdateModelValue?: (value: string | number | boolean) => void;
}

const InputFieldSet: FC<InputFieldSetProps> = (props) => {
  const handleInputFieldChange = (value: string | number | boolean) => {
    // if (onUpdateModelValue) {
    //   onUpdateModelValue(value);
    // }
  };

  return (
    <div className={`${props.className} ${styles.inputFieldSet}`}>
      {props.label && <InputLabel value={props.label} color="gray" required={props.required} />}
      <TextInput
        hasFocus={props.hasFocus}
        icon={props.icon}
        iconPosition={props.iconPosition}
        size={props.size}
        borderColor={props.borderColor}
        modelValue={props.modelValue}
        placeHolder={props.placeHolder}
        typeInput={props.type}
        disabled={props.disabled}
        errorMessage={props.errorMessage}
        autoComplete={props.autocomplete}
        idInput={props.idInput}
        emitInputChange={handleInputFieldChange}
      />
      {props.errorMessage && <InputError value={props.errorMessage} />}
    </div>
  );
};

InputFieldSet.defaultProps = {
  className: "",
  autocomplete: "",
  borderColor: "gray",
  disabled: false,
  errorMessage: "",
  hasFocus: false,
  icon: "",
  iconPosition: "none",
  idInput: "",
  label: "",
  modelValue: "",
  placeHolder: "",
  required: false,
  size: "medium",
  type: "text",
  value: "",
};

export default InputFieldSet;
