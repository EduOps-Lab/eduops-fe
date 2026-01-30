import { create } from "zustand";

import {
  mockReportClasses,
  mockClassExams,
  mockExamStudents,
  ClassExam,
  ExamStudent,
} from "@/data/report.mock";
import { ReportClass } from "@/types/report";

export type { ReportClass, ClassExam, ExamStudent };

type ReportStore = {
  classes: ReportClass[];
  exams: ClassExam[];
  students: ExamStudent[];
  selectedClassId: string | null;
  selectedExamId: string | null;
  selectedStudentId: string | null;
  selectedTemplate: "premium" | "simple";
  selectClass: (classId: string) => void;
  selectExam: (examId: string) => void;
  selectStudent: (studentId: string) => void;
  selectTemplate: (template: "premium" | "simple") => void;
  clearSelection: () => void;
  getSelectedStudent: () => ExamStudent | null;
};

export const useReportStore = create<ReportStore>((set, get) => ({
  classes: mockReportClasses,
  exams: [],
  students: [],
  selectedClassId: null,
  selectedExamId: null,
  selectedStudentId: null,
  selectedTemplate: "simple",
  selectClass: (classId) =>
    set(() => ({
      selectedClassId: classId,
      selectedExamId: null,
      selectedStudentId: null,
      exams: mockClassExams[classId] || [],
      students: [],
    })),
  selectExam: (examId) =>
    set(() => ({
      selectedExamId: examId,
      selectedStudentId: null,
      students: mockExamStudents[examId] || [],
    })),
  selectStudent: (studentId) =>
    set(() => ({
      selectedStudentId: studentId,
    })),
  selectTemplate: (template) =>
    set(() => ({
      selectedTemplate: template,
    })),
  clearSelection: () =>
    set(() => ({
      selectedClassId: null,
      selectedExamId: null,
      selectedStudentId: null,
      exams: [],
      students: [],
    })),
  getSelectedStudent: () => {
    const state = get();
    if (!state.selectedStudentId || !state.selectedExamId) return null;
    const student = state.students.find(
      (s) => s.id === state.selectedStudentId
    );
    return student || null;
  },
}));
