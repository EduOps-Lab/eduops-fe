import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { Student } from "@/types/students.type";
import { useEnrollmentAttendances } from "@/hooks/useEnrollment";
import { formatYMDFromISO } from "@/utils/date";

import AttendanceDetailTable from "../table/AttendanceDetailTable";

type AttendanceDetailModalProps = {
  studentData: Student;
};

export default function AttendanceDetailModal({
  studentData,
}: AttendanceDetailModalProps) {
  const { isOpen, closeModal } = useModal();

  // 수강생 출결 상세 조회
  const { data: attendanceData } = useEnrollmentAttendances(studentData.id);
  const attendanceRecords = attendanceData?.attendances
    ? [...attendanceData.attendances]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((record) => ({
          ...record,
          date: formatYMDFromISO(record.date) ?? record.date,
        }))
    : [];

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출결 상세</DialogTitle>
          <DialogDescription>최근 출결 현황을 확인하세요.</DialogDescription>
        </DialogHeader>

        <div className="mt-2 border rounded-md p-2 max-h-[400px] overflow-y-auto">
          <AttendanceDetailTable records={attendanceRecords ?? []} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
