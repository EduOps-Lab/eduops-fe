import { create } from "zustand";

import { AuthStore } from "@/types/auth.type";

export const useAuthStore = create<AuthStore>((set) => ({
  isPhoneVerified: false, // 전화번호 인증 완료 여부
  authenticationCode: "", // 인증 코드 입력값 -> 회원가입 데이터 객체에 포함시키기 위함
  isVerifyingCode: false, // 인증 코드 서버 검증 중
  isCodeVerified: false, // 인증 코드 서버 검증 완료 여부

  setPhoneVerified: (verified) => set({ isPhoneVerified: verified }),
  setAuthCode: (code) => set({ authenticationCode: code }),
  setVerifyingCode: (verifying) => set({ isVerifyingCode: verifying }),
  setCodeVerified: (verified) => set({ isCodeVerified: verified }),

  resetAuth: () =>
    set({
      isPhoneVerified: false,
      authenticationCode: "",
      isVerifyingCode: false,
      isCodeVerified: false,
    }),
}));
