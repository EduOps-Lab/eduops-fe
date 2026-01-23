"use client";

import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lecture } from "@/types/lectures";

type LectureCardProps = {
  lecture: Lecture;
};

export function LectureCard({ lecture }: LectureCardProps) {
  return (
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

        {/* 수업명 */}
        <h3 className="mb-2 text-xl font-bold">{lecture.name}</h3>

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
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/educators/lectures/${lecture.id}/edit`}>상세 보기</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
