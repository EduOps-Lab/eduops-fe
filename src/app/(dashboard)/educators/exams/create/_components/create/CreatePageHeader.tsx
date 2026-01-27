"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CreatePageHeaderProps = {
  totalQuestions: number;
  totalScore: number;
  isSaved?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
};

export function CreatePageHeader({
  totalQuestions,
  totalScore,
  isSaved = false,
  onSave,
  onCancel,
}: CreatePageHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">시험 등록/수정</h1>
      </div>
      <div className="flex gap-4">
        {/* 요약 카드 */}
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">
              등록된 문항
            </div>
            <div className="text-2xl font-bold">{totalQuestions} 문항</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">총점</div>
            <div className="text-2xl font-bold">{totalScore} 점</div>
          </CardContent>
        </Card>
        {/* 버튼 */}
        <div className="flex gap-3 items-start pt-1">
          <Button onClick={onCancel} variant="outline">
            {isSaved ? "수정" : "취소"}
          </Button>
          <Button onClick={onSave} disabled={isSaved}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
