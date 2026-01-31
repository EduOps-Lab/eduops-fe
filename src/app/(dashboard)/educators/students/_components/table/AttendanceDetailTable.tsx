"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendanceStatus, Attendance } from "@/types/students.type";

const STATUS_LABEL: Record<AttendanceStatus, string> = {
  PRESENT: "출석",
  ABSENT: "결석",
  LATE: "지각",
  EARLY_LEAVE: "조퇴",
};

const STATUS_COLOR: Record<AttendanceStatus, string> = {
  PRESENT: "text-green-600",
  LATE: "text-yellow-600",
  ABSENT: "text-red-600",
  EARLY_LEAVE: "text-blue-600",
};

type AttendanceTableColumn = {
  key: string;
  label: string;
  render: (row: Attendance) => React.ReactNode;
};

const ATTENDANCE_TABLE_COLUMNS: AttendanceTableColumn[] = [
  {
    key: "date",
    label: "수업 일자",
    render: (row: Attendance) => (
      <span className="text-sm whitespace-nowrap">{row.date}</span>
    ),
  },
  {
    key: "status",
    label: "출결 상태",
    render: (row: Attendance) => (
      <span
        className={`font-medium ${STATUS_COLOR[row.status as AttendanceStatus]}`}
      >
        {STATUS_LABEL[row.status as AttendanceStatus]}
      </span>
    ),
  },
  {
    key: "memo",
    label: "메모",
    render: (row: Attendance) => (
      <span className="text-sm whitespace-nowrap">{row.memo ?? "-"}</span>
    ),
  },
];

export default function AttendanceDetailTable({
  records,
}: {
  records: Attendance[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {ATTENDANCE_TABLE_COLUMNS.map((col) => (
            <TableHead key={col.key} className="whitespace-nowrap">
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {records.length > 0 ? (
          records.map((record, index) => (
            <TableRow key={`${record.date}-${index}`}>
              {ATTENDANCE_TABLE_COLUMNS.map((col) => (
                <TableCell key={col.key} className="whitespace-nowrap text-sm">
                  {col.render(record)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={ATTENDANCE_TABLE_COLUMNS.length}
              className="text-center"
            >
              출결 기록이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
