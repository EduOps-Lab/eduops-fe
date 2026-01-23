"use client";

import { Button } from "@/components/ui/button";
import { useLecturesStore } from "@/stores/lectures.store";

import { LectureCard } from "./LectureCard";

export function LecturesList() {
  const { lectures, visibleCount, loadMore, resetVisibleCount } =
    useLecturesStore();

  const visibleLectures = lectures.slice(0, visibleCount);
  const hasMore = visibleCount < lectures.length;
  const isExpanded = visibleCount > 4;

  return (
    <div className="space-y-6">
      {/* 카드 그리드 - 2x2 형태 */}
      <div className="grid grid-cols-2 gap-6">
        {visibleLectures.map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>

      {/* 더보기/접기 버튼 */}
      <div className="flex justify-center gap-3">
        {hasMore && (
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            더보기 ({lectures.length - visibleCount})
          </Button>
        )}
        {isExpanded && (
          <Button
            onClick={resetVisibleCount}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            접기
          </Button>
        )}
      </div>
    </div>
  );
}
