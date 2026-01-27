"use client";

import { Button } from "@/components/ui/button";

type CreatePageHeaderProps = {
  isSaved: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function CreatePageHeader({
  isSaved,
  onSave,
  onCancel,
}: CreatePageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">수업 등록/수정</h1>
        <p className="text-muted-foreground mt-1">
          새로운 강의를 생성하고 수강생을 모집하세요.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={onCancel} variant="outline">
          {isSaved ? "수정" : "취소"}
        </Button>
        <Button onClick={onSave} disabled={isSaved}>
          저장
        </Button>
      </div>
    </div>
  );
}
