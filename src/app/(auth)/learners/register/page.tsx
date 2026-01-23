"use client";

import { useState } from "react";

import RoleSelectorBtn from "@/components/auth/button/RoleSelectorBtn";
import RegisterForm from "@/components/auth/form/RegisterForm";
import AuthLayout from "@/components/auth/layout/AuthLayout";
import { LearnerRole, RoleOption } from "@/types/auth.type";
import SchoolInfoForm from "@/components/auth/form/SchoolInfoForm";

const LEARNER_ROLES: RoleOption<LearnerRole>[] = [
  { label: "학생", value: "student" },
  { label: "학부모", value: "parent" },
];

export default function ParentRegisterPage() {
  const [selectedRole, setSelectedRole] = useState<LearnerRole>("student");

  return (
    <AuthLayout
      title="회원가입"
      description="자녀 관리를 위한 학부모 회원정보를 입력해주세요."
    >
      {/* 역할 선택 버튼 */}
      <RoleSelectorBtn
        options={LEARNER_ROLES}
        value={selectedRole}
        onChange={setSelectedRole}
      />

      {/* 역할에 따른 회원가입 폼 */}
      <div className="mt-6">
        {selectedRole === "student" && (
          <div className="space-y-4">
            <SchoolInfoForm />
            <RegisterForm
              requireSchoolInfo={true}
              userType="learners"
              role="student"
            />
          </div>
        )}
        {selectedRole === "parent" && (
          <RegisterForm userType="learners" role="parent" />
        )}
      </div>
    </AuthLayout>
  );
}
