"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceDot,
} from "recharts";

import { LectureExamResult } from "@/types/lecture-exams.type";

type ScoreChartProps = {
  exams: LectureExamResult[];
  selectedExamId: string | null;
};

export default function ScoreChart({ exams, selectedExamId }: ScoreChartProps) {
  if (!selectedExamId) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        시험을 선택해주세요.
      </div>
    );
  }

  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  const chartData = sortedExams.map((exam) => ({
    examId: exam.examId,
    name: exam.examName,
    score: exam.score,
    classAverage: exam.classAverage,
    date: exam.examDate.substring(5),
  }));

  const selectedExam = sortedExams.find(
    (exam) => exam.examId === selectedExamId
  );

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={0}
            textAnchor="end"
            height={50}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) =>
              value.length > 4 ? value.slice(0, 4) + "…" : value
            }
          />
          <YAxis domain={[25, 100]} ticks={[40, 55, 70, 85, 100]} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              fontSize: 12,
              marginBottom: 20,
            }}
            formatter={(value) => (
              <span style={{ fontWeight: 600, marginBottom: 20 }}>{value}</span>
            )}
          />

          {/* 해당 학생 평균 */}
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            name="내 점수"
            dot={({ cx, cy, payload }) => (
              <circle
                cx={cx}
                cy={cy}
                r={payload.examId === selectedExamId ? 6 : 4}
                fill={payload.examId === selectedExamId ? "#ef4444" : "#3b82f6"}
                stroke="white"
                strokeWidth={2}
              />
            )}
          />

          {/* 반 평균 */}
          <Line
            type="monotone"
            dataKey="classAverage"
            stroke="#9ca3af"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="반 평균"
          />

          {selectedExam && (
            <ReferenceDot
              x={selectedExam.examName}
              y={selectedExam.score}
              r={8}
              fill="#ef4444"
              stroke="white"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
