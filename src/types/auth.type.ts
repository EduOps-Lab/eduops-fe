import { z } from "zod";

import {
  loginSchema,
  registerSchema,
  authCodeSchema,
} from "@/validation/auth.validation";

// 역할 타입
export type EducatorRole = "instructor" | "assistant";
export type LearnerRole = "student" | "parent";

// 폼 데이터 타입
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthCodeFormData = z.infer<typeof authCodeSchema>;

// 회원가입 전송 데이터 타입
export type RegisterUser = RegisterFormData & { authenticationCode?: string };

// store 인증 상태 타입
export type AuthStore = {
  // 전화번호 인증
  isPhoneVerified: boolean;

  // 인증 코드
  authenticationCode?: string; // 입력값
  isVerifyingCode: boolean; // 서버 검증 중
  isCodeVerified: boolean; // 서버 검증 성공 여부

  // 상태 업데이트 함수
  setPhoneVerified: (verified: boolean) => void;
  setAuthCode: (code: string) => void; // 인증코드 저장
  setVerifyingCode: (verifying: boolean) => void; // 서버 검증 중 상태
  setCodeVerified: (verified: boolean) => void; // 서버 검증 성공 여부

  resetAuth: () => void;
};
