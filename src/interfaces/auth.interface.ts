export interface RegistrateUser {
  email: string;
  password: string;
  name: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  reset_token: string;
  new_password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface googleSignIn {
  id_token: string;
}