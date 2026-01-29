"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  mockGradingExamInfo,
  mockGradingQuestions,
  mockGradingReportOverview,
  mockGradingReportQuestionStats,
  mockGradingReportStudentRows,
  mockGradingStudents,
  mockGradingSummary,
} from "@/data/grading.mock";

import { GradingPageHeader } from "./_components/GradingPageHeader";
import { StudentListSidebar } from "./_components/StudentListSidebar";
import { GradingSummaryCards } from "./_components/GradingSummaryCards";
import { QuestionAnswerList } from "./_components/QuestionAnswerList";
import { GradingResultModal } from "./_modals/grading-result/GradingResultModal";

export default function GradingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const isResultModalOpen = modal === "result";

  const selectedStudentId = mockGradingStudents[0]?.id ?? "";

  const openResultModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "result");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const closeResultModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="container mx-auto p-6">
      <GradingPageHeader
        examName={mockGradingExamInfo.examName}
        lectureName={mockGradingExamInfo.lectureName}
        examSubtitle={mockGradingExamInfo.examSubtitle}
      />

      <div className="flex gap-6">
        {/* 왼쪽: 학생 리스트 */}
        <StudentListSidebar
          students={mockGradingStudents}
          selectedStudentId={selectedStudentId}
          onOpenResultModalAction={openResultModal}
        />

        {/* 오른쪽: 메인 영역 */}
        <div className="flex-1">
          {selectedStudentId ? (
            <>
              {/* 요약 카드 */}
              <GradingSummaryCards summary={mockGradingSummary} />

              {/* 문항별 답안 입력 */}
              <QuestionAnswerList
                examSubtitle={mockGradingExamInfo.examSubtitle}
                questions={mockGradingQuestions}
              />

              {/* 하단 액션 버튼 */}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" disabled>
                  임시저장
                </Button>
                <Button disabled>저장</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
              <p>학생을 선택하면 답안을 입력할 수 있습니다.</p>
            </div>
          )}
        </div>
      </div>

      <GradingResultModal
        open={isResultModalOpen}
        onOpenChange={(open) => (open ? openResultModal() : closeResultModal())}
        title={mockGradingExamInfo.examName}
        subtitle={`${mockGradingExamInfo.examSubtitle} ${mockGradingExamInfo.examName}`}
        overview={mockGradingReportOverview}
        studentRows={mockGradingReportStudentRows}
        questionStats={mockGradingReportQuestionStats}
      />
    </div>
  );
}
