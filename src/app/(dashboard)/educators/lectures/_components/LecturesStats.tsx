"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLecturesStore } from "@/stores/lectures.store";

export function LecturesStats() {
  const { lectures } = useLecturesStore();

  const totalStudents = lectures.reduce(
    (sum, lecture) => sum + lecture.currentStudents,
    0
  );
  const totalCapacity = lectures.reduce(
    (sum, lecture) => sum + lecture.maxStudents,
    0
  );
  const occupancyRate =
    totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <div>
            <p className="text-sm text-muted-foreground">총 클래스</p>
            <p className="text-3xl font-bold">{lectures.length}개</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div>
            <p className="text-sm text-muted-foreground">등록 인원</p>
            <p className="text-3xl font-bold">{totalStudents}명</p>
            <p className="text-xs text-muted-foreground">
              정원 대비 {occupancyRate}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
