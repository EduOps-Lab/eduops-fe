import type {
  AuthCodeFormData,
  LoginFormData,
  RegisterFormData,
  SchoolInfoFormData,
} from "@/types/auth.type";

export const LOGIN_FORM_DEFAULTS: LoginFormData = {
  email: "",
  password: "",
  keepLoggedIn: false,
};

export const REGISTER_FORM_DEFAULTS: RegisterFormData = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  agreePrivacy: false,
};

export const AUTH_CODE_FORM_DEFAULTS: AuthCodeFormData = {
  authenticationCode: "",
};

export const SCHOOL_INFO_FORM_DEFAULTS: SchoolInfoFormData = {
  schoolName: "",
  grade: "",
};
