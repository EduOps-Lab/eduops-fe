"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useAuthContext } from "@/providers/AuthProvider";
import {
  signinAPI,
  signoutAPI,
  signupAssistantAPI,
  signupInstructorAPI,
  signupLearnerAPI,
} from "@/services/auth.service";
import {
  LoginUser,
  RegisterUser,
  Role,
  SignupAssistantUser,
  SignupInstructorUser,
  SignupParentUser,
  SignupStudentUser,
} from "@/types/auth.type";

// API role 구분
export type LoginURLType = "MGMT" | "SVC";

export const API_URL_TYPE: Record<Role, LoginURLType> = {
  INSTRUCTOR: "MGMT",
  ASSISTANT: "MGMT",
  STUDENT: "SVC",
  PARENT: "SVC",
};

export function useAuth() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async (data: RegisterUser) => {
    try {
      setLoading(true);

      let res;

      // 공통 필드 추출 (passwordConfirm 제외된 기준)
      const basePayload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        agreePrivacy: data.agreePrivacy,
      };

      switch (data.userType) {
        case "INSTRUCTOR":
          res = await signupInstructorAPI({
            ...basePayload,
            userType: "INSTRUCTOR",
          } as SignupInstructorUser);
          break;

        case "ASSISTANT":
          res = await signupAssistantAPI({
            ...basePayload,
            userType: "ASSISTANT",
            signupCode: data.signupCode,
          } as SignupAssistantUser);
          break;

        case "STUDENT":
          res = await signupLearnerAPI({
            ...basePayload,
            userType: "STUDENT",
            school: data.school,
            schoolYear: data.schoolYear,
          } as SignupStudentUser);
          break;

        case "PARENT":
          res = await signupLearnerAPI({
            ...basePayload,
            userType: "PARENT",
          } as SignupParentUser);
          break;

        default:
          throw new Error("알 수 없는 사용자 타입입니다.");
      }

      alert("회원가입 성공!");

      // 회원가입 후 역할별 로그인 페이지 이동
      const targetPath =
        data.userType === "INSTRUCTOR" || data.userType === "ASSISTANT"
          ? "/educators/login"
          : "/learners/login";

      router.push(targetPath);

      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "회원가입 실패");
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data: LoginUser) => {
    try {
      setLoading(true);

      // userType 기반으로 role 결정
      const apiRole = API_URL_TYPE[data.userType];

      const res = await signinAPI(data, apiRole);

      if (res.data?.user) {
        alert("로그인 성공!");
        setUser(res.data.user);

        // 역할별 메인 페이지(대시보드) 이동
        // TODO: 강사/조교/학생/학부모 구분한 라우팅
        if (apiRole === "MGMT") {
          router.push("/educators");
        } else {
          router.push("/learners");
        }
      } else {
        alert("사용자 정보를 가져오지 못했습니다.");
        return;
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "로그인 실패!");
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signout = async (apiRole: LoginURLType) => {
    await signoutAPI(apiRole);
    setUser(null);

    // 역할별 로그인 페이지 이동
    if (apiRole === "MGMT") {
      router.push("/educators/login");
    } else {
      router.push("/students/login");
    }
  };

  return { signup, signin, signout, loading };
}
