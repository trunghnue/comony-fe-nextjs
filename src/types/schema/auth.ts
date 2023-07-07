import { I_Meta } from "./common";

export interface I_LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface I_MsgErrorLoginRequest {
  email: string;
  password: string;
}

export interface I_Login_Response_Data {
  message: string;
  $metadata: I_Meta;
  AuthenticationResult: {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
    NewDeviceMetadata: {
      DeviceKey: string;
      DeviceGroupKey: string;
    };
  };
  ChallengeName: string;
  Session: string;
  ChallengeParameters: object;
}
