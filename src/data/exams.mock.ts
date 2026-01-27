import { Exam } from "@/types/exams";

export const mockExams: Exam[] = [
  {
    id: "1",
    name: "리포트용 영어 모의평가",
    subtitle: "모의고사 • 학원 제작",
    type: "모의고사",
    source: "학원 제작",
    lectureName: "고2 영어 리포트반",
    registrationDate: "2026. 01. 10",
    status: "채점 완료",
  },
  {
    id: "2",
    name: "영어 독해 기본 평가",
    subtitle: "단원 평가 • 학원 제작",
    type: "단원 평가",
    source: "학원 제작",
    lectureName: "고1 영어 A반",
    registrationDate: "2025. 03. 10",
    status: "진행 중",
  },
];
