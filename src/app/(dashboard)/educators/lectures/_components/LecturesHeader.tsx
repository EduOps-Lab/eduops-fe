"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LecturesHeader() {
  return (
    <div className="space-y-6">
      {/* 제목 및 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">수업 목록 & 편성 현황</h1>
          <p className="mt-2 text-muted-foreground">
            진행 중인 클래스와 상담 및 정보를 모아 보고 대기자·출석 조치를
            한눈에 관리하세요.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <span>📅</span>
            스케줄 관리
          </Button>
          <Button className="gap-2">
            <span>➕</span>
            수업 개설
          </Button>
        </div>
      </div>

      {/* 검색 (UI만 표시, 기능 없음) */}
      <div>
        <label
          htmlFor="lecture-search"
          className="mb-2 block text-sm font-medium"
        >
          검색
        </label>
        <div className="relative">
          <Input
            id="lecture-search"
            type="text"
            placeholder="수업명 / 강사 / 과목 검색"
            disabled
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
        </div>
      </div>
    </div>
  );
}
