"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendanceStatus, StudentEnrollment } from "@/types/students.type";

type AttendanceRecord = StudentEnrollment["attendance"]["records"][number];

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

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: "date",
    header: "수업 일자",
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: "status",
    header: "출결 상태",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span className={`font-medium ${STATUS_COLOR[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      );
    },
  },
  {
    accessorKey: "memo",
    header: "메모",
    cell: ({ row }) => row.original.memo ?? "-",
  },
];

export default function AttendanceDetailTable({
  records,
}: {
  records: AttendanceRecord[];
}) {
  const table = useReactTable<AttendanceRecord>({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              출결 기록이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
