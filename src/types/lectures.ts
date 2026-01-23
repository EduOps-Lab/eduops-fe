export type Lecture = {
  id: string;
  name: string; // 수업명 (예: 고2 수학 A반)
  subject: string; // 과목 (예: 수학)
  category: string; // 분류 (예: 어학원, 학교)
  grade: string; // 학년 (예: 고2, 고3)
  instructor: string; // 강사명
  currentStudents: number; // 현재 인원
  maxStudents: number; // 최대 인원
  schedule: {
    days: string[]; // 요일 (예: ['월', '수', '금'])
    time: string; // 시간 (예: 18:00 - 20:00)
  };
};

export type LecturesState = {
  lectures: Lecture[];
  visibleCount: number;

  // Actions
  loadMore: () => void;
  resetVisibleCount: () => void;
};
