import React, { FC } from "react";
import styles from "./InputError.module.scss";

interface InputErrorProps {
  value?: string;
}

const InputError: FC<InputErrorProps> = (props) => {
  const { value } = props;

  return <span className={styles.inputError}>{value}</span>;
};

export default InputError;
