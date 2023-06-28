/// app any type is Vue but cannot use with i18
export function validateName(data: string, errorData: any, field: string = "name", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = t("form.errorMessage.name");
    } else if (data.trim().length > 255) {
      errorData[field] = t("form.errorMessage.nameLimit");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateCompanyName(data: string, errorData: any, field: string = "companyName", t: any): void {
  console.log("🚀 ~ file: validate.ts:15 ~ data:", data);
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = t("form.errorMessage.company");
    } else if (data.trim().length > 255) {
      errorData[field] = t("form.errorMessage.companyLimit");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateIntroduction(data: string, errorData: any, field: string = "introduction", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length > 255) {
      errorData[field] = t("form.errorMessage.introductionLimit");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateUrl(data: string, errorData: any, field: string = "companyUrl", t: any): void {
  const lc = data.toLowerCase().trim();
  const isValidate = lc.substring(0, 8) === "https://" || lc.substring(0, 7) === "http://";

  if (Object.keys(errorData).includes(field)) {
    // url form not required, but it field, validate it
    if (!isValidate || data.trim().length === 0) {
      errorData[field] = t("form.errorMessage.url");
    } else if (data.trim().length > 255) {
      errorData[field] = t("form.errorMessage.urlLimit");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateUserCount(data: string, errorData: any, field: string = "usersCount", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = t("form.errorMessage.usersCount");
    } else if (/\D/.test(data.trim())) {
      errorData[field] = t("form.errorMessage.usersCountNumber");
    } else if (Number(data.trim()) > 1000) {
      errorData[field] = t("form.errorMessage.usersCountMaxNumber");
    } else {
      errorData[field] = "";
    }
  }
}

export function validatePassword(data: string, errorData: any, field: string = "password", t: any): void {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9])/);
  const regResult = regex.test(data);

  if (Object.keys(errorData).includes(field)) {
    if (regResult && data.trim().length >= 8) {
      errorData[field] = "";
    } else {
      errorData[field] = t("form.errorMessage.passwordInvalid");
    }
  }
}

export function validatePasswordConfirm(
  data: string,
  errorData: any,
  field: string = "passwordConfirm",
  compareValue: string,
  t: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data === compareValue) {
      errorData[field] = "";
    } else {
      errorData[field] = t("form.errorMessage.passwordConfirm");
    }
  }
}

export function validateEmail(data: string, errorData: any, field: string = "email", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (/^[A-Za-z0-9]{1}[A-Za-z0-9_.+-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(data)) {
      errorData[field] = "";
    } else if (data.trim().length === 0) {
      errorData[field] = t("form.errorMessage.emailRequired");
    } else {
      errorData[field] = t("form.errorMessage.emailInvalid");
    }
  }
}

export function validateEmailConfirm(
  data: string,
  errorData: any,
  field: string = "emailConfirm",
  conpareValue: string,
  t: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data === conpareValue) {
      errorData[field] = "";
    } else {
      errorData[field] = t("form.errorMessage.emailConfirm");
    }
  }
}

export function validateDuplicate(list: any, tag: string, errorData: any, field: string = "duplicate", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (list.some((item: any) => item.value === tag)) {
      errorData[field] = t("form.errorMessage.emailDuplicated");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateLimit(count: any, limit: number, errorData: any, field: string = "limit", t: any): void {
  if (Object.keys(errorData).includes(field)) {
    if (limit <= count) {
      field !== "limit"
        ? (errorData[field] = t(`form.errorMessage.${field}Limit`))
        : (errorData[field] = t("form.errorMessage.emailLimit"));
    } else {
      errorData[field] = "";
    }
  }
}

export function validatePhone(data: string, errorData: any, field: string = "phone", t: any): void {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp(/^[0-9!-/:-@¥[-`{-~]*$/);
  const regResult = regex.test(data);

  if (Object.keys(errorData).includes(field)) {
    if (
      (data.toString().trim().length > 0 && data.toString().trim().length < 9) ||
      data.toString().trim().length > 11 ||
      !regResult
    ) {
      errorData[field] = t("form.errorMessage.phoneInvalid");
    } else if (data.toString().trim().length === 0) {
      errorData[field] = t("form.errorMessage.phoneRequired");
    } else {
      errorData[field] = "";
    }
  }
}

export function validateRequiredFilled(
  data: string | number,
  errorData: any,
  field: string,
  t: any,
  baseLocale: string = "form.errorMessage"
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.toString().trim().length === 0) {
      const errorValue = t(`${baseLocale}.${field}`);

      if (errorValue.includes(`.${field}`)) {
        errorData[field] = t("form.errorMessage.alert");
      } else if (errorValue) {
        errorData[field] = errorValue;
      }
    } else {
      errorData[field] = "";
    }
  }
}
