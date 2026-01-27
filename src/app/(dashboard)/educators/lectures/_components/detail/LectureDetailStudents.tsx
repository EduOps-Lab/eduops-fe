"use client";

import { LectureStudent } from "@/types/lectures";

type LectureDetailStudentsProps = {
  students?: LectureStudent[];
};

export function LectureDetailStudents({
  students,
}: LectureDetailStudentsProps) {
  if (!students || students.length === 0) return null;

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">
        등록 학생 ({students.length}명)
      </p>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 bg-muted px-3 py-2 text-sm font-medium border-b">
          <div>이름</div>
          <div>학교 · 학년</div>
          <div>학생 연락처</div>
          <div>학부모 연락처</div>
        </div>
        <div className="max-h-[240px] overflow-y-auto">
          {students.map((student, index) => (
            <div
              key={student.id}
              className={`grid grid-cols-4 gap-4 px-3 py-3 text-sm ${
                index !== students.length - 1 ? "border-b" : ""
              } hover:bg-muted/50 transition-colors`}
            >
              <div className="font-medium">{student.name}</div>
              <div className="text-muted-foreground">
                {student.school} · {student.grade}
              </div>
              <div className="text-muted-foreground">{student.phone}</div>
              <div className="text-muted-foreground">{student.parentPhone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
