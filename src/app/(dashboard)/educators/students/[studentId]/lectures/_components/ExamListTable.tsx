"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LectureExamResult } from "@/types/lecture-exams.type";

type ExamListTableProps = {
  exams: LectureExamResult[];
  selectedExamIds: string[];
  onSelectExam: (examId: string) => void;
};

export default function ExamListTable({
  exams,
  selectedExamIds,
  onSelectExam,
}: ExamListTableProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="space-y-4 text-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>시험명</TableHead>
            <TableHead>시험일</TableHead>
            <TableHead className="text-center">과목</TableHead>
            <TableHead className="text-center">점수</TableHead>
            <TableHead className="text-center">학급 평균</TableHead>
            <TableHead className="text-center">학급 석차</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.slice(0, visibleCount).map((exam) => (
            <TableRow
              key={exam.examId}
              className={`cursor-pointer hover:bg-muted/50 ${
                selectedExamIds.includes(exam.examId) ? "bg-primary/10" : ""
              }`}
              onClick={() => onSelectExam(exam.examId)}
            >
              <TableCell className="font-medium">{exam.examName}</TableCell>
              <TableCell>{exam.examDate}</TableCell>
              <TableCell className="text-center">{exam.subject}</TableCell>
              <TableCell className="text-center font-semibold">
                {exam.score}점
              </TableCell>
              <TableCell className="text-center">
                {exam.classAverage}점
              </TableCell>
              <TableCell className="text-center">
                {exam.classRank}등 / {exam.totalStudents}명
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {visibleCount < exams.length && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore}>
            더보기 ({exams.length - visibleCount})
          </Button>
        </div>
      )}
    </div>
  );
}
