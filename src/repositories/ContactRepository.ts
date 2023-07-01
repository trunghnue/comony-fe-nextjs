import { I_Response_Type } from "@/types/schema/common";
import { I_ContactRequest, I_Post_Contact_Response_Data } from "@/types/schema/contact";
import { $axios } from "@/plugins/axios";
const resource = "/contacts";

const ContactRepository = () => ({
  contactSend(inputData: I_ContactRequest) {
    return $axios.post<I_Response_Type<I_Post_Contact_Response_Data>>(`${resource}`, {
      ...inputData,
    });
  },
});

export default ContactRepository;
