import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import MiniLabel from "@/components/common/label/RoundStatusLabel";
import SelectBtn from "@/components/common/button/SelectBtn";
import { STATUS_SETTING_OPTIONS } from "@/constants/students.default";
import { StudentEnrollment } from "@/types/students.type";
import noProfileImage from "@/assets/images/no-profile.jpg";

export type StudentTableColumn = {
  key: string;
  render: (row: StudentEnrollment) => React.ReactNode;
};

export const StudentTableData = ({
  selectedStudents,
  onSelectStudent,
  onStatusChange,
  onNavigate,
}: {
  selectedStudents: string[];
  onSelectStudent: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, status: string) => void;
  onNavigate: (enrollmentId: string) => void;
}): StudentTableColumn[] => [
  {
    key: "select",
    render: (row: StudentEnrollment) => (
      <Checkbox
        className="cursor-pointer"
        checked={selectedStudents.includes(row.enrollmentId)}
        onCheckedChange={(checked) =>
          onSelectStudent(row.enrollmentId, checked as boolean)
        }
      />
    ),
  },
  {
    key: "profile",
    render: (row: StudentEnrollment) => (
      <Image
        src={row.profileImage || noProfileImage.src}
        alt={row.name}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  {
    key: "name",
    render: (row: StudentEnrollment) => (
      <span
        className="font-medium whitespace-nowrap text-sm cursor-pointer hover:text-primary hover:underline"
        onClick={() => onNavigate(row.enrollmentId)}
      >
        {row.name}
      </span>
    ),
  },
  {
    key: "enrollment",
    render: (row: StudentEnrollment) => (
      <MiniLabel
        color={
          row.status === "재원"
            ? "green"
            : row.status === "휴원"
              ? "yellow"
              : "red"
        }
      >
        {row.status}
      </MiniLabel>
    ),
  },
  {
    key: "app",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">
        {row.isAppUser ? "O" : "X"}
      </span>
    ),
  },
  {
    key: "lecture",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">{row.lecture.title}</span>
    ),
  },
  {
    key: "school",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">
        {row.school} / {row.schoolYear}
      </span>
    ),
  },
  {
    key: "phoneNumber",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">{row.phoneNumber}</span>
    ),
  },
  {
    key: "registeredAt",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">{row.registeredAt}</span>
    ),
  },
  {
    key: "attendance",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">
        {row.attendance.percentage}%
      </span>
    ),
  },
  {
    key: "statusSelect",
    render: (row: StudentEnrollment) => (
      <SelectBtn
        className="w-[100px]"
        value={row.status}
        placeholder="상태 선택"
        options={STATUS_SETTING_OPTIONS}
        onChange={(value) => onStatusChange(row.enrollmentId, value)}
      />
    ),
  },
];
