"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { authCodeSchema } from "@/validation/auth.validation";
import { useAuthStore } from "@/stores/auth.store";
import { AuthCodeFormData } from "@/types/auth.type";
import { AUTH_CODE_FORM_DEFAULTS } from "@/constants/auth.defaults";
import { verifyAuthCodeAPI } from "@/services/auth.service";

export default function AuthenticationCodeForm() {
  const { isCodeVerified, setAuthCode, setCodeVerified } = useAuthStore();

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

  const mutation = useMutation({
    mutationFn: (code: string) => verifyAuthCodeAPI(code),
    onSuccess: (data) => {
      if (data.success) {
        setCodeVerified(true);
      } else {
        setCodeVerified(false);
        setAuthCode("");
        alert("인증 코드가 올바르지 않습니다.");
      }
    },
    onError: (err) => {
      console.error(err);
      setCodeVerified(false);
      setAuthCode("");
      alert("서버 인증 중 오류가 발생했습니다.");
    },
  });

  const handleVerifyCode = async () => {
    const isValid = await trigger("signupCode");
    if (!isValid) return;

    const signupCode = getValues("signupCode").trim();
    console.log("인증코드 확인:", signupCode);

    // 인증 코드 저장
    setAuthCode(signupCode);

    mutation.mutate(signupCode);
  };

  const isLoading = mutation.isPending;

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
            {...register("signupCode")}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={isLoading || isCodeVerified}
            placeholder="6자리 코드 입력"
            aria-invalid={errors.signupCode ? "true" : "false"}
            aria-describedby={errors.signupCode ? "code-error" : undefined}
          />

          <button
            type="button"
            onClick={handleVerifyCode}
            disabled={isLoading || isCodeVerified}
            className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors
              ${
                isLoading
                  ? "bg-gray-400 text-white cursor-wait"
                  : isCodeVerified
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }`}
            aria-label={
              isLoading
                ? "인증 중..."
                : isCodeVerified
                  ? "인증 완료"
                  : "인증하기"
            }
          >
            {isLoading
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

        {errors.signupCode && (
          <p id="code-error" className="mt-1 text-sm text-red-600">
            {errors.signupCode.message}
          </p>
        )}
      </div>
    </div>
  );
}
