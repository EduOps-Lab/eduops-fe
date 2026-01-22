import { z } from "zod";

import {
  loginSchema,
  registerSchema,
  authCodeSchema,
} from "@/validation/auth.validation";

// 폼 데이터 타입
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthCodeFormData = z.infer<typeof authCodeSchema>;

// 역할 타입
export type EducatorRole = "instructor" | "assistant";
export type LearnerRole = "student" | "parent";

// 로그인 유저
export type LoginUser<R> = {
  id: string;
  email: string;
  name: string;
  role: R;
};

export type EducatorUser = LoginUser<EducatorRole>;
export type LearnerUser = LoginUser<LearnerRole>;

// store 인증 상태 타입
export type AuthStore = {
  // 전화번호 인증
  isPhoneVerified: boolean;

  // 인증 코드
  authenticationCode: string; // 입력값
  isVerifyingCode: boolean; // 서버 검증 중
  isCodeVerified: boolean; // 검증 완료 여부

  setPhoneVerified: (verified: boolean) => void;
  setAuthCode: (code: string) => void;
  startCodeVerification: () => void;

  resetAuth: () => void;
};
