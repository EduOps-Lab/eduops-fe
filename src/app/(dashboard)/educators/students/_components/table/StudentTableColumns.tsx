import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import MiniLabel from "@/components/common/label/RoundStatusLabel";
import SelectBtn from "@/components/common/button/SelectBtn";
import { STATUS_SETTING_OPTIONS } from "@/constants/students.default";
import { StudentEnrollment } from "@/types/students.type";
import noProfileImage from "@/assets/images/no-profile.jpg";

const columnHelper = createColumnHelper<StudentEnrollment>();

export const createStudentColumns = ({
  selectedStudents,
  onSelectStudent,
  onNavigate,
  isAllSelected,
  onSelectAll,
}: {
  selectedStudents: string[];
  onSelectStudent: (id: string) => void;
  onNavigate: (enrollmentId: string) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}) => [
  columnHelper.display({
    id: "select",
    header: () => (
      // 전체 선택 체크박스
      <Checkbox
        className="cursor-pointer"
        checked={isAllSelected}
        onCheckedChange={(checked) => onSelectAll(!!checked)}
        onClick={(e) => e.stopPropagation()}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      // 개별 선택 체크박스
      <Checkbox
        className="cursor-pointer"
        checked={selectedStudents.includes(row.original.enrollmentId)}
        onCheckedChange={() => onSelectStudent(row.original.enrollmentId)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    size: 50,
  }),

  columnHelper.display({
    id: "profile",
    header: "프로필",
    cell: ({ row }) => (
      <Image
        src={row.original.student.profileImage ?? noProfileImage.src}
        alt={row.original.student.name}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  }),

  columnHelper.display({
    id: "name",
    header: "이름",
    cell: ({ row }) => (
      <span
        className="font-medium whitespace-nowrap text-sm cursor-pointer hover:text-primary hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(row.original.enrollmentId);
        }}
      >
        {row.original.student.name}
      </span>
    ),
  }),

  columnHelper.display({
    id: "enrollment",
    header: "재원 상태",
    cell: ({ row }) => (
      <MiniLabel
        color={
          row.original.status === "재원"
            ? "green"
            : row.original.status === "휴원"
              ? "yellow"
              : "red"
        }
      >
        {row.original.status}
      </MiniLabel>
    ),
  }),

  columnHelper.display({
    id: "app",
    header: "앱 사용",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.student.isAppUser ? "O" : "X"}
      </span>
    ),
  }),

  columnHelper.display({
    id: "lecture",
    header: "수업",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.lecture.title}
      </span>
    ),
  }),

  columnHelper.display({
    id: "school",
    header: "학교 / 학년",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.student.school} / {row.original.student.grade}
      </span>
    ),
  }),

  columnHelper.display({
    id: "phone",
    header: "연락처",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.student.phone}
      </span>
    ),
  }),

  columnHelper.display({
    id: "registeredAt",
    header: "등록일",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.registeredAt}
      </span>
    ),
  }),

  columnHelper.display({
    id: "attendance",
    header: "출석률",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.attendance.percentage}%
      </span>
    ),
  }),

  columnHelper.display({
    id: "statusSelect",
    header: "상태 변경",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <SelectBtn
          className="w-[100px]"
          value={row.original.status}
          placeholder="상태 선택"
          options={STATUS_SETTING_OPTIONS}
        />
      </div>
    ),
  }),
];
