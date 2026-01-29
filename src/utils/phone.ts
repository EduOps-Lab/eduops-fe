export const formatPhoneNumber = (phone: string) => {
  // 숫자만 남기기
  const digits = phone.replace(/[^0-9]/g, "");

  // 11자리면 010-1234-5678 형식으로 변환
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  return null;
};
