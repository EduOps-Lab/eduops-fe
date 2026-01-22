import { create } from "zustand";

import { AuthStore } from "@/types/auth.type";

export const useAuthStore = create<AuthStore>((set) => ({
  isPhoneVerified: false, // 전화번호 인증 완료 여부
  isCodeVerified: false, // 인증 코드 인증 완료 여부

  setPhoneVerified: (verified) => set({ isPhoneVerified: verified }),
  setCodeVerified: (verified) => set({ isCodeVerified: verified }),

  resetAuth: () =>
    set({
      isPhoneVerified: false,
      isCodeVerified: false,
    }),
}));
