import { StudentEnrollment, StudentListQuery } from "@/types/students.type";
import { mockStudentEnrollments } from "@/data/students.mock";

// 임시 학생 목록 조회 API
export const fetchStudentsAPI = async (
  query: StudentListQuery
): Promise<StudentEnrollment[]> => {
  console.log("학생 목록 조회 쿼리:", query);

  await new Promise((resolve) => setTimeout(resolve, 500));

  // 실제 서버 대신 mock 필터링
  let result = [...mockStudentEnrollments];

  if (query.keyword) {
    result = result.filter(
      (s) =>
        s.name.includes(query.keyword) || s.phoneNumber.includes(query.keyword)
    );
  }

  if (query.schoolYear) {
    result = result.filter((s) => s.schoolYear === query.schoolYear);
  }

  if (query.status) {
    result = result.filter((s) => s.status === query.status);
  }

  if (query.lectureId) {
    result = result.filter((s) => s.lecture.id === query.lectureId);
  }

  return result;
};
