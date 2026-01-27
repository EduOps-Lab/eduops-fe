"use client";

import { LectureSchedule } from "@/types/lectures";

type LectureDetailScheduleProps = {
  schedule: LectureSchedule;
};

export function LectureDetailSchedule({
  schedule,
}: LectureDetailScheduleProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">수업 시간</p>
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <span className="text-2xl">🕐</span>
        <div>
          <p className="font-medium">{schedule.days.join(", ")}</p>
          <p className="text-sm text-muted-foreground">{schedule.time}</p>
        </div>
      </div>
    </div>
  );
}
