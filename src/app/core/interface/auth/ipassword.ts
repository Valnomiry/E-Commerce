export interface IPassword extends IForgetPassword {
  newPassword: string;
}
export interface IForgetPassword {
  email: string;
}
export interface IResetPassword {
  resetCode: string;
}
