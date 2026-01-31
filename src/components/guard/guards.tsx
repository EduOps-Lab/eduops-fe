"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/providers/AuthProvider";
import { Role } from "@/types/auth.type";

export function RouteGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  // 현재 유저의 userType이 allowedRoles[]에 포함되는지 확인
  const hasAccess = user && allowedRoles.includes(user.userType);

  useEffect(() => {
    if (isLoading) return;

    // 1. 비로그인 상태일 때
    if (!user) {
      const isEducatorPath = allowedRoles.some(
        (r) => r === "INSTRUCTOR" || r === "ASSISTANT"
      );
      router.replace(isEducatorPath ? "/educators/login" : "/learners/login");
      return;
    }

    // 2. 로그인 상태지만 권한(Role)이 없을 때
    if (!hasAccess) {
      alert("접근 권한이 없습니다.");
      const isUserEducator =
        user.userType === "INSTRUCTOR" || user.userType === "ASSISTANT";
      router.replace(isUserEducator ? "/educators" : "/learners");
    }
  }, [user, isLoading, allowedRoles, router, hasAccess]);

  // 로딩 중일 때는 로딩 표시
  if (isLoading) return <div>로딩 중...</div>;

  // 권한이 확인된 경우에만 자식 컴포넌트 렌더링
  if (user && hasAccess) {
    return <>{children}</>;
  }

  return null;
}
