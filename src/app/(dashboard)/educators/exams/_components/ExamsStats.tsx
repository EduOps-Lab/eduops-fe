"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useExamsStore } from "@/stores/exams.store";

export function ExamsStats() {
  const { exams } = useExamsStore();
  const totalExams = exams.length;
  const clinicExams = exams.filter((exam) => exam.status === "진행 중").length;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">총 시험 등록</p>
              <p className="text-3xl font-bold">{totalExams}개</p>
              <p className="text-xs text-muted-foreground">등록된 시험 수</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">클리닉 대상 시험</p>
              <p className="text-3xl font-bold">{clinicExams}개</p>
              <p className="text-xs text-muted-foreground">
                클리닉 대상 클래스 기준
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
