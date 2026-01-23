"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { registerSchema } from "@/validation/auth.validation";
import { RegisterFormData, RegisterUser, Role } from "@/types/auth.type";
import { useAuthStore, useSchoolStore } from "@/stores/auth.store";
import { REGISTER_FORM_DEFAULTS } from "@/constants/auth.defaults";
import { registerAPI, verifyPhoneAPI } from "@/services/auth.service";

type RegisterFormProps = {
  requireAuthCode?: boolean; // 인증 코드 필요 여부 - 조교
  requireSchoolInfo?: boolean; // 학원 정보 필요 여부 - 학생
  userType: "educators" | "learners"; // 사용자 타입 (라우팅용: educators, learners)
  role: Role;
};

export default function RegisterForm({
  requireAuthCode = false,
  requireSchoolInfo = false,
  userType,
  role,
}: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    isPhoneVerified,
    isCodeVerified,
    authenticationCode,
    setPhoneVerified,
    resetAuth,
  } = useAuthStore();

  const { schoolName, grade, isSchoolInfoValid, resetSchoolInfo } =
    useSchoolStore();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: REGISTER_FORM_DEFAULTS,
  });

  // 뒤로가기 시 인증 상태 초기화
  useEffect(() => {
    resetAuth();
    resetSchoolInfo();
  }, [resetAuth, resetSchoolInfo]);

  // 전화번호 인증 mutation
  const phoneMutation = useMutation({
    mutationFn: (phone: string) => verifyPhoneAPI(phone),
    onSuccess: (data) => {
      if (data.success) {
        setPhoneVerified(true);
        clearErrors("phone");
      } else {
        alert("전화번호가 올바르지 않습니다.");
      }
    },
    onError: (err) => {
      console.error(err);
      alert("전화번호 인증 중 오류가 발생했습니다.");
    },
  });

  // 전화번호 인증 버튼 클릭 시 실행
  const handleVerifyPhone = async () => {
    const isValidPhone = await trigger("phone");
    if (!isValidPhone) return;

    console.log("연락처 인증");

    const phoneValue = getValues("phone");
    phoneMutation.mutate(phoneValue);
  };

  // 회원가입 mutation
  const registerMutation = useMutation({
    mutationFn: (formData: RegisterUser) => registerAPI(formData),
    onSuccess: (data) => {
      if (data.success) {
        alert("회원가입 완료!");
        resetAuth(); // 인증 상태 초기화
        resetSchoolInfo(); // 학교 정보 초기화

        // userType에 따라 로그인 페이지 분기
        const loginPath =
          userType === "educators" ? "/educators/login" : "/learners/login";
        router.push(loginPath);
      } else {
        alert(data.message || "회원가입 실패");
      }
    },
    onError: (err) => {
      console.error(err);
      alert("서버 오류 발생");
    },
  });

  // 회원가입 제출
  const onSubmit = (data: RegisterFormData) => {
    // 전화번호 인증 확인 - RHF이 관리
    if (!isPhoneVerified) {
      setError("phone", {
        type: "manual",
        message: "연락처 인증을 완료해주세요",
      });
      return;
    }

    // 인증 코드 검증 - 외부 폼
    if (requireAuthCode && !isCodeVerified) {
      alert("인증 코드를 확인해주세요.");
      return;
    }

    // 학교 정보 검증 - 외부 폼
    if (requireSchoolInfo && !isSchoolInfoValid) {
      alert("학교 정보를 모두 입력해주세요.");
      return;
    }

    console.log("회원가입 요청");

    // authenticationCode를 포함시키기
    const submitData: RegisterUser = {
      ...data,
      ...(authenticationCode ? { authenticationCode } : {}),
      ...(requireSchoolInfo ? { schoolName, grade } : {}),
      role,
    };

    // mutation 호출
    registerMutation.mutate(submitData);
  };

  const isSubmitDisabled =
    !isValid ||
    !isPhoneVerified ||
    (requireAuthCode && !isCodeVerified) ||
    (requireSchoolInfo && !isSchoolInfoValid);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 이름 입력 */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            이름
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="실명을 입력해주세요"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />

          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* 연락처 입력*/}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            연락처
          </label>
          <div className="flex gap-2">
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isPhoneVerified || phoneMutation.isPending}
              placeholder="010-1234-5678"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />

            <button
              type="button"
              onClick={handleVerifyPhone}
              disabled={isPhoneVerified || phoneMutation.isPending}
              aria-label={
                isPhoneVerified
                  ? "연락처 인증 완료"
                  : phoneMutation.isPending
                    ? "인증 중..."
                    : "연락처 인증"
              }
              className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                isPhoneVerified
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {isPhoneVerified
                ? "인증완료"
                : phoneMutation.isPending
                  ? "인증 중..."
                  : "번호 인증"}
            </button>
          </div>

          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* 이메일 입력 */}
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

        {/* 비밀번호 입력 */}
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

          {/* 비밀번호 확인 */}
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

        {/* 개인정보 처리방침 동의 */}
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

        {/* 회원가입 완료 버튼 */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSubmitDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          }`}
        >
          회원가입 완료
        </button>
      </form>

      {/* 로그인 페이지 이동 */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600">이미 계정이 있으신가요?</p>
        <Link
          href={
            userType === "educators" ? "/educators/login" : "/learners/login"
          }
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
}
