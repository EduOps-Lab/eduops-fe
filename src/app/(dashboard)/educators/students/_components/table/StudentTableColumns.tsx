import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import StatusLabel from "@/components/common/label/StatusLabel";
import SelectBtn from "@/components/common/button/SelectBtn";
import { STATUS_SETTING_OPTIONS } from "@/constants/students.default";
import { Student, StudentStatus } from "@/types/students.type";
import noProfileImage from "@/assets/images/no-profile.jpg";
import { formatYMDFromISO } from "@/utils/date";
import { ellipsText } from "@/utils/ellipsText";
import { phoneNumberFormatter } from "@/utils/phone";

export type StudentTableColumn = {
  key: string;
  render: (row: Student) => React.ReactNode;
};

export const StudentTableData = ({
  selectedStudents,
  onToggleStudent,
  onNavigate,
  onStatusChange,
}: {
  selectedStudents: string[];
  onToggleStudent: (student: Student) => void;
  onNavigate: (enrollmentId: string) => void;
  onStatusChange: (id: string, status: StudentStatus) => void;
}): StudentTableColumn[] => [
  {
    key: "select",
    render: (row: Student) => (
      <Checkbox
        className="cursor-pointer"
        checked={selectedStudents.includes(row.id)}
        onCheckedChange={() => onToggleStudent(row)}
      />
    ),
  },
  {
    key: "profile",
    render: (row: Student) => (
      <Image
        src={noProfileImage.src}
        alt={row.studentName}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  {
    key: "name",
    render: (row: Student) => (
      <span
        className="font-medium whitespace-nowrap text-sm cursor-pointer hover:text-primary hover:underline"
        onClick={() => onNavigate(row.id)}
      >
        {row.studentName}
      </span>
    ),
  },
  {
    key: "status",
    render: (row: Student) => (
      <StatusLabel
        color={
          row.status === "ACTIVE"
            ? "green"
            : row.status === "PAUSED"
              ? "yellow"
              : "red"
        }
      >
        {row.status === "ACTIVE"
          ? "재원"
          : row.status === "DROPPED"
            ? "탈퇴"
            : "휴원"}
      </StatusLabel>
    ),
  },
  {
    key: "appInstalled",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {row.appStudentId ? "O" : "X"}
      </span>
    ),
  },
  {
    key: "class",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {ellipsText(row.lecture.title)}
      </span>
    ),
  },
  {
    key: "school",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {row.school} / {row.schoolYear}
      </span>
    ),
  },
  {
    key: "phoneNumber",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {phoneNumberFormatter(row.studentPhone)}
      </span>
    ),
  },
  {
    key: "registeredAt",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {row.registeredAt ? formatYMDFromISO(row.registeredAt) : "-"}
      </span>
    ),
  },
  {
    // TODO: 출결율 데이터 없음!
    key: "attendance",
    render: (row: Student) => (
      <span className="text-sm whitespace-nowrap">
        {row.attendanceRate != null ? `${row.attendanceRate}%` : "-"}
      </span>
    ),
  },
  {
    key: "statusSelect",
    render: (row: Student) => (
      <SelectBtn
        className="w-[100px]"
        value={row.status}
        placeholder="상태 선택"
        options={STATUS_SETTING_OPTIONS}
        onChange={(value) => onStatusChange(row.id, value as StudentStatus)}
      />
    ),
  },
];
