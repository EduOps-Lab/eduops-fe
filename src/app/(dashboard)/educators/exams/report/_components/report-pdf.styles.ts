import { StyleSheet, Font } from "@react-pdf/renderer";

// 한글 폰트 등록 (Pretendard)
Font.register({
  family: "Pretendard",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static/Pretendard-Regular.otf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static/Pretendard-Bold.otf",
      fontWeight: 700,
    },
  ],
});

// 공통 색상 상수
export const colors = {
  black: "#18181b",
  white: "#ffffff",
  gray: "#71717a",
  border: "#e4e4e7",
  lightBg: "#f4f4f5",
  success: "#16a34a",
  error: "#dc2626",
};

// ==========================================
// 프리미엄 리포트 스타일
// ==========================================
export const premiumStyles = StyleSheet.create({
  // 페이지
  page: {
    padding: 20,
    fontFamily: "Pretendard",
    fontSize: 9,
    backgroundColor: colors.white,
  },
  // 상단 영역 (헤더 + 출결/복습테스트)
  topSection: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  // 헤더
  header: {
    backgroundColor: colors.black,
    padding: 12,
    borderRadius: 6,
    flex: 1,
  },
  headerYear: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 700,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 2,
  },
  // 출결/복습테스트 테이블
  attendanceTable: {
    width: 200,
  },
  // 공통 테이블 스타일
  table: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: colors.black,
    flexDirection: "row",
  },
  tableHeaderCell: {
    color: colors.white,
    fontWeight: 700,
    padding: 6,
    textAlign: "center",
    flex: 1,
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tableCell: {
    padding: 8,
    textAlign: "center",
    flex: 1,
    fontSize: 9,
  },
  tableCellBorder: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  // 2열 레이아웃
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  // 학생 정보
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  infoLabel: {
    backgroundColor: colors.black,
    color: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    width: 55,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 8,
  },
  infoValue: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 8,
    flex: 1,
    fontSize: 9,
  },
  infoLabelSmall: {
    backgroundColor: colors.black,
    color: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 3,
    width: 45,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 8,
    marginLeft: 8,
  },
  // 카드 스타일
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: colors.black,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    color: colors.white,
    fontWeight: 700,
    textAlign: "center",
    fontSize: 9,
  },
  cardContent: {
    padding: 8,
  },
  // 응시 결과 점수
  scoreRow: {
    flexDirection: "row",
  },
  scoreCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  scoreCellBorder: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  scoreLabel: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 700,
  },
  // 회차별 성적
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyRowLast: {
    borderBottomWidth: 0,
  },
  historyRound: {
    fontSize: 9,
    color: colors.gray,
  },
  historyScore: {
    fontSize: 9,
    fontWeight: 700,
  },
  // 전달사항
  messageText: {
    fontSize: 9,
    lineHeight: 1.6,
  },
  // 페이지 2 스타일
  page2Header: {
    marginBottom: 12,
  },
  page2Subtitle: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 2,
  },
  page2Title: {
    fontSize: 14,
    fontWeight: 700,
  },
  // 문항 테이블
  questionTable: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  questionHeaderRow: {
    flexDirection: "row",
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  questionHeaderCell: {
    color: colors.white,
    fontWeight: 700,
    paddingVertical: 6,
    paddingHorizontal: 4,
    textAlign: "center",
    fontSize: 8,
  },
  questionRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  questionRowAlt: {
    backgroundColor: colors.lightBg,
  },
  questionCell: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    textAlign: "center",
    fontSize: 8,
  },
  questionCellO: {
    color: colors.success,
    fontWeight: 700,
  },
  questionCellX: {
    color: colors.error,
    fontWeight: 700,
  },
  // 푸터
  footer: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  footerText: {
    fontSize: 8,
    color: colors.gray,
  },
});

// ==========================================
// 심플 리포트 스타일
// ==========================================
export const simpleStyles = StyleSheet.create({
  // 페이지
  page: {
    padding: 30,
    fontFamily: "Pretendard",
    fontSize: 10,
    backgroundColor: colors.white,
  },
  // 헤더
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 15,
  },
  headerLabel: {
    fontSize: 8,
    color: colors.gray,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 10,
    color: colors.gray,
  },
  // 통계 카드 영역
  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.lightBg,
    borderRadius: 6,
    padding: 12,
  },
  statLabel: {
    fontSize: 9,
    color: colors.gray,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 700,
  },
  // 전달 사항
  messageSection: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    overflow: "hidden",
  },
  messageHeader: {
    backgroundColor: colors.black,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageHeaderText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 700,
    textAlign: "center",
  },
  messageContent: {
    padding: 15,
    minHeight: 100,
  },
  messageText: {
    fontSize: 10,
    lineHeight: 1.6,
  },
});
