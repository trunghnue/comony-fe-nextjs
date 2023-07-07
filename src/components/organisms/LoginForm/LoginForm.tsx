import React, { FC, useState, MouseEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import SubmitButton from "@/components/atoms/Button/SubmitButton/SubmitButton";
import FormMessage from "@/components/atoms/Form/FormMessage/FormMessage";
import DividerWithText from "@/components/molecules/DividerWithText/DividerWithText";
import InputFieldSet from "@/components/molecules/Form/InputFieldSet/InputFieldSet";
import { I_LoginRequest, I_MsgErrorLoginRequest } from "@/types/schema/auth";
import { validateRequiredFilled } from "@/utilities/formValidate/validate";
import styles from "./LoginForm.module.scss";
import { useTranslation } from "next-i18next";

interface LoginFormProps {
  isLoading?: boolean;
  serverError?: string;
  emitOnClickSubmit: (formValues: I_LoginRequest) => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { t } = useTranslation(["login", "form"]);
  const [formValues, setFormValues] = useState<I_LoginRequest>({
    email: "",
    password: "",
    remember_me: false, // TODO: BEの処理復活したら戻す
  });

  const [msgError, setMsgError] = useState<I_MsgErrorLoginRequest>({
    email: "",
    password: "",
  });

  const handleInputChange = (value: string, key: string) => {
    setFormValues((prevState) => ({ ...prevState, [key]: value }));
    validateRequiredFilled(value, msgError, key, t);
    setMsgError({ ...msgError });
  };

  const onClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let isPass = true;
    const msgErrorKeys: Array<keyof I_MsgErrorLoginRequest> = Object.keys(msgError) as Array<
      keyof I_MsgErrorLoginRequest
    >;

    for (let i = 0; i < msgErrorKeys.length; i++) {
      if (msgError[msgErrorKeys[i]] !== "") {
        isPass = false;
        break;
      }
    }

    if (isPass) {
      props.emitOnClickSubmit(formValues);
    }
  };

  const onClickSNSLogin = (SNSTypeStr: string) => {
    // Emit the 'onClickSNSLogin' event
  };

  const getInfoLogin = () => {
    // Injected function for Enter keypress handling
  };

  // TODO: Add 'useEffect' or any relevant hooks to call 'getInfoLogin' on formValues change

  return (
    <form className={styles.login} onKeyDown={(event) => event.key !== "Enter"}>
      {props.serverError !== "" && <FormMessage className="is-pc" value={props.serverError} />}
      <DividerWithText className={styles.login_divider} msg={t("login.sns.withSNS")} fontSize="1.2rem" />
      <div className={styles.login_social}>
        <Button
          className={styles.login_social_button}
          label={t("login.sns.withFacebook")}
          borderColor="white"
          bgColor="facebook"
          icon="facebook"
          onClick={() => onClickSNSLogin("facebook")}
        />
        <Button
          className={styles.login_social_button}
          label={t("login.sns.withGoogle")}
          borderColor="gray"
          bgColor="white"
          icon="google"
          onClick={() => onClickSNSLogin("google")}
        />
      </div>
      <DividerWithText className={styles.login_divider} msg={t("login.withEmail")} fontSize="1.2rem" />
      {props.serverError !== "" && <FormMessage className="is-sp" value={props.serverError} />}
      <InputFieldSet
        className={styles.login_input}
        label={t("form.label.email", { ns: "form" }) || ""}
        type="email"
        autocomplete="email"
        modelValue={formValues.email}
        errorMessage={msgError.email}
        placeHolder={t("form.placeHolder.email", { ns: "form" }) || ""}
        onUpdateModelValue={(value) => handleInputChange(value, "email")}
      />
      <InputFieldSet
        icon="password"
        iconPosition="right"
        className={styles.login_input}
        type="password"
        autocomplete="password"
        label={t("form.label.password", { ns: "form" }) || ""}
        modelValue={formValues.password}
        errorMessage={msgError.password}
        placeHolder="・・・・・・・・"
        onUpdateModelValue={(value) => handleInputChange(value, "password")}
      />
      <div className={styles.login_submit}>
        <SubmitButton
          spinner
          spinnerColor="secondary"
          isLoading={props.isLoading}
          className={styles.login_button}
          label={t("login.button")}
          size="medium"
          bgColor="secondary"
          borderColor="secondary"
          rounded
          onClick={onClickSubmit}
        />
      </div>
    </form>
  );
};

LoginForm.defaultProps = {
  isLoading: false,
  serverError: "",
};

export default LoginForm;
