import AuthenticationCode from "@/components/form/AuthenticationCodeForm";
import RegisterForm from "@/components/form/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function AssistantInvitePage() {
  return (
    <AuthLayout
      title="조교 회원가입"
      description="회원가입을 위해 필수 정보를 입력해주세요."
    >
      <AuthenticationCode />
      <RegisterForm requireAuthCode={true} />
    </AuthLayout>
  );
}
