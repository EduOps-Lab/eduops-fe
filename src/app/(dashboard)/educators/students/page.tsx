"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/common/header/Title";
import SelectBtn from "@/components/common/button/SelectBtn";
import { useModal } from "@/providers/ModalProvider";
import { useStudentSelectionStore } from "@/stores/studentsList.store";
import { mockLectures } from "@/data/lectures.mock";
import {
  PaginationType,
  SchoolYear,
  StudentListQuery,
  StudentStatus,
} from "@/types/students.type";
import {
  useCreateMassAttendance,
  useEnrollmentList,
  useUpdateEnrollment,
} from "@/hooks/useEnrollment";
import {
  GRADE_SELECT_OPTIONS,
  STATUS_SELECT_OPTIONS,
  STUDENT_STATUS_LABEL,
  STUDENTS_TABLE_COLUMNS,
} from "@/constants/students.default";
import { Pagination } from "@/components/common/pagination/Pagination";
import { CheckModal } from "@/components/common/modals/CheckModal";
import { getTodayYMD } from "@/utils/date";

import { StudentChangeModal } from "./_components/students-modal/ClassChangeModal";
import { TalkNotificationModal } from "./_components/students-modal/TalkNotificationModal";
import { StudentTableData } from "./_components/table/StudentTableColumns";
import { StudentCreateModal } from "./_components/students-modal/StudentCreateModal";

const PAGE_LIMIT = 10;

