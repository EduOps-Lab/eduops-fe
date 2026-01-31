export const phoneNumberFormatter = (phone: string | null | undefined) => {
  if (!phone) return "";

  // 숫자만 남기기
  const digits = phone.replace(/\D/g, "");

  // 휴대폰 (010XXXXXXXX)
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 자동 생성 목데이터용
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return phone;
};
