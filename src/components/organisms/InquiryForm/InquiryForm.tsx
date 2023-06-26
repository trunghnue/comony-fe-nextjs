import React, { ChangeEvent, useState } from "react";
import styles from "./InquiryForm.module.scss";
import HeadingSet from "@/components/molecules/HeadingSet/HeadingSet";
import { useTranslation } from "next-i18next";
import InputLabel from "@/components/atoms/Form/InputLabel/InputLabel";
import RadioButtons from "@/components/atoms/Form/RadioButtons/RadioButtons";

interface InquiryFormProps {
  className?: string;
}

enum Inquiry_Details_Radio_Buttons_Data {
  INDIVIDUAL = "0",
  CORPORATION = "1",
}

const InquiryForm: React.FC<InquiryFormProps> = ({ className = "" }) => {
  const { t } = useTranslation("form");
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
  const [radioValue, setRadioValue] = useState(inquiryDetailsRadioButtonsData[0].value);
  const handleEmitButtonRadio = (event?: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      console.log("🚀 ~ file: InquiryForm.tsx:32 ~ event:", event.target.value);
      setRadioValue(event.target.value);
    }
  };

  return (
    <section className={`${styles.inquiryFormContainer} ${className}`}>
      <div className={styles.inquiryForm}>
        <HeadingSet
          level="2"
          noteSize="medium"
          labelColor="white"
          fontWeight="900"
          headings={[{ text: t("formContact.inquiryFormHeading"), color: "white", spBreak: false }]}
          note={t("formContact.inquiryFormSubHeading") || ""}
          align="left"
        />
      </div>
      <div className={styles.inquiryForm_form}>
        <InputLabel
          color="white"
          colorRequired="white"
          value={t("formContact.label.option") || ""}
          required
          tagRequired
          size="large"
        />
        <RadioButtons
          modelValue={radioValue}
          radioButtonsData={inquiryDetailsRadioButtonsData}
          labelColor="white"
          dotColor="yellow"
          handleEmitButtonRadio={handleEmitButtonRadio}
        />
      </div>
    </section>
  );
};

export default InquiryForm;
