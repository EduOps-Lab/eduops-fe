"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClinicStore } from "@/stores/clinic.store";

export function ClinicFilters() {
  const { selectedIds, markAsCompleted } = useClinicStore();

  const handleMarkCompleted = () => {
    if (selectedIds.length > 0) {
      markAsCompleted();
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      {/* 좌측 필터 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">수업:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="전체 수업" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 수업</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">시험:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="모든 시험" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 시험</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 우측 액션 */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="h-9 w-9 p-0"
          aria-label="필터 초기화"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={handleMarkCompleted}
          disabled={selectedIds.length === 0}
        >
          완료 표시
        </Button>
      </div>
    </div>
  );
}
