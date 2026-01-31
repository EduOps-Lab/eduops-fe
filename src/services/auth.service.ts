import {
  LoginUser,
  SignupAssistantUser,
  SignupInstructorUser,
  SignupParentUser,
  SignupStudentUser,
} from "@/types/auth.type";
import {
  GENERATED_AUTH_CODES,
  SUBSCRIBED_PHONE_NUMBERS,
} from "@/data/auth-form.mock";

import { axiosClient, axiosClientSVC } from "./axiosClient";

// 인증코드 검증 API
export const verifyAuthCodeAPI = async (signupCode: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("인증코드 검증 요청:", signupCode);

  // 서버에서 생성된 인증번호와 일치하면
  if (GENERATED_AUTH_CODES.includes(signupCode)) {
    return { success: true, message: "인증번호 매칭 완료!" };
  } else {
    return { success: false, message: "인증번호가 일치하지 않습니다." };
  }
};

// 전화번호 인증 API
export const verifyPhoneAPI = async (phoneNumber: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("전화번호 인증 요청:", phoneNumber);

  // 이미 가입된 전화번호면 인증 실패
  if (SUBSCRIBED_PHONE_NUMBERS.includes(phoneNumber)) {
    return { success: false, message: "이미 가입된 번호입니다." };
  } else {
    // 가입되지 않은 전화번호면 인증 성공
    return { success: true, message: "전화번호 인증 완료!" };
  }
};

// 회원가입 API --------------------
export const signupInstructorAPI = (data: SignupInstructorUser) => {
  return axiosClient.post("/auth/instructor/signup", data);
};

export const signupAssistantAPI = (data: SignupAssistantUser) => {
  return axiosClient.post("/auth/assistant/signup", data);
};

export const signupStudentAPI = (data: SignupStudentUser) => {
  return axiosClientSVC.post("/auth/student/signup", data);
};

export const signupParentAPI = (data: SignupParentUser) => {
  return axiosClientSVC.post("/auth/parent/signup", data);
};

// 로그인 API ---------------------
export const signinAPI = (data: LoginUser, role: "MGMT" | "SVC" = "MGMT") => {
  const client = role === "MGMT" ? axiosClient : axiosClientSVC;
  return client.post("/auth/signin", data);
};
// 로그아웃 API ---------------------
export const signoutAPI = (role: "MGMT" | "SVC" = "MGMT") => {
  const client = role === "MGMT" ? axiosClient : axiosClientSVC;
  return client.post("/auth/signout");
};
// 세션 조회 API ---------------------
export const getSessionAPI = (role: "MGMT" | "SVC" = "MGMT") => {
  const client = role === "MGMT" ? axiosClient : axiosClientSVC;
  return client.get("/auth/session");
};
