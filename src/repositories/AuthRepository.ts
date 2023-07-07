import { $axios } from "@/plugins/axios";
import { I_LoginRequest, I_Login_Response_Data } from "@/types/schema/auth";
import { I_Response_Type } from "@/types/schema/common";
const resource = "/auth";

const AuthRepository = () => ({
  login(inputData: I_LoginRequest) {
    return $axios.post<I_Response_Type<I_Login_Response_Data>>(`${resource}/login`, {
      ...inputData,
    });
  },
});

export default AuthRepository;
