// 한국 시간으로 변환
const getKoreaDate = (date?: string | Date) => {
  const d = date ? new Date(date) : new Date();
  return new Date(d.getTime() + 9 * 60 * 60 * 1000);
};

// 출결, 로그 등을 IS0 형식으로 반환(2026-01-27T09:12:33.123Z)
export const getTodayISODate = () => {
  return getKoreaDate().toISOString();
};

// 폼 생성일 등 (2026-01-27)
export const getTodayYMD = () => {
  const today = getKoreaDate();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

// 서버 날짜 변환 (2026-01-27)
export const formatYMDFromISO = (isoDate: string | null | undefined) => {
  if (!isoDate) return null;

  const kst = getKoreaDate(isoDate);
  if (isNaN(kst.getTime())) return null;

  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, "0");
  const dd = String(kst.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};
