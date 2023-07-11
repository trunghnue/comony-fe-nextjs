import { $axios } from "@/plugins/axios";
import { I_Response_Type } from "@/types/schema/common";
import { I_User_Info_Response } from "@/types/schema/user";

const resource = "/user";

const UserRepository = () => ({
  userAccount() {
    return $axios.get<I_Response_Type<I_User_Info_Response>>(`${resource}/account`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  },
});

export default UserRepository;
