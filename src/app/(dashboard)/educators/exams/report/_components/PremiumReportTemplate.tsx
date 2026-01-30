"use client";

import { useState } from "react";
import {
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  Save,
  Check,
  Pencil,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { pdf } from "@react-pdf/renderer";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { KakaoNotificationModal } from "@/components/common/modals/KakaoNotificationModal";
import { mockQuestionResults, mockScoreHistory } from "@/data/report.mock";

import { PremiumReportPdf } from "./PremiumReportPdf";

type ExamData = {
  id: string;
  studentId: string;
  examName: string;
  examDate: string;
  score: number;
  rank: number;
  totalStudents: number;
  averageScore: number;
  attendance: string;
  nextClass: string;
  memo: string;
  studentName: string;
  className: string;
  phone?: string;
  parentPhone?: string;
};

type PremiumReportTemplateProps = {
  examData: ExamData;
};

export function PremiumReportTemplate({
  examData,
}: PremiumReportTemplateProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [attendance, setAttendance] = useState("결석");
  const [reviewTest, setReviewTest] = useState("자료수령");
  const [weaknessType, setWeaknessType] = useState("");
  const [homeworkWord, setHomeworkWord] = useState("미응시");
  const [homeworkTask, setHomeworkTask] = useState("");
  const [homeworkExtra, setHomeworkExtra] = useState("");
  const [message, setMessage] = useState(
    "[수업내용]\n24강 + 25강 (6지문) / 교과서 5과\n\n[과제]\n- 포켓보카 전범위 암기\n- 7주차 주간지 풀이/채점/오답\n- 교과서 5과 교재 02, 03번 풀이/채점/오답"
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const totalPages = 2;

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: 실제 API 호출로 대체
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    setIsSaved(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  const handleOpenKakaoModal = () => {
    if (!isSaved) {
      alert("먼저 저장해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      // PDF 데이터 준비
      const pdfData = {
        studentName: examData.studentName,
        className: examData.className,
        examName: examData.examName,
        examDate: examData.examDate,
        score: examData.score,
        rank: examData.rank,
        totalStudents: examData.totalStudents,
        averageScore: examData.averageScore,
        attendance,
        reviewTest,
        homeworkWord,
        homeworkTask,
        homeworkExtra,
        weaknessType,
        message,
      };

      // PDF 생성
      const blob = await pdf(
        <PremiumReportPdf
          data={pdfData}
          questionResults={mockQuestionResults}
          scoreHistory={mockScoreHistory}
        />
      ).toBlob();

      // 다운로드
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${examData.studentName}_${examData.examName}_프리미엄리포트.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      if (error instanceof Error) {
        alert(`PDF 생성에 실패했습니다: ${error.message}`);
      } else {
        alert("PDF 생성에 실패했습니다.");
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 모달에 전달할 수신자 정보
  const recipients = [
    {
      id: examData.id,
      name: examData.studentName,
      examName: examData.examName,
      score: examData.score,
      className: examData.className,
      phone: examData.phone,
      parentPhone: examData.parentPhone,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 카카오톡 발송 모달 */}
      <KakaoNotificationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        recipients={recipients}
        title="성적표 발송"
        subtitle="프리미엄 리포트 카카오톡 발송"
        defaultMessage={message}
      />
      {/* 상단 헤더 */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">프리미엄 리포트</p>
          <h2 className="text-2xl font-bold">
            {examData.studentName} · {examData.score}점
          </h2>
          <p className="text-sm text-muted-foreground">
            {examData.className} | {examData.rank} / {examData.totalStudents}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleOpenKakaoModal}
            disabled={!isSaved}
          >
            <MessageSquare className="h-4 w-4" />
            카카오톡 발송
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleDownloadPdf}
            disabled={!isSaved || isGeneratingPdf}
          >
            <FileText className="h-4 w-4" />
            {isGeneratingPdf ? "생성 중..." : "성적표 PDF"}
          </Button>
        </div>
      </div>

      {/* 페이지 전환 + 저장 버튼 */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {currentPage} / {totalPages} 페이지
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(2)}
          disabled={currentPage === 2}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="ml-4 flex gap-2 border-l pl-4">
          <Button
            variant="outline"
            onClick={handleEdit}
            disabled={isEditing}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            수정
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !isEditing}
            className={`gap-2 ${isSaved && !isEditing ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            {isSaved && !isEditing ? (
              <>
                <Check className="h-4 w-4" />
                저장완료
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isSaving ? "저장 중..." : "저장"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 페이지 1: 메인 정보 */}
      {currentPage === 1 && (
        <Card>
          <CardContent className="space-y-6 p-6">
            {/* 리포트 타이틀 + 출결/과제 */}
            <div className="grid grid-cols-[1fr_300px] gap-6">
              {/* 좌측: 리포트 타이틀 */}
              <div className="rounded-lg bg-zinc-900 p-6 text-white">
                <p className="text-4xl font-bold">2026</p>
                <p className="text-3xl font-bold">강사이름영어</p>
                <p className="text-3xl font-bold">주간 리포트</p>
              </div>

              {/* 우측: 출결 + 복습테스트 (입력 가능) */}
              <div className="space-y-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-900 text-white">
                      <th className="border p-2">
                        출결{" "}
                        <span className="text-xs opacity-70">(직접 입력)</span>
                      </th>
                      <th className="border p-2">
                        복습테스트{" "}
                        <span className="text-xs opacity-70">(직접 입력)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-0">
                        <input
                          type="text"
                          value={attendance}
                          onChange={(e) => {
                            setAttendance(e.target.value);
                            setIsSaved(false);
                          }}
                          disabled={!isEditing}
                          className="w-full bg-transparent p-3 text-center outline-none disabled:cursor-not-allowed disabled:opacity-70"
                          placeholder="입력"
                        />
                      </td>
                      <td className="border p-0">
                        <input
                          type="text"
                          value={reviewTest}
                          onChange={(e) => {
                            setReviewTest(e.target.value);
                            setIsSaved(false);
                          }}
                          disabled={!isEditing}
                          className="w-full bg-transparent p-3 text-center outline-none disabled:cursor-not-allowed disabled:opacity-70"
                          placeholder="입력"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 학생 정보 + 과제 사항 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 학생 정보 */}
              <div className="space-y-2">
                <div className="grid grid-cols-[100px_1fr_80px_1fr] gap-2 text-sm">
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    학생 이름
                  </span>
                  <span className="border-b px-2 py-1.5">
                    {examData.studentName}
                  </span>
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    수강일자
                  </span>
                  <span className="border-b px-2 py-1.5">
                    {examData.examDate}
                  </span>
                </div>
                <div className="grid grid-cols-[100px_1fr_80px_1fr] gap-2 text-sm">
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    학원명
                  </span>
                  <span className="border-b px-2 py-1.5"></span>
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    회차
                  </span>
                  <span className="border-b px-2 py-1.5">6회차</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    수강반
                  </span>
                  <span className="border-b px-2 py-1.5">
                    {examData.className}
                  </span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                  <span className="rounded bg-zinc-900 px-2 py-1.5 text-center text-white">
                    시험 종류
                  </span>
                  <span className="border-b px-2 py-1.5">복습테스트</span>
                </div>
              </div>

              {/* 과제 사항 (입력 가능) */}
              <table className="h-fit w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-900 text-white">
                    <th className="border p-2" colSpan={3}>
                      과제 사항{" "}
                      <span className="text-xs opacity-70">(직접 입력)</span>
                    </th>
                  </tr>
                  <tr className="bg-zinc-800 text-white">
                    <th className="border p-2">단어</th>
                    <th className="border p-2">과제</th>
                    <th className="border p-2">추가 과제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-0">
                      <input
                        type="text"
                        value={homeworkWord}
                        onChange={(e) => {
                          setHomeworkWord(e.target.value);
                          setIsSaved(false);
                        }}
                        disabled={!isEditing}
                        className="w-full bg-transparent p-3 text-center outline-none disabled:cursor-not-allowed disabled:opacity-70"
                        placeholder="입력"
                      />
                    </td>
                    <td className="border p-0">
                      <input
                        type="text"
                        value={homeworkTask}
                        onChange={(e) => {
                          setHomeworkTask(e.target.value);
                          setIsSaved(false);
                        }}
                        disabled={!isEditing}
                        className="w-full bg-transparent p-3 text-center outline-none disabled:cursor-not-allowed disabled:opacity-70"
                        placeholder="입력"
                      />
                    </td>
                    <td className="border p-0">
                      <input
                        type="text"
                        value={homeworkExtra}
                        onChange={(e) => {
                          setHomeworkExtra(e.target.value);
                          setIsSaved(false);
                        }}
                        disabled={!isEditing}
                        className="w-full bg-transparent p-3 text-center outline-none disabled:cursor-not-allowed disabled:opacity-70"
                        placeholder="입력"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 응시 결과 + 취약 유형 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 응시 결과 */}
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-900 text-white">
                    <th className="border p-2" colSpan={3}>
                      응시 결과
                    </th>
                  </tr>
                  <tr>
                    <th className="border bg-muted p-2">원점수</th>
                    <th className="border bg-muted p-2">석차</th>
                    <th className="border bg-muted p-2">평균점수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 text-center text-lg font-bold">
                      {examData.score}점
                    </td>
                    <td className="border p-3 text-center text-lg font-bold">
                      {examData.rank}/{examData.totalStudents}
                    </td>
                    <td className="border p-3 text-center text-lg font-bold">
                      {examData.averageScore}점
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 취약 유형 (입력 가능) */}
              <div className="rounded-lg border">
                <div className="rounded-t-lg bg-zinc-900 p-2 text-center text-white">
                  취약 유형{" "}
                  <span className="text-xs opacity-70">(직접 입력)</span>
                </div>
                <div className="p-2">
                  <Textarea
                    value={weaknessType}
                    onChange={(e) => {
                      setWeaknessType(e.target.value);
                      setIsSaved(false);
                    }}
                    disabled={!isEditing}
                    placeholder="취약 유형을 입력하세요 (예: 빈칸, 어법)"
                    className="min-h-[80px] resize-none border-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* 회차별 성적추이 + 전달 사항 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 회차별 성적추이 */}
              <div className="rounded-lg border">
                <div className="rounded-t-lg bg-zinc-900 p-2 text-center text-white">
                  회차별 성적추이
                </div>
                <div className="h-[200px] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockScoreHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis
                        dataKey="round"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}점`, "점수"]}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e5e5",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 전달 사항 (입력 가능) */}
              <div className="rounded-lg border">
                <div className="rounded-t-lg bg-zinc-900 p-2 text-center text-white">
                  전달 사항{" "}
                  <span className="text-xs opacity-70">(직접 입력)</span>
                </div>
                <div className="p-2">
                  <Textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setIsSaved(false);
                    }}
                    disabled={!isEditing}
                    placeholder="전달 사항을 입력하세요"
                    className="min-h-[168px] resize-none border-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 페이지 2: 문항별 응시 결과 */}
      {currentPage === 2 && (
        <Card>
          <CardContent className="p-6">
            {/* 문항별 응시 결과 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {examData.studentName} · {examData.examName}
                </p>
                <h3 className="text-xl font-bold">문항별 응시 결과</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">총 문항</p>
                <p className="text-2xl font-bold">
                  {mockQuestionResults.length}문항
                </p>
              </div>
            </div>

            {/* 문항별 응시 결과 테이블 */}
            <div className="rounded-lg border">
              <div className="rounded-t-lg bg-zinc-900 p-3 text-center text-white">
                문항별 응시 결과
              </div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="w-16 border p-3">No.</th>
                    <th className="border p-3">출처</th>
                    <th className="w-24 border p-3">유형</th>
                    <th className="w-16 border p-3">O/X</th>
                    <th className="w-20 border p-3">오답률</th>
                  </tr>
                </thead>
                <tbody>
                  {mockQuestionResults.map((q) => (
                    <tr key={q.no}>
                      <td className="border p-2 text-center">{q.no}</td>
                      <td className="border p-2 text-center">{q.source}</td>
                      <td className="border p-2 text-center">{q.type}</td>
                      <td
                        className={`border p-2 text-center font-bold ${
                          q.ox === "X" ? "text-red-500" : "text-blue-500"
                        }`}
                      >
                        {q.ox}
                      </td>
                      <td className="border p-2 text-center">{q.errorRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
