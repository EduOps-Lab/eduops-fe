"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  registerFormSchema,
  registerRequestSchema,
} from "@/validation/auth.validation";
import { RegisterFormData, RegisterUser, Role } from "@/types/auth.type";
import { useAuthStore, useSchoolStore } from "@/stores/auth.store";
import { REGISTER_FORM_DEFAULTS } from "@/constants/auth.defaults";
import { verifyPhoneAPI } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { phoneNumberFormatter } from "@/utils/phone";

type RegisterFormProps = {
  requireAuthCode?: boolean; // 인증 코드 필요 여부 - 조교
  requireSchoolInfo?: boolean; // 학원 정보 필요 여부 - 학생
  roleType: "EDUCATORS" | "LEARNERS"; // 사용자 타입 (라우팅용: educators, learners)
  userType: Role;
};

export default function RegisterForm({
  requireAuthCode = false,
  requireSchoolInfo = false,
  roleType,
  userType,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const { signup, loading } = useAuth();

  const {
    isPhoneVerified,
    isCodeVerified,
    signupCode,
    setPhoneVerified,
    resetAuth,
  } = useAuthStore();

  const { school, schoolYear, isSchoolInfoValid, resetSchoolInfo } =
    useSchoolStore();

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: REGISTER_FORM_DEFAULTS,
  });

  // 뒤로가기 시 상태 초기화
  useEffect(() => {
    resetAuth();
    resetSchoolInfo();
  }, [resetAuth, resetSchoolInfo]);

  // 전화번호 인증 버튼
  const handleVerifyPhone = async () => {
    const isValidPhoneNumber = await trigger("phoneNumber");
    if (!isValidPhoneNumber) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    const phoneNumber = getValues("phoneNumber");

    try {
      setPhoneLoading(true);
      const res = await verifyPhoneAPI(phoneNumber);

      if (res.success) {
        setPhoneVerified(true);
        alert("전화번호 인증 완료!");
      } else {
        setPhoneVerified(false);
        setValue("phoneNumber", "");
        alert("전화번호 인증에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setPhoneVerified(false);
      setValue("phoneNumber", "");
      alert("인증 중 오류가 발생했습니다.");
    } finally {
      setPhoneLoading(false);
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: RegisterFormData) => {
    if (!isPhoneVerified) {
      setError("phoneNumber", {
        type: "manual",
        message: "연락처 인증을 완료해주세요",
      });
      return;
    }

    // 인증 코드 검증 - 외부 폼
    if (requireAuthCode && !isCodeVerified) {
      alert("인증 코드 검사를 완료해주세요.");
      return;
    }

    // 학교 정보 검증 - 외부 폼
    if (requireSchoolInfo && !isSchoolInfoValid) {
      alert("학교 정보를 모두 입력해주세요.");
      return;
    }

    // 전화 번호 하이픈 포맷 적용
    const formattedPhone = phoneNumberFormatter(data.phoneNumber);

    // passwordConfirm 제거
    const baseData = registerRequestSchema.parse({
      ...data,
      phoneNumber: formattedPhone,
    });

    // 특수 항목 포함
    const submitData: RegisterUser = {
      ...baseData,
      ...(signupCode ? { signupCode } : {}),
      ...(requireSchoolInfo ? { school, schoolYear } : {}),
      userType,
    };

    await signup(submitData);
  };

  const isSubmitDisabled =
    !isValid ||
    loading ||
    !isPhoneVerified ||
    (requireAuthCode && !isCodeVerified) ||
    (requireSchoolInfo && !isSchoolInfoValid);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            이름
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="실명을 입력해주세요"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />

          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            전화번호
          </label>
          <div className="flex gap-2">
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isPhoneVerified || phoneLoading}
              placeholder="010-1234-5678"
              aria-invalid={errors.phoneNumber ? "true" : "false"}
              aria-describedby={
                errors.phoneNumber ? "phoneNumber-error" : undefined
              }
            />

            <button
              type="button"
              onClick={handleVerifyPhone}
              disabled={isPhoneVerified || phoneLoading}
              aria-label={
                isPhoneVerified
                  ? "전화번호 인증 완료"
                  : phoneLoading
                    ? "인증 중..."
                    : "전화번호 인증"
              }
              className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                phoneLoading
                  ? "bg-gray-400 text-white cursor-wait"
                  : isPhoneVerified
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {phoneLoading
                ? "인증 중..."
                : isPhoneVerified
                  ? "인증 완료"
                  : "인증 하기"}
            </button>
          </div>

          {errors.phoneNumber && (
            <p id="phoneNumber-error" className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="example@email.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />

          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                {...register("passwordConfirm")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                placeholder="••••••••"
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                aria-describedby={
                  errors.passwordConfirm ? "passwordConfirm-error" : undefined
                }
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={
                  showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"
                }
              >
                {showPasswordConfirm ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.passwordConfirm && (
              <p
                id="passwordConfirm-error"
                className="mt-1 text-sm text-red-600"
              >
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <input
              id="agreePrivacy"
              type="checkbox"
              {...register("agreePrivacy")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              aria-invalid={errors.agreePrivacy ? "true" : "false"}
              aria-describedby={
                errors.agreePrivacy ? "agreePrivacy-error" : undefined
              }
            />
            <label
              htmlFor="agreePrivacy"
              className="ml-2 text-sm text-gray-700"
            >
              개인정보 처리방침에 동의합니다
            </label>
          </div>

          {errors.agreePrivacy && (
            <p id="agreePrivacy-error" className="mt-1 text-sm text-red-600">
              {errors.agreePrivacy.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || isSubmitDisabled}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? "bg-gray-400 text-white cursor-wait"
              : isSubmitDisabled
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>

      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600">이미 계정이 있으신가요?</p>
        <Link
          href={
            roleType === "EDUCATORS" ? "/educators/login" : "/learners/login"
          }
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
