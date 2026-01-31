const KST_OFFSET = 9 * 60 * 60 * 1000;

// UTC -> KST
const getKoreaDate = (date?: string | Date) => {
  const d = date ? new Date(date) : new Date();
  return new Date(d.getTime() + KST_OFFSET);
};

// 화면에 오늘 날짜 표시
export const getTodayYMD = () => {
  const d = getKoreaDate();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

// 서버 날짜 -> 한국 날짜
export const formatYMDFromISO = (iso?: string | null) => {
  if (!iso) return null;

  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;

  const kst = getKoreaDate(d);
  return `${kst.getFullYear()}-${String(kst.getMonth() + 1).padStart(2, "0")}-${String(
    kst.getDate()
  ).padStart(2, "0")}`;
};
