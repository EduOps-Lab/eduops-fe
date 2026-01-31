import {
  ApiResponse,
  EnrollmentListResponse,
  EnrollmentDetailResponse,
  AttendanceListWithStatsResponse,
  StudentListQuery,
  UpdateStudentRequest,
  CreateAttendanceRequest,
  Attendance,
  Student,
} from "@/types/students.type";

import { axiosClient } from "./axiosClient";

// 전체 수강생 목록 조회
export const getEnrollmentsAPI = (query?: StudentListQuery) =>
  axiosClient
    .get<ApiResponse<EnrollmentListResponse>>("/enrollments", { params: query })
    .then((res) => res.data);

// 수강생 상세 조회
export const getEnrollmentByIdAPI = (id: string) =>
  axiosClient
    .get<ApiResponse<EnrollmentDetailResponse>>(`/enrollments/${id}`)
    .then((res) => res.data);

// 수강생 정보 수정
export const updateEnrollmentAPI = (id: string, data: UpdateStudentRequest) =>
  axiosClient
    .patch<
      ApiResponse<{ enrollment: Partial<Student> }>
    >(`/enrollments/${id}`, data)
    .then((res) => res.data);

// 수강생 삭제
export const deleteEnrollmentAPI = (id: string) =>
  axiosClient
    .delete<ApiResponse<null>>(`/enrollments/${id}`)
    .then((res) => res.data);

// 특정 수강생 출결 목록 조회
export const getAttendancesAPI = (id: string) =>
  axiosClient
    .get<
      ApiResponse<AttendanceListWithStatsResponse>
    >(`/enrollments/${id}/attendances`)
    .then((res) => res.data);

// 특정 수강생 출결 등록
export const createAttendanceAPI = (
  id: string,
  data: CreateAttendanceRequest
) =>
  axiosClient
    .post<
      ApiResponse<{ attendance: Attendance }>
    >(`/enrollments/${id}/attendances`, data)
    .then((res) => res.data);

// 수강생 출결 정정/수정
export const updateAttendanceAPI = (
  id: string,
  attendanceId: string,
  data: Partial<Attendance>
) =>
  axiosClient
    .patch<
      ApiResponse<{ attendance: Attendance }>
    >(`/enrollments/${id}/attendances/${attendanceId}`, data)
    .then((res) => res.data);
