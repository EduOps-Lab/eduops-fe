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

export const StudentTableColumns = ({
  selectedStudents,
  onSelectStudent,
}: {
  selectedStudents: string[];
  onSelectStudent: (id: string, checked: boolean) => void;
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
        src={row.student.profileImage ?? noProfileImage.src}
        alt={row.student.name}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  {
    key: "name",
    render: (row: StudentEnrollment) => (
      <span className="font-medium whitespace-nowrap text-sm">
        {row.student.name}
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
        {row.student.isAppUser ? "O" : "X"}
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
        {row.student.school} / {row.student.grade}
      </span>
    ),
  },
  {
    key: "phone",
    render: (row: StudentEnrollment) => (
      <span className="text-sm whitespace-nowrap">{row.student.phone}</span>
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
      />
    ),
  },
];
