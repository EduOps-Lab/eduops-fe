import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { AttendanceRegisterFormData } from "@/types/students.type";
import { AttendanceRegisterSchema } from "@/validation/students.validation";
import {
  getAttendanceRegisterFormDefaults,
  ATTENDANCE_STATUS_OPTIONS,
} from "@/constants/students.default";
import SelectBtn from "@/components/common/button/SelectBtn";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AttendanceRegisterModal() {
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<AttendanceRegisterFormData>({
    resolver: zodResolver(AttendanceRegisterSchema),
    mode: "onChange",
    defaultValues: getAttendanceRegisterFormDefaults(),
  });

  const status = useWatch({ control, name: "status" });

  const onSubmit = (data: AttendanceRegisterFormData) => {
    console.log("출결 등록 데이터:", data);
    // TODO: API 호출
    reset();
    closeModal();
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출결 등록</DialogTitle>
          <DialogDescription>
            수업 출결 정보를 추가로 기록하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">수업 일자</Label>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">출결 상태</Label>
                <SelectBtn
                  id="status"
                  value={status}
                  placeholder="출결 상태"
                  options={ATTENDANCE_STATUS_OPTIONS}
                  onChange={(value) =>
                    setValue("status", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo">메모</Label>
              <Textarea
                id="memo"
                {...register("memo")}
                placeholder="특이사항을 입력하세요."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                닫기
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={!isValid}
              >
                등록
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
