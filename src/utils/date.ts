// 출결, 로그 등 (2026-01-27T09:12:33.123Z)
export const getTodayISODate = () => {
  return new Date().toISOString();
};

// 폼 생성일 등 (2026-01-27)
export const getTodayYMD = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};
