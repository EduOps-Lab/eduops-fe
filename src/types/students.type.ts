// 학생 정보 타입
export type StudentEnrollmentStatus = "재원" | "휴원" | "퇴원"; // 학생 수강 상태
export type LectureStatus = "진행중" | "종료";
export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "EARLY_LEAVE"; // 출석 상태
export type ExamClinicStatus = "PENDING" | "COMPLETED"; // 클리닉 상태

export type StudentCreateFormData = {
  studentName: string;
  studentPhone: string;
  school: string;
  grade: string;
  parentName?: string;
  parentPhone: string;
  assignedClass: string;
  registrationDate: string;
  memo?: string;
};

export type StudentEnrollment = {
  /** Enrollment */
  enrollmentId: string;
  registeredAt: string;
  status: StudentEnrollmentStatus;
  /** 학생 정보 (Snapshot + AppStudent) */
  student: {
    id: string | null;
    name: string;
    phone: string;
    school?: string;
    grade?: string;
    profileImage?: string;
    isAppUser: boolean;
  };
  /** 학부모 정보 */
  parent: {
    id: string | null;
    name: string;
    phone: string;
    isAppUser: boolean;
  };
  /** 강의 정보 */
  lecture: {
    id: string;
    title: string;
    subject?: string;
    isActive: boolean;
  };
  /** 출석 정보 */
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
  /** 시험 */
  exams: {
    id: string;
    title: string;
    score: number;
    cutoffScore: number;
    isPass: boolean;
    /** 클리닉 정보 */
    clinics: {
      id: string;
      title: string;
      status: ExamClinicStatus;
      deadline?: string;
    }[];
  }[];
  /** 기타 정보 */
  extraInfo?: {
    memo?: string;
    consultationRecords?: string[];
  };
};

// 학생 목록 조회 쿼리 타입
export type StudentListQuery = {
  keyword: string;
  grade: string | null;
  status: string | null;
  lectureId: string | null;
};