export default function StudentsListPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const {
    selectedStudentIds,
    toggleStudent,
    addStudents,
    removeStudents,
    resetSelection,
  } = useStudentSelectionStore();

  const [query, setQuery] = useState<StudentListQuery>({
    keyword: "",
    year: null,
    status: null,
    lectureId: null,
    page: 1,
    limit: PAGE_LIMIT,
  });

  // 수강생 목록 조회
  const { data, isPending, isError } = useEnrollmentList(query);
  const students = data?.items || [];
  const pagination: PaginationType = data?.pagination ?? {
    totalCount: 0,
    totalPage: 1,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // 수강생 정보 업데이트
  const { mutate: updateStatus } = useUpdateEnrollment();

  // 단체 출결 등록
  const { mutate: createMassAttendance, isPending: isRegistering } =
    useCreateMassAttendance();

  // 현재 페이지의 모든 학생이 선택되었는지 여부 확인
  const isCurrentPageAllSelected =
    students.length > 0 &&
    students.every((s) => selectedStudentIds.includes(s.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // 현재 페이지 학생들만 스토어에 추가
      const studentsToSelect = students.map((s) => ({
        enrollmentId: s.id,
        name: s.studentName,
        lectureTitle: s.lecture.title,
        phoneNumber: s.studentPhone,
        parentPhone: s.parentPhone,
      }));
      addStudents(studentsToSelect);
    } else {
      // 현재 페이지 학생들의 ID만 추출하여 스토어에서 제거
      const currentPageIds = students.map((s) => s.id);
      removeStudents(currentPageIds);
    }
  };

  // 수강생 상세 페이지 이동
  const handleNavigate = (id: string) => {
    router.push(`/educators/students/${id}`);
  };

  // 수강생 재원 상태 변경
  const handleStatusChange = (id: string, status: StudentStatus) => {
    const student = students.find((s) => s.id === id);
    if (!student) return;

    const oldStatusLabel = STUDENT_STATUS_LABEL[student.status];
    const newStatusLabel = STUDENT_STATUS_LABEL[status];

    openModal(
      <CheckModal
        title="상태 변경 확인"
        description={`${student.studentName} 학생의 상태를 ${oldStatusLabel}에서 ${newStatusLabel}으로 변경하시겠습니까?`}
        confirmText="확인"
        onConfirm={() => {
          updateStatus(
            { id, data: { status: status } },
            {
              onSuccess: () => {
                alert("상태 변경이 완료되었습니다.");
              },
              onError: () => {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
              },
            }
          );
        }}
      />
    );
  };

  const handleAttendanceClick = () => {
    if (selectedStudentIds.length === 0) return;

    openModal(
      <CheckModal
        title="일괄 출결 등록"
        description={`선택한 ${selectedStudentIds.length}명의 학생을 오늘(${getTodayYMD()})자로 '출석' 처리하시겠습니까?`}
        confirmText="출석 등록"
        onConfirm={() => {
          createMassAttendance(
            { ids: selectedStudentIds },
            {
              onSuccess: () => {
                resetSelection();
              },
            }
          );
        }}
      />
    );
  };

  //TODO: 강의 리스트에서 강의 선택 시 필터링 기능 추가(미완)
  const handleLectureClick = (lectureId: string) => {
    setQuery((prev) => ({
      ...prev,
      lectureId: prev.lectureId === lectureId ? null : lectureId,
    }));
  };

  if (isError) return <div>조회 실패</div>;

  const columns = StudentTableData({
    selectedStudents: selectedStudentIds,
    onToggleStudent: (student) =>
      toggleStudent({
        enrollmentId: student.id,
        name: student.studentName,
        lectureTitle: student.lecture.title,
        phoneNumber: student.studentPhone,
        parentPhone: student.parentPhone,
      }),
    onNavigate: handleNavigate,
    onStatusChange: handleStatusChange,
  });

  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1200px]">
      <Title
        title="전체 학생 관리"
        description={`총 ${pagination.totalCount}명의 학생 정보를 관리하고 있습니다.`}
      />

      {/* 모달 버튼 */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => openModal(<StudentCreateModal />)}
        >
          학생 등록
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<StudentChangeModal />)}
        >
          수업 변경
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<TalkNotificationModal />)}
        >
          알림 발송
        </Button>
        <Button
          variant="default"
          disabled={selectedStudentIds.length === 0 || isRegistering}
          className="cursor-pointer"
          onClick={handleAttendanceClick}
        >
          {isRegistering ? "등록 중..." : "출결 등록"}
        </Button>
      </div>

      {/* 수업 선택 */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold mr-1">수업 선택</h2>
          <p className="text-sm text-muted-foreground">전체 수업</p>
          <span className="inline-flex items-center justify-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {mockLectures.length}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {mockLectures.map((lecture) => (
            <div
              key={lecture.id}
              onClick={() => handleLectureClick(lecture.id)}
              className={`flex-1 min-w-[100px] p-3 border rounded cursor-pointer ${query.lectureId === lecture.id ? "bg-primary/10 border-primary" : ""}`}
            >
              <p className="text-sm font-medium truncate">{lecture.name}</p>
              <p className="text-xs text-muted-foreground">
                {lecture.currentStudents}/{lecture.maxStudents}명
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2">
          <Input
            className="w-full md:w-[200px] lg:w-[300px]"
            placeholder="이름, 전화번호 검색..."
            value={query.keyword}
            onChange={(e) =>
              setQuery((prev) => ({
                ...prev,
                keyword: e.target.value,
                page: 1,
              }))
            }
          />
          <SelectBtn
            className="max-w-[120px]"
            value={query.year ?? "all"}
            placeholder="학년 선택"
            options={GRADE_SELECT_OPTIONS}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                year: value === "all" ? null : (value as SchoolYear),
                page: 1,
              }))
            }
          />
          <SelectBtn
            className="max-w-[120px]"
            value={query.status ?? "all"}
            placeholder="상태 선택"
            options={STATUS_SELECT_OPTIONS}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                status: value === "all" ? null : (value as StudentStatus),
                page: 1,
              }))
            }
          />
        </div>
        <span className="flex items-end text-sm text-muted-foreground">
          선택된 학생 {selectedStudentIds.length}명
        </span>
      </div>

      {/* 테이블 */}
      <div className="border rounded-lg overflow-x-auto min-h-[580px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap w-[50px]">
                <Checkbox
                  checked={isCurrentPageAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {STUDENTS_TABLE_COLUMNS.map((col) => (
                <TableHead key={col.key} className="whitespace-nowrap">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={STUDENTS_TABLE_COLUMNS.length + 1}
                  className="text-center"
                >
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={STUDENTS_TABLE_COLUMNS.length + 1}
                  className="text-center"
                >
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              students.map((studentData) => (
                <TableRow key={studentData.id}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="whitespace-nowrap text-sm"
                    >
                      {col.render(studentData)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        pagination={pagination as PaginationType}
        onPageChange={(page) =>
          setQuery((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
}
