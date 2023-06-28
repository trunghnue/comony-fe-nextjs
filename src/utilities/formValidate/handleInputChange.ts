import { I_formValuesType } from "@/types/schema/form";
import {
  validateRequiredFilled,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateName,
  validateCompanyName,
  validateUrl,
  validateUserCount,
  validateIntroduction,
} from "./validate";

const urlFormFieldName: string[] = [
  "inquiryForm",
  "websiteUrl",
  "companyUrl",
  "contactUrl",
  "facebookUrl",
  "twitterUrl",
  "instagramUrl",
  "embedUrl",
  "url",
];

export function handleInputChangeComposables(
  formValues: I_formValuesType,
  errorValues: Object,
  value: string,
  field: string,
  t: any
): void {
  formValues[field] = value;

  const criteriaValidate: any = {
    companyName: () => validateCompanyName(formValues[field], errorValues, field, t),
    email: () => validateEmail(formValues[field], errorValues, field, t),
    introduction: () => validateIntroduction(formValues[field], errorValues, field, t),
    name: () => validateName(formValues[field], errorValues, field, t),
    password: () => validatePassword(formValues[field], errorValues, field, t),
    passwordConfirm: () => validatePasswordConfirm(formValues[field], errorValues, field, formValues.password, t),
    phone: () => validatePhone(formValues[field], errorValues, field, t),
    requiredFilled: () => validateRequiredFilled(formValues[field], errorValues, field, t),
    usersCount: () => validateUserCount(formValues[field], errorValues, field, t),
  };

  if (urlFormFieldName.includes(field)) {
    // validate form url
    validateUrl(formValues[field], errorValues, field, t);
  } else {
    // validate follow criteria
    criteriaValidate[field] === undefined
      ? validateRequiredFilled(formValues[field], errorValues, field, t)
      : criteriaValidate[field]();
  }
}
