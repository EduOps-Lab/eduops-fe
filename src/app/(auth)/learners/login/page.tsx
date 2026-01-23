"use client";

import { useState } from "react";

import type { LearnerRole, RoleOption } from "@/types/auth.type";
import LoginForm from "@/components/form/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";
import RoleSelectorBtn from "@/components/button/RoleSelectorBtn";

const LEARNER_ROLES: RoleOption<LearnerRole>[] = [
  { label: "학생", value: "student" },
  { label: "학부모", value: "parent" },
];

export default function LearnersLoginPage() {
  const [selectedRole, setSelectedRole] = useState<LearnerRole>("student");

  return (
    <AuthLayout
      title="반갑습니다! 👋"
      description="학생 또는 학부모를 선택하여 로그인 해주세요."
    >
      <RoleSelectorBtn
        options={LEARNER_ROLES}
        value={selectedRole}
        onChange={setSelectedRole}
      />

      <LoginForm selectedRole={selectedRole} />
    </AuthLayout>
  );
}
