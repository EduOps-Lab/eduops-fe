"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ExamSelectSectionProps = {
  disabled?: boolean;
};

export function ExamSelectSection({
  disabled = false,
}: ExamSelectSectionProps) {
  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">등록된 시험 선택</h2>
      </div>
      <CardContent className="p-6">
        <Select disabled={disabled}>
          <SelectTrigger className="w-full" aria-label="등록된 시험 선택">
            <SelectValue placeholder="새 시험 등록" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">새 시험 등록</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
