import studentProfile from "@/assets/images/studentProfile.jpg";

export const mockStudents = [
  {
    enrollmentId: "enr-101",
    student: {
      id: "stu-001",
      name: "김민준",
      profileImage: studentProfile,
      school: "서울고고등학교",
      grade: "고2",
      phone: "010-2345-6789",
      email: "minjun@student.com",
      enrollment: "재원중", // 등록 상태
      registeredAt: "2024-03-12", // 학원 등록 일자
      isAppUser: true, // 앱 다운로드 여부
    },
    parent: {
      id: "par-001",
      name: "김민준 부모님",
      phone: "010-9988-1122",
      isAppUser: true,
    },
    lecture: {
      id: "lec-001",
      title: "고2 수학 A반",
      subject: "MATH",
      status: "ACTIVE", // 수업 활성화 여부
    },
    attendance: {
      percentage: 96, // 출석률(%)
      summary: {
        PRESENT: 24, // 출석 횟수
        LATE: 1, // 지각 횟수
        ABSENT: 0, // 결석 횟수
      },
      records: [
        {
          date: "2024-12-02", // 출석일
          status: "PRESENT", // 출석 상태
          memo: null,
        },
        {
          date: "2024-12-04",
          status: "LATE",
          memo: "교통 체증",
        },
      ],
    },
    exams: [
      {
        id: "exam-001",
        title: "중간고사",
        schedule: {
          date: "2024-11-05",
          startTime: "14:00",
          endTime: "15:30",
        },
        questions: [
          { id: "q-001", correctAnswer: 3, studentAnswer: 3, isCorrect: true },
          { id: "q-002", correctAnswer: 5, studentAnswer: 2, isCorrect: false },
        ],
        grade: {
          totalScore: 50, // 총 점수
          passed: false, // 합격 여부
        },
        clinics: [
          {
            id: "clinic-001",
            reason: "중간고사 미통과",
            status: "PENDING", // 대기 상태
          },
        ],
      },
    ],
    extraInfo: {
      memo: "수학 경시 대비 학생",
      consultationRecords: [
        "2024-09-10: 학습 진도 상담",
        "2024-11-05: 심화반 추천",
      ], // 상담 기록
    },
  },
  {
    enrollmentId: "enr-102",
    student: {
      id: "stu-002",
      name: "박서연",
      profileImage: studentProfile,
      school: "야당 고등등학교",
      grade: "고3",
      phone: "010-3456-7890",
      email: "seoyeon@student.com",
      enrollment: "재원중",
      registeredAt: "2024-02-20",
      isAppUser: true,
    },
    parent: {
      id: "par-002",
      name: "박서연 부모님",
      phone: "010-8877-3344",
      isAppUser: false,
    },
    lecture: {
      id: "lec-002",
      title: "고3 파이널 대비반",
      subject: "ENG",
      status: "ACTIVE",
    },
    attendance: {
      percentage: 88,
      summary: { PRESENT: 22, LATE: 3, ABSENT: 1 },
      records: [
        { date: "2024-12-01", status: "PRESENT", memo: null },
        { date: "2024-12-03", status: "ABSENT", memo: "개인 사정" },
        { date: "2024-12-05", status: "LATE", memo: "교통 지연" },
      ],
    },
    exams: [
      {
        id: "exam-002",
        title: "기말고사",
        schedule: { date: "2024-12-15", startTime: "10:00", endTime: "12:00" },
        questions: [
          {
            id: "q-003",
            correctAnswer: "A",
            studentAnswer: "B",
            isCorrect: false,
          },
          {
            id: "q-004",
            correctAnswer: "C",
            studentAnswer: "C",
            isCorrect: true,
          },
        ],
        grade: { totalScore: 70, passed: true },
        clinics: [],
      },
    ],
    extraInfo: {
      memo: "영어 집중 수업 필요",
      consultationRecords: ["2024-08-15: 단어 암기 상담"],
    },
  },
  {
    enrollmentId: "enr-103",
    student: {
      id: "stu-003",
      name: "최준혁",
      profileImage: studentProfile,
      school: "청주 고등학교",
      grade: "고1",
      phone: "010-4567-8901",
      email: "junhyuk@student.com",
      enrollment: "휴원",
      registeredAt: "2023-09-01",
      isAppUser: false,
    },
    parent: {
      id: "par-003",
      name: "최준혁 부모님",
      phone: "010-7766-2211",
      isAppUser: false,
    },
    lecture: {
      id: "lec-003",
      title: "고1 영어 A반",
      subject: "MATH",
      status: "INACTIVE",
    },
    attendance: {
      percentage: 75,
      summary: { PRESENT: 15, LATE: 2, ABSENT: 3 },
      records: [
        { date: "2024-11-10", status: "PRESENT", memo: null },
        { date: "2024-11-12", status: "ABSENT", memo: "개인 사정" },
        { date: "2024-11-15", status: "LATE", memo: "교통 지연" },
      ],
    },
    exams: [
      {
        id: "exam-003",
        title: "기말 모의고사",
        schedule: { date: "2024-12-20", startTime: "09:00", endTime: "11:30" },
        questions: [
          { id: "q-005", correctAnswer: 2, studentAnswer: 2, isCorrect: true },
          { id: "q-006", correctAnswer: 4, studentAnswer: 1, isCorrect: false },
        ],
        grade: { totalScore: 60, passed: false },
        clinics: [
          { id: "clinic-002", reason: "모의고사 미달", status: "PENDING" },
        ],
      },
    ],
    extraInfo: {
      memo: "개인 사정으로 휴원 중",
      consultationRecords: [
        "2024-10-01: 휴원 상담",
        "2024-11-01: 복학 상담 예정",
      ],
    },
  },
];
