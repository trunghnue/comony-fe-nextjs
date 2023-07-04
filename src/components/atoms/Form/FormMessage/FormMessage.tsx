import React, { FC } from "react";
import styles from "./FormMessage.module.scss";

interface FormMessageProps {
  className?: string;
  value?: string;
  type?: "warning" | "success";
}

const FormMessage: FC<FormMessageProps> = (props) => {
  return (
    <div className={`${props.className} ${styles.formMessage} ${styles[`_type__${props.type}`]}`}>{props.value}</div>
  );
};

FormMessage.defaultProps = {
  className: "",
  value: "",
  type: "warning",
};

export default FormMessage;
