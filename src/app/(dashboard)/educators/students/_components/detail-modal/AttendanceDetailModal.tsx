import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { StudentEnrollment } from "@/types/students.type";

import AttendanceDetailTable from "../table/AttendanceDetailTable";

type AttendanceDetailModalProps = {
  studentData: StudentEnrollment;
};

export default function AttendanceDetailModal({
  studentData,
}: AttendanceDetailModalProps) {
  const { isOpen, closeModal } = useModal();

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
          <AttendanceDetailTable
            records={studentData?.attendance?.records ?? []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
