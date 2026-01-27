import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .trim()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다"
    ),
  keepLoggedIn: z.boolean(),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "실명을 입력해주세요")
      .min(2, "실명은 최소 2자 이상이어야 합니다"),
    phone: z
      .string()
      .trim()
      .min(1, "연락처를 입력해주세요")
      .regex(
        /^(01[016789]\d{7,8}|01[016789]-\d{3,4}-\d{4})$/,
        "전화번호 형식이 올바르지 않습니다"
      ),
    email: z
      .string()
      .trim()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .trim()
      .min(1, "비밀번호를 입력해주세요")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
        "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다"
      ),
    passwordConfirm: z.string().trim().min(1, "비밀번호 확인을 입력해주세요"),
    agreePrivacy: z.boolean().refine((val) => val === true, {
      message: "개인정보 처리방침에 동의해주세요",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export const authCodeSchema = z.object({
  authenticationCode: z
    .string()
    .trim()
    .min(1, "인증 코드를 입력해주세요")
    .length(6, "인증 코드는 6자리여야 합니다"),
});

export const schoolInfoSchema = z.object({
  schoolName: z.string().trim().min(1, "학교명을 입력해주세요"),
  grade: z.string().min(1, "학년을 선택해주세요"),
});
