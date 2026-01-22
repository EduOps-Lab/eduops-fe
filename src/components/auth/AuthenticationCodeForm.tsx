"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authCodeSchema } from "@/validation/auth.validation";
import { useAuthStore } from "@/stores/auth.store";
import { AuthCodeFormData } from "@/types/auth.type";
import { AUTH_CODE_FORM_DEFAULTS } from "@/constants/auth.defaults";

export default function AuthenticationCode() {
  const {
    isCodeVerified,
    isVerifyingCode,
    setAuthCode,
    startCodeVerification,
  } = useAuthStore();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AuthCodeFormData>({
    resolver: zodResolver(authCodeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: AUTH_CODE_FORM_DEFAULTS,
  });

  const handleVerifyCode = async () => {
    const isValid = await trigger("authenticationCode");
    if (!isValid) return;

    const codeValue = getValues("authenticationCode");
    console.log("인증코드 확인:", codeValue);

    // 1. 인증 코드 저장
    setAuthCode(codeValue);

    // 2. 서버 검증 시작
    startCodeVerification();
  };

  return (
    <div className="space-y-4">
      {/* 인증 코드 입력 */}
      <div className="space-y-2">
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          인증 코드
        </label>
        <div className="flex gap-2">
          <input
            id="code"
            type="text"
            {...register("authenticationCode")}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={isVerifyingCode || isCodeVerified}
            placeholder="6자리 코드 입력"
            aria-invalid={errors.authenticationCode ? "true" : "false"}
            aria-describedby={
              errors.authenticationCode ? "code-error" : undefined
            }
          />

          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={isVerifyingCode || isCodeVerified}
            className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors
              ${isVerifyingCode ? "bg-gray-400 cursor-wait" : ""} ${isCodeVerified ? "bg-gray-600 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}`}
            aria-label={
              isVerifyingCode
                ? "인증 중..."
                : isCodeVerified
                  ? "인증 완료"
                  : "인증하기"
            }
          >
            {isVerifyingCode
              ? "인증 중..."
              : isCodeVerified
                ? "인증 완료"
                : "인증하기"}
          </button>
        </div>

        {/* 안내 텍스트 */}
        <p className="text-xs text-gray-500">
          * 소속 학원 및 담당 강사 정보가 코드를 통해 자동으로 연결됩니다.
        </p>

        {errors.authenticationCode && (
          <p id="code-error" className="mt-1 text-sm text-red-600">
            {errors.authenticationCode.message}
          </p>
        )}
      </div>
    </div>
  );
}
