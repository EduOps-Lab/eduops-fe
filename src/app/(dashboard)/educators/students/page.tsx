"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
import { fetchStudentsAPI } from "@/services/students.service";
import { mockLectures } from "@/data/lectures.mock";
import { StudentListQuery } from "@/types/students.type";
import {
  GRADE_SELECT_OPTIONS,
  STATUS_SELECT_OPTIONS,
  STUDENTS_TABLE_COLUMNS,
} from "@/constants/students.default";

import { StudentChangeModal } from "./_components/students-modal/ClassChangeModal";
import { TalkNotificationModal } from "./_components/students-modal/TalkNotificationModal";
import { StudentTableData } from "./_components/table/StudentTableColumns";
import { StudentCreateModal } from "./_components/students-modal/StudentCreateModal";

export default function StudentsListPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const { selectedStudentIds, setSelectedStudentIds } =
    useStudentSelectionStore();

  const [query, setQuery] = useState<StudentListQuery>({
    keyword: "",
    grade: null,
    status: null,
    lectureId: null,
  });

  const {
    data: students = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["students", query],
    queryFn: () => fetchStudentsAPI(query),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  // 전체 선택
  const isAllSelected =
    students.length > 0 &&
    students.every((s) => selectedStudentIds.includes(s.enrollmentId));

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = students.map((s) => s.enrollmentId);
    if (checked) {
      setSelectedStudentIds([
        ...new Set([...selectedStudentIds, ...currentPageIds]),
      ]);
    } else {
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  const handleSelectStudent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudentIds([...selectedStudentIds, id]);
    } else {
      setSelectedStudentIds(selectedStudentIds.filter((sid) => sid !== id));
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    console.log("상태 변경", id, status);
    // TODO: API 호출 후 상태 업데이트
  };

  const handleLectureClick = (lectureId: string) => {
    setQuery((prev) => ({
      ...prev,
      lectureId: prev.lectureId === lectureId ? null : lectureId,
    }));
  };

  const handleNavigate = (enrollmentId: string) => {
    router.push(`/educators/students/${enrollmentId}`);
  };

  if (isError) return <div>조회 실패</div>;

  const columns = StudentTableData({
    selectedStudents: selectedStudentIds,
    onSelectStudent: handleSelectStudent,
    onStatusChange: handleStatusChange,
    onNavigate: handleNavigate,
  });

  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1200px]">
      <Title
        title="전체 학생 관리"
        description={`총 ${students.length}명의 학생 정보를 관리하고 있습니다.`}
      />

      {/* 모달 버튼 */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => openModal(<StudentCreateModal />)}
        >
          학생 등록
        </Button>
        <Button
          variant="outline"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<StudentChangeModal />)}
        >
          수업 변경
        </Button>
        <Button
          variant="outline"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<TalkNotificationModal />)}
        >
          알림 발송
        </Button>
        <Button variant="default" disabled={selectedStudentIds.length === 0}>
          출결 등록
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
              setQuery((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
          <SelectBtn
            className="max-w-[120px]"
            value={query.grade ?? "all"}
            placeholder="학년 선택"
            options={GRADE_SELECT_OPTIONS}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                grade: value === "all" ? null : value,
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
                status: value === "all" ? null : value,
              }))
            }
          />
        </div>
        <span className="flex items-end text-sm text-muted-foreground">
          선택된 학생 {selectedStudentIds.length}명
        </span>
      </div>

      {/* 테이블 */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap w-[50px]">
                <Checkbox
                  checked={isAllSelected}
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
            ) : (
              students.map((studentData) => (
                <TableRow key={studentData.enrollmentId}>
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
    </div>
  );
}
