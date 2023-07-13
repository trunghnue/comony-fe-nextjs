import { $axios } from "@/plugins/axios";
import { I_Response_Type } from "@/types/schema/common";
import { I_User_Info_Response } from "@/types/schema/user";

const resource = "/users";

const UserRepository = () => ({
  userAccount(token: string) {
    return $axios.get<I_Response_Type<I_User_Info_Response>>(`${resource}/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });
  },
});

export default UserRepository;
