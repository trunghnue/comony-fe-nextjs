import { useState, useEffect } from "react";
import InputError from "../InputError/InputError";
import styles from "./TextArea.module.scss";

interface TextAreaProps {
  className?: string;
  disabled?: boolean;
  row?: number;
  col?: number;
  placeholder?: string;
  label?: string;
  modelValue?: string;
  errorMessage?: string;
  isDisplayWordCount?: boolean;
  maxWordCount?: number;
  bgColor?: "gray" | "white" | "inquiryForm";
  borderRadius?: boolean;
  borderColor?: "primary" | "gray" | "white" | "none";
  idInput?: string;
  emitInputChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const [classBorder, setClassBorder] = useState("");
  const valueCount = props.modelValue?.trim().length || 0;

  useEffect(() => {
    const currentCount = onCount(props.modelValue || "");

    if (props.isDisplayWordCount && currentCount > (props.maxWordCount || 0)) {
      setClassBorder("-border");
    } else {
      setClassBorder("");
    }
  }, [props.modelValue, props.isDisplayWordCount, props.maxWordCount]);

  const classes = [
    styles[`_bgColor__${props.bgColor}`],
    props.errorMessage ? styles._border : "",
    styles[`_borderColor__${props.borderColor}`],
  ]
    .filter(Boolean)
    .join(" ");

  const handleAreaInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.emitInputChange(event.target.value);
  };

  const onCount = (value: string) => {
    return value.trim().split(/\s+/).join("").length;
  };

  return (
    <div className={styles.textArea}>
      <div className={styles.textArea_group}>
        <textarea
          id={props.idInput}
          disabled={props.disabled}
          className={`${styles.textArea_item} ${classBorder} ${classes}`}
          value={props.modelValue}
          rows={props.row}
          cols={props.col}
          placeholder={props.placeholder}
          onChange={handleAreaInputChange}
        />
        {props.isDisplayWordCount && (
          <p className={styles.textArea_count}>
            {valueCount}/{props.maxWordCount}
          </p>
        )}
      </div>

      {props.errorMessage && <InputError value={props.errorMessage} />}
    </div>
  );
};

TextArea.defaultProps = {
  className: "",
  disabled: false,
  row: 10,
  col: 150,
  placeholder: "",
  label: "",
  modelValue: "",
  errorMessage: "",
  isDisplayWordCount: false,
  maxWordCount: 100,
  bgColor: "gray",
  borderRadius: true,
  borderColor: "gray",
  idInput: "",
};

export default TextArea;
