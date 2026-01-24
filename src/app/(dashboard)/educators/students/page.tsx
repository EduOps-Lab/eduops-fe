"use client";

import { useEffect, useState } from "react";

import { mockStudentEnrollments } from "@/data/students.mock";
import { mockLectures } from "@/data/lectures.mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/common/header/Title";
import {
  StudentEnrollment,
  StudentEnrollmentStatus,
  StudentListQuery,
} from "@/types/students.type";
import SelectBtn from "@/components/common/button/SelectBtn";
import {
  GRADE_SELECT_OPTIONS,
  STATUS_SELECT_OPTIONS,
  STUDENTS_TABLE_COLUMNS,
} from "@/constants/students.default";
import { StudentTableColumns } from "@/config/StudentTableColumns";

import { StudentCreateModal } from "./_components/modal/StudentCreateModal";
import { StudentChangeModal } from "./_components/modal/ClassChangeModal";
import { TalkNotificationModal } from "./_components/modal/TalkNotificationModal";

export default function StudentsListPage() {
  // 서버 상태
  const [students, setStudents] = useState<StudentEnrollment[]>(
    mockStudentEnrollments
  );

  // 클라이언트 상태
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [query, setQuery] = useState<StudentListQuery>({
    keyword: "",
    grade: null,
    status: null,
    lectureId: null,
  });

  // 모달 상태
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // 필터 변경 시 학생 목록 조회
  useEffect(() => {
    // TODO: 학생 목록 조회 API 호출
    const fetchStudents = async () => {
      const response = await fetchStudentsAPI(query);
      setStudents(response.data);
    };
    fetchStudents();
  }, [query]);

  // 체크박스 - 전체 선택 여부
  const isAllSelected =
    students.length > 0 && selectedStudents.length === students.length;

  // 체크박스 - 전체 선택
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students.map((s) => s.enrollmentId));
    } else {
      setSelectedStudents([]);
    }
  };

  // 체크박스 - 개별 선택
  const handleSelectStudent = (id: string, checked: boolean) => {
    setSelectedStudents((prev) =>
      checked ? [...prev, id] : prev.filter((v) => v !== id)
    );
  };

  // 수업 필터
  const handleLectureClick = (lectureId: string) => {
    setQuery((prev: StudentListQuery) => ({
      ...prev,
      lectureId: prev.lectureId === lectureId ? null : lectureId,
    }));
  };

  // 학생 상태 변경(재원, 휴원, 퇴원)
  const handleStatusChange = (
    enrollmentId: string,
    status: StudentEnrollmentStatus
  ) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.enrollmentId === enrollmentId
          ? {
              ...s,
              student: { ...s.student, enrollment: status },
            }
          : s
      )
    );
  };

  const columns = StudentTableColumns({
    selectedStudents,
    onSelectStudent: handleSelectStudent,
  });

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
          onClick={() => setIsCreateModalOpen(true)}
        >
          학생 등록
        </Button>

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={!selectedStudents.length}
          onClick={() => setIsChangeModalOpen(true)}
        >
          수업 변경
        </Button>

        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={!selectedStudents.length}
          onClick={() => setIsNotificationModalOpen(true)}
        >
          알림 발송
        </Button>

        <Button
          className="cursor-pointer"
          variant="default"
          disabled={!selectedStudents.length}
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
          {mockLectures.slice(0, 6).map((lecture) => (
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
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Input
            className="w-full max-w-[300px]"
            placeholder="이름, 전화번호 검색..."
            value={query.keyword}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />

          <SelectBtn
            className="w-[120px]"
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
            className="w-[120px]"
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
          선택된 학생 {selectedStudents.length}명
        </span>
      </div>

      {/* 데이터 테이블 */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
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
            {students.map((studentData) => {
              return (
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
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* 모달 */}
      <StudentCreateModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      <StudentChangeModal
        open={isChangeModalOpen}
        onOpenChange={setIsChangeModalOpen}
        selectedStudentIds={selectedStudents}
      />
      <TalkNotificationModal
        open={isNotificationModalOpen}
        onOpenChange={setIsNotificationModalOpen}
        selectedStudentIds={selectedStudents}
      />
    </div>
  );
}
