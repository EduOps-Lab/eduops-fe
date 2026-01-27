import AuthenticationCodeForm from "@/components/auth/form/AuthenticationCodeForm";
import RegisterForm from "@/components/auth/form/RegisterForm";
import AuthLayout from "@/components/auth/layout/AuthLayout";

export default function AssistantRegisterPage() {
  return (
    <AuthLayout
      title="조교 회원가입"
      description="회원가입을 위해 필수 정보를 입력해주세요."
    >
      <AuthenticationCodeForm />
      <RegisterForm
        requireAuthCode={true}
        userType="educators"
        role="assistant"
      />
    </AuthLayout>
  );
}
