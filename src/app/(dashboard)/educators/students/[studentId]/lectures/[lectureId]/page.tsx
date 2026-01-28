"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";
import { mockLectureExams } from "@/data/lecture-exams.mock";
import { mockLectures } from "@/data/lectures.mock";
import { Card, CardContent } from "@/components/ui/card";

import ExamListTable from "../_components/ExamListTable";
import ScoreChart from "../_components/ScoreChart";

export default function LectureDetailPage() {
  const params = useParams();
  const router = useRouter();

  const studentId = params.studentId as string;
  const lectureId = params.lectureId as string;

  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  // 강의 정보 조회
  const lecture = mockLectures.find((lec) => lec.id === lectureId);

  // 학생의 해당 강의 시험 데이터 조회
  const lectureExamData = mockLectureExams.find(
    (data) => data.lectureId === lectureId && data.studentId === studentId
  );

  if (!lecture) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-8 py-8">
        <p>수업 정보를 찾을 수 없습니다.</p>
        <Button onClick={() => router.back()} className="mt-4 cursor-pointer">
          돌아가기
        </Button>
      </div>
    );
  }

  // 선택된 시험 정보
  const selectedExam = selectedExamId
    ? lectureExamData?.exams.find((exam) => exam.examId === selectedExamId)
    : null;

  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1200px]">
      <div className="flex items-center gap-4">
        <Title
          title={lecture.name}
          description={`${lecture.subject} · ${lecture.instructor} 강사`}
        />
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">
                해당 시험 점수
              </p>
            </div>
            <p className="text-3xl font-bold">
              {selectedExam ? `${selectedExam.score}점` : "-"}
            </p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                {selectedExam ? `${selectedExam.examName}` : "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">
                학급 석차
              </p>
            </div>
            <p className="text-3xl font-bold">
              {selectedExam
                ? `${selectedExam.classRank} / ${selectedExam.totalStudents}`
                : "-"}
            </p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                {selectedExam ? `${selectedExam.examName}` : "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">반 인원</p>
            </div>
            <p className="text-3xl font-bold">
              {selectedExam ? `${selectedExam.totalStudents}명` : "-"}
            </p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                시험 응시생 수
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 성적 변화 그래프 */}
      <Card>
        <CardContent className="p-6">
          <div className="pb-10">
            <p className="text-sm font-bold text-muted-foreground">
              성적 변화 추이
            </p>
          </div>
          {lectureExamData?.exams.length ? (
            <ScoreChart
              exams={lectureExamData.exams}
              selectedExamId={selectedExamId}
            />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              등록된 시험이 없습니다.
            </div>
          )}
        </CardContent>
      </Card>

      {/* 시험 목록 테이블 */}
      <Card>
        <CardContent className="p-6">
          <div className="pb-3">
            <p className="text-sm font-bold text-muted-foreground">시험 목록</p>
          </div>

          {lectureExamData ? (
            <ExamListTable
              exams={lectureExamData.exams}
              selectedExamId={selectedExamId}
              onSelectExam={setSelectedExamId}
            />
          ) : (
            <div className="text-center text-muted-foreground py-8">
              등록된 시험이 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
