"use client";

import { EXAMS_UI_ONLY } from "@/constants/exam.defaults";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExamsStore } from "@/stores/exams.store";

import { ExamTableRow } from "./ExamTableRow";
import { ExamsPagination } from "./ExamsPagination";

export function ExamsList() {
  const isUiOnly = EXAMS_UI_ONLY;
  const {
    exams,
    selectedIds,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    selectAll,
    toggleSelected,
    clearSelection,
  } = useExamsStore();

  // 페이지네이션
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExams = exams.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll(paginatedExams.map((exam) => exam.id));
    } else {
      clearSelection();
    }
  };

  const handleSelectExam = (id: string, checked: boolean) => {
    toggleSelected(id, checked);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) {
      console.log("삭제할 시험 ID:", selectedIds);
      clearSelection();
    }
  };

  return (
    <div className="space-y-6">
      {/* 필터 탭 */}
      <div className="flex gap-2">
        <Button variant="default" className="rounded-full" disabled>
          진행 중
        </Button>
        <Button variant="outline" className="rounded-full" disabled>
          채점 완료
        </Button>
      </div>

      {/* 검색 및 액션 바 */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="과제 검색"
            disabled
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
        </div>
        <Select>
          <SelectTrigger className="w-[140px]" disabled={isUiOnly}>
            <SelectValue placeholder="필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
          </SelectContent>
        </Select>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="gap-2"
              disabled={isUiOnly || selectedIds.length === 0}
            >
              선택 삭제
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>선택한 시험을 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedIds.length}개의 시험이 삭제됩니다. 이 작업은 되돌릴 수
                없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSelected}
                disabled={isUiOnly || selectedIds.length === 0}
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* 테이블 */}
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    paginatedExams.length > 0 &&
                    paginatedExams.every((exam) =>
                      selectedIds.includes(exam.id)
                    )
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="cursor-pointer"
                  disabled={isUiOnly}
                  aria-label="현재 페이지 전체 선택"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                과제명
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">반</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                등록일
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
              <th className="px-4 py-3 text-left text-sm font-medium">작업</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExams.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              paginatedExams.map((exam) => (
                <ExamTableRow
                  key={exam.id}
                  exam={exam}
                  isSelected={selectedIds.includes(exam.id)}
                  onSelect={(checked) => handleSelectExam(exam.id, checked)}
                  isUiOnly={isUiOnly}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <ExamsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={exams.length}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={Math.min(endIndex, exams.length)}
        onPageChange={setCurrentPage}
        isUiOnly={isUiOnly}
      />
    </div>
  );
}
