"use client";

import { Button } from "@/components/ui/button";

type ExamsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  isUiOnly?: boolean;
};

export function ExamsPagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  isUiOnly = false,
}: ExamsPaginationProps) {
  const hasPages = totalItems > 0 && totalPages > 0;
  const displayStart = totalItems === 0 ? 0 : startIndex + 1;
  const displayEnd = totalItems === 0 ? 0 : endIndex;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        전체 {totalItems}개 중 {displayStart}-{displayEnd} 표시
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="h-8 rounded-md px-3 text-xs"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isUiOnly || !hasPages || currentPage === 1}
        >
          이전
        </Button>
        <Button
          variant="outline"
          className="h-8 rounded-md px-3 text-xs"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isUiOnly || !hasPages || currentPage === totalPages}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
