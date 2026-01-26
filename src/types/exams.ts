export type ExamStatus = "진행 중" | "채점 완료";

export type ExamType = "모의고사" | "단원 평가" | "기타";

export type ExamSource = "학원 제작" | "기출+자체";

export type Exam = {
  id: string;
  name: string; // 과제명 (예: "리포트용 영어 모의평가")
  subtitle: string; // 시험지 유형
  type: ExamType; // 시험지 유형
  source: ExamSource; // 시험지 출처
  lectureName: string; // 반 이름 (예: "고2 영어 리포트반")
  registrationDate: string; // 등록일 (예: "2026. 01. 10")
  status: ExamStatus; // 시험지 상태
  icon?: string; // 아이콘 (예: "📖", "A+")
};

export type ExamsState = {
  exams: Exam[]; // 시험지 목록
  filteredExams: Exam[]; // 필터링된 시험지 목록
  statusFilter: ExamStatus | "전체";
  searchQuery: string; // 검색어
  selectedIds: string[]; // 선택된 시험지 ID 목록
  currentPage: number; // 현재 페이지
  itemsPerPage: number; // 페이지당 시험지 수
};
