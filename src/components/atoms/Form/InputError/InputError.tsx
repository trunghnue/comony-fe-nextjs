import React, { FC } from "react";
import styles from "./InputError.module.scss";

interface InputErrorProps {
  className?: string;
  value?: string;
}

const InputError: FC<InputErrorProps> = ({ className = "", value = "" }) => {
  return <span className={`${className} ${styles.inputError}`}>{value}</span>;
};

export default InputError;
