export interface I_LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface I_MsgErrorLoginRequest {
  email: string;
  password: string;
}
