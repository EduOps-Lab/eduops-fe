import RegisterForm from "@/components/form/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function InstructorRegisterPage() {
  return (
    <AuthLayout
      title="강사 회원가입"
      description="회원가입을 위해 필수 정보를 입력해주세요."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
