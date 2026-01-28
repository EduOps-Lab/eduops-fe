"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GradingPageHeaderProps = {
  examName: string;
  lectureName: string;
  examSubtitle: string;
};

export function GradingPageHeader({
  examName,
  lectureName,
  examSubtitle,
}: GradingPageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      <Title
        title="학생 답안 입력 및 채점 관리"
        description={`${examName} · ${lectureName}`}
      />
      <div className="flex items-center gap-4">
        <Select defaultValue="current">
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="시험 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">
              {examName} · {lectureName}
            </SelectItem>
          </SelectContent>
        </Select>
        <span className="hidden sm:inline text-sm text-muted-foreground">
          {examSubtitle}
        </span>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          돌아가기
        </Button>
      </div>
    </div>
  );
}
