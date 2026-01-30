import { StudentEnrollment } from "@/types/students.type";
import studentProfile from "@/assets/images/student-profile.jpg";

export const mockStudentEnrollments: StudentEnrollment[] = [
  {
    enrollmentId: "enr-001",
    registeredAt: "2025-03-02",
    status: "재원",
    id: "stu-001",
    email: "minjun@example.com",
    name: "김민준",
    phone: "010-2345-6789",
    school: "서울고등학교",
    grade: "고3",
    profileImage: studentProfile.src,
    isAppUser: true,
    parentPhone: "010-9876-5432",
    lecture: {
      id: "lec-001",
      title: "고3 수능대비",
      subject: "수학",
      isActive: true,
    },
    attendance: {
      percentage: 92,
      summary: {
        PRESENT: 22,
        LATE: 1,
        ABSENT: 1,
      },
      records: [
        { date: "2025-03-01", status: "PRESENT" },
        { date: "2025-03-05", status: "PRESENT" },
        { date: "2025-03-01", status: "EARLY_LEAVE", memo: "가족 행사" },
        { date: "2025-03-03", status: "LATE", memo: "병원" },
        { date: "2025-03-05", status: "PRESENT" },
        { date: "2025-03-05", status: "ABSENT", memo: "가족 여행" },
        { date: "2025-03-01", status: "ABSENT", memo: "가족 여행" },
        { date: "2025-03-01", status: "PRESENT" },
        { date: "2025-03-03", status: "PRESENT" },
        { date: "2025-03-05", status: "PRESENT" },
        { date: "2025-03-03", status: "PRESENT" },
        { date: "2025-03-05", status: "PRESENT" },
        { date: "2025-03-03", status: "LATE", memo: "지각 사유: 교통 체증" },
        { date: "2025-03-03", status: "PRESENT" },
        { date: "2025-03-05", status: "PRESENT" },
      ],
    },
    exams: [
      {
        id: "exam-001",
        title: "3월 모의고사",
        score: 88,
        cutoffScore: 70,
        isPass: true,
        clinics: [],
      },
    ],
  },

  {
    enrollmentId: "enr-002",
    registeredAt: "2025-02-10",
    status: "재원",
    id: null,
    email: "seoyeon@example.com",
    name: "이서연",
    phone: "010-5555-1111",
    school: "중앙여중",
    grade: "중3",
    profileImage: undefined,
    isAppUser: false,
    parentPhone: "010-2222-3333",
    lecture: {
      id: "lec-002",
      title: "중3 영어 내신 대비",
      subject: "영어",
      isActive: true,
    },
    attendance: {
      percentage: 80,
      summary: {
        PRESENT: 16,
        LATE: 2,
        ABSENT: 2,
      },
      records: [
        { date: "2025-02-11", status: "PRESENT" },
        { date: "2025-02-13", status: "ABSENT", memo: "감기" },
      ],
    },
    exams: [
      {
        id: "exam-002",
        title: "중간고사 대비 테스트",
        score: 62,
        cutoffScore: 70,
        isPass: false,
        clinics: [
          {
            id: "clinic-001",
            title: "영어 보충 클리닉",
            status: "PENDING",
            deadline: "2025-03-20",
          },
        ],
      },
    ],
  },

  {
    enrollmentId: "enr-003",
    registeredAt: "2024-11-15",
    status: "휴원",
    id: "stu-003",
    email: "jihoon@example.com",
    name: "박지훈",
    phone: "010-7777-8888",
    school: "부산고등학교",
    grade: "고1",
    profileImage: undefined,
    isAppUser: true,
    parentPhone: "010-9999-0000",
    lecture: {
      id: "lec-003",
      title: "고1 과학 기초",
      subject: "과학",
      isActive: true,
    },
    attendance: {
      percentage: 65,
      summary: {
        PRESENT: 13,
        ABSENT: 7,
      },
      records: [
        { date: "2024-11-16", status: "PRESENT" },
        { date: "2024-11-18", status: "ABSENT" },
      ],
    },
    exams: [],
  },

  {
    enrollmentId: "enr-004",
    registeredAt: "2024-08-01",
    status: "퇴원",
    id: "stu-004",
    email: "haeun@example.com",
    name: "정하은",
    phone: "010-1212-3434",
    school: "대전여고",
    grade: "고3",
    profileImage: studentProfile.src,
    isAppUser: true,
    parentPhone: "010-4545-6767",
    lecture: {
      id: "lec-004",
      title: "고3 수능 국어",
      subject: "국어",
      isActive: false,
    },
    attendance: {
      percentage: 95,
      summary: {
        PRESENT: 38,
        LATE: 1,
        ABSENT: 1,
      },
      records: [],
    },
    exams: [
      {
        id: "exam-004",
        title: "수능 파이널 테스트",
        score: 91,
        cutoffScore: 80,
        isPass: true,
        clinics: [
          {
            id: "clinic-004",
            title: "오답 클리닉",
            status: "COMPLETED",
          },
        ],
      },
    ],
  },

  {
    enrollmentId: "enr-005",
    registeredAt: "2025-01-05",
    status: "재원",
    id: "stu-005",
    email: "yunseo@example.com",
    name: "최윤서",
    phone: "010-3333-6666",
    school: "대전여고",
    grade: "고2",
    profileImage: studentProfile.src,
    isAppUser: false,
    parentPhone: "010-8888-1111",
    lecture: {
      id: "lec-005",
      title: "고2 수학 사고력",
      subject: "수학",
      isActive: true,
    },
    attendance: {
      percentage: 100,
      summary: {
        PRESENT: 12,
      },
      records: [
        { date: "2025-01-06", status: "PRESENT" },
        { date: "2025-01-08", status: "PRESENT" },
      ],
    },
    exams: [],
    extraInfo: {
      memo: "부모 요청으로 보충학습 진행",
      consultationRecords: ["2025-01-10 학부모 상담"],
    },
  },
];

export type Student = {
  id: string;
  name: string;
  school: string;
  grade: string;
  phone: string;
};

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "구민지",
    school: "서하늘고",
    grade: "고2",
    phone: "010-4001-1001",
  },
  {
    id: "2",
    name: "김민수",
    school: "서울고",
    grade: "고2",
    phone: "010-5678-1111",
  },
];
