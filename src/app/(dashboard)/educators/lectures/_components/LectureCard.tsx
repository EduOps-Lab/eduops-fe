"use client";

import { useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lecture } from "@/types/lectures";

import { LectureDetailModal } from "./LectureDetailModal";
import { LectureStatusBadge } from "./LectureStatusBadge";

type LectureCardProps = {
  lecture: Lecture;
};

export function LectureCard({ lecture }: LectureCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="relative overflow-hidden">
        <CardContent className="pt-6">
          {/* 과목 및 학년 */}
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {lecture.subject}({lecture.category}) · {lecture.grade}
            </p>
            <p className="text-sm font-medium">
              <span className="text-muted-foreground">👥</span>{" "}
              {lecture.currentStudents}/{lecture.maxStudents}
            </p>
          </div>

          {/* 수업명 및 상태 */}
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-xl font-bold">{lecture.name}</h3>
            {lecture.status && <LectureStatusBadge status={lecture.status} />}
          </div>

          {/* 강사명 */}
          <p className="mb-4 text-sm text-muted-foreground">
            담당 강사 {lecture.instructor}
          </p>

          {/* 시간 및 요일 */}
          <div className="flex items-center gap-2 text-sm">
            <span>🕐</span>
            <span>
              {lecture.schedule.days.join(", ")} · {lecture.schedule.time}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            상세 보기
          </Button>
        </CardFooter>
      </Card>

      <LectureDetailModal
        lecture={lecture}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
