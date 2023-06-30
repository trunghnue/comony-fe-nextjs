import React, { useState } from "react";
import styles from "./InquiryForm.module.scss";
import HeadingSet from "@/components/molecules/HeadingSet/HeadingSet";
import { useTranslation } from "next-i18next";
import InputLabel from "@/components/atoms/Form/InputLabel/InputLabel";
import RadioButtons from "@/components/atoms/Form/RadioButtons/RadioButtons";
import TextInput from "@/components/atoms/Form/TextInput/TextInput";
import { useFormValuesInit } from "@/composables/useFormValueInit";
import InputError from "@/components/atoms/Form/InputError/InputError";
import TextArea from "@/components/atoms/Form/TextArea/TextArea";
import CTAButton from "@/components/atoms/Button/CTAButton/CTAButton";
import { handleInputChangeComposables } from "@/utilities/formValidate/handleInputChange";
import { I_ContactRequest } from "@/types/schema/contact";
import { repositories } from "@/repositories/factories/RepositoryFactory";
import LinkText from "@/components/atoms/LinkText/LinkText";

interface InquiryFormProps {
  className?: string;
}

enum Inquiry_Details_Radio_Buttons_Data {
  INDIVIDUAL = "0",
  CORPORATION = "1",
}

const InquiryForm: React.FC<InquiryFormProps> = ({ className = "" }) => {
  const { t } = useTranslation(["form", "login"]);
  const inquiryDetailsRadioButtonsData = [
    {
      id: Inquiry_Details_Radio_Buttons_Data.INDIVIDUAL,
      label: t("formContact.options.individual"),
      value: t("formContact.options.individual"),
    },
    {
      id: Inquiry_Details_Radio_Buttons_Data.CORPORATION,
      label: t("formContact.options.corporation"),
      value: t("formContact.options.corporation"),
    },
  ];
  const handleInputFieldSetChange = (value: string, fieldName: string) => {
    setFormValues({ ...formValues, [fieldName]: value });
    handleInputChangeComposables(formValues, msgError, value, fieldName, t);
  };
  // ------------------ Call API and increase Step if success
  const [inquiryFormContactStep, setInquiryFormContactStep] = useState(0);
  const { formValues, setFormValues, msgError, setMsgError, isDisableBtnWithCondition } = useFormValuesInit({
    companyName: "",
    detail: "",
    email: "",
    name: "",
    optionRadio: t("formContact.options.individual"),
    phone: "",
  });
  formValues.content = t("fixedRequest.contactDetailsRadioOptions");
  //check all form is filled
  const isDisableBtn =
    formValues.optionRadio === t("formContact.options.individual")
      ? isDisableBtnWithCondition(formValues, ["name", "email", "detail"])
      : isDisableBtnWithCondition(formValues, ["name", "email", "detail", "phone", "companyName"]);
  // run all input to force show error if input didnt filled
  const handleSubmit = () => {
    if (isDisableBtn) {
      Object.keys(formValues).forEach((field: string) => {
        handleInputChangeComposables(formValues, msgError, formValues[field], field, t);
      });
      setMsgError({ ...msgError });
      return;
    }
    handleSendContact(formValues as I_ContactRequest);
  };
  const handleSendContact = async (formValues: I_ContactRequest) => {
    // await getRecaptchaToken()
    // formValues.recaptchaToken = recaptchaToken.value

    const formValuesIndividual = { ...formValues, companyName: "", phone: "" };

    console.log("🚀 ~ file: InquiryForm.tsx:74 ~ formValuesIndividual:", formValuesIndividual);
    return await repositories
      .contact()
      .contactSend(formValues.optionRadio === "Individual" ? formValuesIndividual : formValues)
      .then(() => {
        setInquiryFormContactStep((a) => a + 1);
        console.log("🚀 ~ file: InquiryForm.tsx:80 ~ axios api done");
      })
      .catch((error: any) => {
        console.log("🚀 ~ file: InquiryForm.tsx:81 ~ error:", error);
        // const errorKeyCode = error.response?.data?.response.key

        // setError(errorKeyCode, '')
      });
  };

  return (
    <section className={`${styles.inquiryFormContainer} ${className}`}>
      {inquiryFormContactStep === 0 ? (
        <div className={styles.inquiryForm}>
          <HeadingSet
            className={styles.inquiryForm_heading}
            level="2"
            noteSize="medium"
            labelColor="white"
            fontWeight="900"
            headings={[{ text: t("formContact.inquiryFormHeading"), color: "white", spBreak: false }]}
            note={t("formContact.inquiryFormSubHeading") || ""}
            align="left"
          />

          {/* Radio Buttons */}
          <div className={styles.inquiryForm_form}>
            <InputLabel
              className={styles.inquiryForm_form_label}
              color="white"
              colorRequired="white"
              value={t("formContact.label.option") || ""}
              required
              tagRequired
              size="large"
            />
            <RadioButtons
              className={styles.contactForm_input_radio}
              modelValue={formValues.optionRadio}
              radioButtonsData={inquiryDetailsRadioButtonsData}
              labelColor="white"
              dotColor="yellow"
              emitRadioChange={(value) => handleInputFieldSetChange(value, "optionRadio")}
            />
          </div>

          {/* Name */}
          <div className={styles.inquiryForm_form}>
            <InputLabel
              className={styles.inquiryForm_form_label}
              forr="name"
              color="white"
              colorRequired="white"
              value={t("formContact.label.name") || ""}
              required
              tagRequired
              size="large"
            />
            <TextInput
              className={styles.inquiryForm_form_input}
              idInput="name"
              colorInput="white"
              modelValue={formValues.name}
              errorMessage={msgError.name}
              typeInput="text"
              borderRadius={false}
              borderColor="none"
              autoComplete="name"
              emitInputChange={(value) => handleInputFieldSetChange(value, "name")}
            />
            <InputError className={styles.inquiryForm_input_error} value={msgError.name} />
          </div>

          {/* Company Name */}
          <div
            className={`${styles.inquiryForm_form} ${
              formValues.optionRadio === t("formContact.options.individual") ? styles.hidden : ""
            }`}
          >
            <InputLabel
              className={styles.inquiryForm_form_label}
              forr="companyName"
              color="white"
              colorRequired="white"
              value={t("formContact.label.companyNameAndDepartment") || ""}
              required
              tagRequired
              size="large"
            />
            <TextInput
              className={styles.inquiryForm_form_input}
              idInput="companyName"
              colorInput="white"
              modelValue={formValues.companyName}
              errorMessage={msgError.companyName}
              typeInput="text"
              borderRadius={false}
              borderColor="none"
              autoComplete="organization"
              emitInputChange={(value) => handleInputFieldSetChange(value, "companyName")}
            />
            <InputError className={styles.inquiryForm_form_input_error} value={msgError.companyName} />
          </div>

          {/* Email */}
          <div className={styles.inquiryForm_form}>
            <InputLabel
              className={styles.inquiryForm_form_label}
              forr="email"
              color="white"
              colorRequired="white"
              value={t("formContact.label.mailAddress") || ""}
              required
              tagRequired
              size="large"
            />
            <TextInput
              className={styles.inquiryForm_form_input}
              idInput="email"
              colorInput="white"
              modelValue={formValues.email}
              errorMessage={msgError.email}
              typeInput="email"
              borderRadius={false}
              borderColor="none"
              autoComplete="email"
              emitInputChange={(value) => handleInputFieldSetChange(value, "email")}
            />
            <InputError className={styles.inquiryForm_input_error} value={msgError.email} />
          </div>

          {/* Phone Number */}
          <div
            className={`${styles.inquiryForm_form} ${
              formValues.optionRadio === t("formContact.options.individual") ? styles.hidden : ""
            }`}
          >
            <InputLabel
              className={styles.inquiryForm_form_label}
              forr="phone"
              color="white"
              colorRequired="white"
              value={t("formContact.label.phoneNumber") || ""}
              required
              tagRequired
              size="large"
            />
            <TextInput
              className={styles.inquiryForm_form_input}
              idInput="phone"
              colorInput="white"
              modelValue={formValues.phone}
              errorMessage={msgError.phone}
              borderRadius={false}
              borderColor="none"
              autoComplete="tel"
              emitInputChange={(value) => handleInputFieldSetChange(value, "phone")}
            />
            <InputError className={styles.inquiryForm_form_input_error} value={msgError.phone} />
          </div>

          {/* Contact */}
          <div className={`${styles.inquiryForm_form} ${styles.inquiryForm_form_textArea}`}>
            <InputLabel
              className={styles.inquiryForm_form_label}
              forr="contact"
              color="white"
              colorRequired="white"
              value={t("formContact.label.contactDetails") || ""}
              required
              tagRequired
              size="large"
            />
            <TextArea
              className={styles.inquiryForm_form_input}
              idInput="contact"
              modelValue={formValues.detail}
              errorMessage={msgError.detail}
              borderRadius={false}
              bgColor="inquiryForm"
              borderColor="none"
              row={3}
              col={140}
              emitInputChange={(value) => handleInputFieldSetChange(value, "detail")}
            />
          </div>
          <span className={styles.inquiryForm_form_note}>{t("formContact.note")}</span>

          <CTAButton
            className={styles.inquiryForm_form_button}
            type="outline"
            size="medium"
            label={t("formContact.buttonMsg.send") || ""}
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <div className={`${styles.inquiryForm} ${styles.inquiryForm_step2}`}>
          <HeadingSet
            level="1"
            note-size="large"
            label-color="white"
            className={styles.inquiryForm_step2_heading}
            font-weight="900"
            headings={[{ text: t("formContact.inquiryResponse.heading"), color: "white", spBreak: false }]}
            note={t("formContact.inquiryResponse.subHeading") || ""}
            align="left"
          />
          <br />
          <div className={styles.inquiryForm_step2_card}>
            <p dangerouslySetInnerHTML={{ __html: t("formContact.message.success") }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <LinkText color="white" link="/" value={t("bktohome.home", { ns: "login" })} />
          </div>
        </div>
      )}
    </section>
  );
};

export default InquiryForm;
