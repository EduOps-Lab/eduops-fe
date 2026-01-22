import { create } from "zustand";

import { AuthStore } from "@/types/auth.type";

export const useAuthStore = create<AuthStore>((set, get) => ({
  isPhoneVerified: false, // 전화번호 인증 완료 여부
  authenticationCode: "", // 인증 코드 입력값
  isVerifyingCode: false, // 인증 코드 서버 검증 중
  isCodeVerified: false, // 인증 코드 서버 검증 완료 여부

  // 전화번호 인증 여부
  setPhoneVerified: (verified) => set({ isPhoneVerified: verified }),

  // 인증 코드 입력 단계
  setAuthCode: (code) => set({ authenticationCode: code }),

  // 인증 코드 서버 검증 시작
  startCodeVerification: async () => {
    const code = get().authenticationCode;

    set({ isVerifyingCode: true });

    try {
      // TODO: API 호출
      // const res = await verifyAuthCodeAPI(code);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 테스트용

      const isSuccess = code === "123456"; // mock

      if (!isSuccess) {
        throw new Error("인증 코드가 올바르지 않습니다.");
      }

      // 인증 성공
      set({
        isCodeVerified: true,
        isVerifyingCode: false,
      });
    } catch (error) {
      console.error(error);
      alert("인증 코드가 올바르지 않습니다.");

      // 인증 실패
      set({
        isCodeVerified: false,
        isVerifyingCode: false,
      });
    }
  },

  resetAuth: () =>
    set({
      isPhoneVerified: false,
      authenticationCode: "",
      isVerifyingCode: false,
      isCodeVerified: false,
    }),
}));
