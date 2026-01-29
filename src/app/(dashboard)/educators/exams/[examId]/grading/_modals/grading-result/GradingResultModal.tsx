"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { GradingResultSummary } from "./GradingResultSummary";
import { StudentScoreTable } from "./StudentScoreTable";
import { QuestionStatsTable } from "./QuestionStatsTable";
import {
  GradingReportOverview,
  GradingReportQuestionStat,
  GradingReportStudentRow,
} from "./types";

type GradingResultModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  overview: GradingReportOverview;
  studentRows: GradingReportStudentRow[];
  questionStats: GradingReportQuestionStat[];
};

export function GradingResultModal({
  open,
  onOpenChange,
  title,
  subtitle,
  overview,
  studentRows,
  questionStats,
}: GradingResultModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {subtitle} · {overview.examDate}
          </p>
        </DialogHeader>

        <Separator />

        <div className="space-y-5">
          <GradingResultSummary overview={overview} />
          <StudentScoreTable rows={studentRows} />
          <QuestionStatsTable stats={questionStats} />
        </div>

        <Separator />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={() => onOpenChange(false)}>최종 저장</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
