"use client";

import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";

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
      <Title
        title="수업 등록/수정"
        description="새로운 강의를 생성하고 수강생을 모집하세요."
      />
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
