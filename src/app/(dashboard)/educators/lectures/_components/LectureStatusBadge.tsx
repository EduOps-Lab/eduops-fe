"use client";

import { LectureStatus } from "@/types/lectures";

const statusStyles: Record<LectureStatus, string> = {
  개강전: "bg-blue-100 text-blue-800",
  진행중: "bg-green-100 text-green-800",
  완료: "bg-gray-100 text-gray-800",
};

type LectureStatusBadgeProps = {
  status: LectureStatus;
};

export function LectureStatusBadge({ status }: LectureStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
