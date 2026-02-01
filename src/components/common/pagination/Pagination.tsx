"use client";

import { Button } from "@/components/ui/button";
import { PaginationType } from "@/types/students.type";

type PaginationProps = {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
};

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const {
    totalCount,
    totalPage,
    currentPage,
    limit,
    hasNextPage,
    hasPrevPage,
  } = pagination;

  const PAGE_GROUP_SIZE = 5;

  const hasData = totalCount > 0;

  const startIndex = hasData ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = hasData ? Math.min(currentPage * limit, totalCount) : 0;

  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPage);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-center text-sm text-muted-foreground">
        전체 {totalCount}개 중 {startIndex}-{endIndex} 표시
      </p>

      <div className="flex justify-center gap-1">
        <Button
          variant="outline"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          이전
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            className="w-9"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
