export interface I_ContactRequest {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  department?: string;
  content?: string;
  detail: string;
  optionRadio?: "Individual" | "Corporation";
  recaptchaToken?: string;
}

export interface I_Post_Contact_Response_Data {
  id: number;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  department: string;
  content: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
