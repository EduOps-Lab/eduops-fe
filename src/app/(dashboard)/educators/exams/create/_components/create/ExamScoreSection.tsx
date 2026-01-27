"use client";

import { Card, CardContent } from "@/components/ui/card";

type ExamScoreSectionProps = {
  totalQuestions: number;
  totalScore: number;
  errorMessage?: string;
};

export function ExamScoreSection({
  totalQuestions,
  totalScore,
  errorMessage,
}: ExamScoreSectionProps) {
  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">⚙️ 문항 및 배점 구성</h2>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-8">
          {/* 총 문항 수 */}
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">총 문항 수</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold">{totalQuestions}</div>
              <div className="text-lg text-muted-foreground">문항</div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              문항 수 입력 시 100점 기준으로 자동 배점됩니다.
            </div>
          </div>

          {/* 화살표 */}
          <div className="text-3xl text-muted-foreground">→</div>

          {/* 총 배점 (만점) */}
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">
              총 배점 (만점)
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold">{totalScore}</div>
              <div className="text-lg text-muted-foreground">점</div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              만점 100점 기준입니다. 문항 배점을 입력해 합계를 맞춰주세요.
            </div>
          </div>
        </div>
        {errorMessage && (
          <p className="text-xs text-red-500 mt-4">{errorMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}
