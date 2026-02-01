"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as api from "@/services/students.service";
import {
  StudentListQuery,
  UpdateStudentRequest,
  CreateAttendanceRequest,
} from "@/types/students.type";
import { getTodayYMD } from "@/utils/date";

// 수강생 목록 조회
export const useEnrollmentList = (query: StudentListQuery) =>
  useQuery({
    queryKey: ["enrollments", query],
    queryFn: () => api.getEnrollmentsAPI(query),
    select: (res) => ({
      items: res.data.list,
      pagination: res.data.pagination,
    }),
  });

// 수강생 상세 조회
export const useEnrollmentDetail = (id: string) =>
  useQuery({
    queryKey: ["enrollments", "detail", id],
    queryFn: () => api.getEnrollmentByIdAPI(id),
    select: (res) => res.data.enrollment,
  });

// 수강생 출결 목록 조회(출결 목록 & 통계)
export const useEnrollmentAttendances = (id: string) =>
  useQuery({
    queryKey: ["enrollments", "attendances", id],
    queryFn: () => api.getAttendancesAPI(id),
    select: (res) => res.data,
  });

// 수강생 정보 수정
export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentRequest }) =>
      api.updateEnrollmentAPI(id, data),
    onSuccess: (_, { id }) => {
      // 수강생 목록 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      // 수강생 상세 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ["enrollments", "detail", id],
      });
    },
  });
};

// 수강생 삭제
export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteEnrollmentAPI(id),
    onSuccess: () => {
      // 삭제 후 수강생 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};

// 수강생 출결 등록
export const useCreateAttendance = (enrollmentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAttendanceRequest) =>
      api.createAttendanceAPI(enrollmentId, data),
    onSuccess: () => {
      // 수강생 출결 목록 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ["enrollments", "attendances", enrollmentId],
      });
    },
  });
};

// 수강생 출결 정정/수정
export const useUpdateAttendance = (enrollmentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attendanceId,
      data,
    }: {
      attendanceId: string;
      data: Parameters<typeof api.updateAttendanceAPI>[2];
    }) => api.updateAttendanceAPI(enrollmentId, attendanceId, data),
    onSuccess: () => {
      // 정정 후 해당 학생의 출결 목록 및 통계 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ["enrollments", "attendances", enrollmentId],
      });
    },
  });
};

// 수강생 단체 출결 등록
export const useCreateMassAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids }: { ids: string[] }) => {
      const today = getTodayYMD();

      // 여러 명의 API 호출을 동시에 실행
      return Promise.all(
        ids.map((id) =>
          api.createAttendanceAPI(id, {
            date: today,
            status: "PRESENT", // 단체 출결 등록은 무조건 PRESENT
          })
        )
      );
    },
    onSuccess: () => {
      // 모든 학생의 출결이 등록되었으므로 수강생 목록 및 관련 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      alert("오늘의 출결 등록이 완료되었습니다.");
    },
    onError: () => {
      alert("출결 등록 중 오류가 발생했습니다.");
    },
  });
};
