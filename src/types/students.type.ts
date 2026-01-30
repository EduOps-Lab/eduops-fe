import z from "zod";

import {
  AttendanceRegisterSchema,
  classChangeSchema,
  editProfileSchema,
  studentCreateSchema,
} from "@/validation/students.validation";

// 학생 정보 타입
export type StudentEnrollmentStatus = "재원" | "휴원" | "퇴원"; // 학생 수강 상태
export type LectureStatus = "진행중" | "종료";
export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "EARLY_LEAVE"; // 출석 상태
export type ExamClinicStatus = "PENDING" | "COMPLETED"; // 클리닉 상태

// RHF 폼 데이터 타입
export type StudentCreateFormData = z.infer<typeof studentCreateSchema>;
export type ClassChangeFormData = z.infer<typeof classChangeSchema>;
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
export type AttendanceRegisterFormData = z.infer<
  typeof AttendanceRegisterSchema
>;

// 학생 목록 조회 쿼리 타입
export type StudentListQuery = {
  keyword: string;
  grade: string | null;
  status: string | null;
  lectureId: string | null;
};

// 학생 전체 정보
export type StudentEnrollment = {
  enrollmentId: string;
  registeredAt: string;
  status: StudentEnrollmentStatus;
  id: string | null;
  name: string;
  email: string;
  phone: string;
  parentPhone: string;
  school: string;
  grade: string;
  profileImage?: string;
  isAppUser: boolean;
  lecture: {
    id: string;
    title: string;
    subject?: string;
    isActive: boolean;
  };
  attendance: {
    percentage: number;
    summary: {
      PRESENT?: number;
      LATE?: number;
      ABSENT?: number;
      EARLY_LEAVE?: number;
    };
    records: {
      date: string;
      status: AttendanceStatus;
      memo?: string | null;
    }[];
  };
  exams: {
    id: string;
    title: string;
    score: number;
    cutoffScore: number;
    isPass: boolean;
    clinics: {
      id: string;
      title: string;
      status: ExamClinicStatus;
      deadline?: string;
    }[];
  }[];
  extraInfo?: {
    memo?: string;
    consultationRecords?: string[];
  };
};
