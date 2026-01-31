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

  const hasData = totalCount > 0;

  const startIndex = hasData ? (currentPage - 1) * limit + 1 : 0;

  const endIndex = hasData ? startIndex + currentPage - 1 : 0;

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

        {Array.from({ length: totalPage }).map((_, idx) => {
          const page = idx + 1;
          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}

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
