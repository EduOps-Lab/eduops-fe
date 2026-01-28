"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { mockLectures } from "@/data/lectures.mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/common/header/Title";
import { StudentListQuery } from "@/types/students.type";
import SelectBtn from "@/components/common/button/SelectBtn";
import {
  GRADE_SELECT_OPTIONS,
  STATUS_SELECT_OPTIONS,
} from "@/constants/students.default";
import { createStudentColumns } from "@/app/(dashboard)/educators/students/_components/table/StudentTableColumns";
import { useModal } from "@/providers/ModalProvider";
import { useStudentSelectionStore } from "@/stores/studentsList.store";
import { fetchStudentsAPI } from "@/services/students.service";

import { StudentCreateModal } from "./_components/students-modal/StudentCreateModal";
import { StudentChangeModal } from "./_components/students-modal/ClassChangeModal";
import { TalkNotificationModal } from "./_components/students-modal/TalkNotificationModal";

export default function StudentsListPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const { selectedStudentIds, setSelectedStudentIds, toggleStudent } =
    useStudentSelectionStore();

  const [query, setQuery] = useState<StudentListQuery>({
    keyword: "",
    schoolYear: null,
    status: null,
    lectureId: null,
  });

  // 학생 목록 조회
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

  // 체크박스 - 전체 선택
  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = students.map((s) => s.enrollmentId);

    if (checked) {
      // 현재 페이지의 모든 학생 ID를 기존 선택에 추가
      setSelectedStudentIds(
        Array.from(new Set([...selectedStudentIds, ...currentPageIds]))
      );
    } else {
      // 현재 페이지의 학생 ID만 제거
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  // 체크박스 - 개별 선택
  const handleSelectStudent = (id: string) => {
    toggleStudent(id);
  };

  // 상세 페이지 이동
  const handleNavigate = (enrollmentId: string) => {
    router.push(`/educators/students/${enrollmentId}`);
  };

  // 전체 선택 여부 계산
  const isAllSelected =
    students.length > 0 &&
    students.every((s) => selectedStudentIds.includes(s.enrollmentId));

  // 수업 필터
  const handleLectureClick = (lectureId: string) => {
    setQuery((prev: StudentListQuery) => ({
      ...prev,
      lectureId: prev.lectureId === lectureId ? null : lectureId,
    }));
  };

  // Tanstack Table 인스턴스
  const table = useReactTable({
    data: students,
    columns: createStudentColumns({
      selectedStudents: selectedStudentIds,
      onSelectStudent: handleSelectStudent,
      onNavigate: handleNavigate,
      isAllSelected,
      onSelectAll: handleSelectAll,
    }),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.enrollmentId,
  });

  if (isError) return <div>조회 실패</div>;

  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1200px]">
      <Title
        title="전체 학생 관리"
        description={`총 ${students.length}명의 학생 정보를 관리하고 있습니다.`}
      />

      {/* 모달 오픈 버튼 */}
      <div className="flex gap-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => openModal(<StudentCreateModal />)}
        >
          학생 등록
        </Button>

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<StudentChangeModal />)}
        >
          수업 변경
        </Button>

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={selectedStudentIds.length === 0}
          onClick={() => openModal(<TalkNotificationModal />)}
        >
          알림 발송
        </Button>

        <Button
          className="cursor-pointer"
          variant="default"
          disabled={selectedStudentIds.length === 0}
        >
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
              className={`flex-1 min-w-[100px] p-3 border rounded cursor-pointer ${
                query.lectureId === lecture.id
                  ? "bg-primary/10 border-primary"
                  : ""
              }`}
            >
              <p className="text-sm font-medium truncate">{lecture.name}</p>
              <p className="text-xs text-muted-foreground">
                {lecture.currentStudents}/{lecture.maxStudents}명
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 섹션 */}
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
            value={query.schoolYear ?? "all"}
            placeholder="학년 선택"
            options={GRADE_SELECT_OPTIONS}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                schoolYear: value === "all" ? null : value,
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

        {/* 선택된 학생 수*/}
        <span className="flex items-end text-sm text-muted-foreground">
          선택된 학생 {selectedStudentIds.length}명
        </span>
      </div>

      {/* 데이터 테이블 */}
      {/* TODO: 공용 컴포넌트로 분리 */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap"
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : "auto",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="text-center py-4 text-muted-foreground"
                >
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="text-center py-4 text-muted-foreground"
                >
                  학생이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
