"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lecture } from "@/types/lectures";
import { LectureDetailEnrollment } from "@/app/(dashboard)/educators/lectures/_components/detail/LectureDetailEnrollment";
import { LectureDetailInfo } from "@/app/(dashboard)/educators/lectures/_components/detail/LectureDetailInfo";
import { LectureDetailSchedule } from "@/app/(dashboard)/educators/lectures/_components/detail/LectureDetailSchedule";
import { LectureDetailStudents } from "@/app/(dashboard)/educators/lectures/_components/detail/LectureDetailStudents";

type LectureDetailModalProps = {
  lecture: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LectureDetailModal({
  lecture,
  open,
  onOpenChange,
}: LectureDetailModalProps) {
  if (!lecture) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {lecture.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <LectureDetailInfo lecture={lecture} />

          {/* 수강 인원 */}
          <LectureDetailEnrollment
            currentStudents={lecture.currentStudents}
            maxStudents={lecture.maxStudents}
            onOpenExams={() => {
              // TODO: 시험지 목록 페이지로 이동
              console.log("시험지 목록:", lecture.id);
              // router.push(`/educators/lectures/${lecture.id}/exams`);
            }}
          />

          {/* 시간표 */}
          <LectureDetailSchedule schedule={lecture.schedule} />

          {/* 등록 학생 목록 */}
          <LectureDetailStudents students={lecture.students} />

          {/* 액션 버튼 */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={() => {
                // TODO: 수정 페이지로 이동 또는 수정 모달
                console.log("수정:", lecture.id);
                // router.push(`/educators/lectures/${lecture.id}/edit`);
              }}
            >
              수정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
