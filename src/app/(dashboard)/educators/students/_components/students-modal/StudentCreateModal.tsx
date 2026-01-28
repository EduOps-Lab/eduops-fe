"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockLectures } from "@/data/lectures.mock";
import { useModal } from "@/providers/ModalProvider";
import { StudentCreateFormData } from "@/types/students.type";
import {
  getCreateStudentFormDefaults,
  GRADE_SELECTING_OPTIONS,
} from "@/constants/students.default";
import SelectBtn from "@/components/common/button/SelectBtn";
import { studentCreateSchema } from "@/validation/students.validation";

export function StudentCreateModal() {
  const { isOpen, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<StudentCreateFormData>({
    resolver: zodResolver(studentCreateSchema),
    mode: "onChange",
    defaultValues: getCreateStudentFormDefaults(),
  });

  const schoolYear = useWatch({ control, name: "schoolYear" });
  const assignedClass = useWatch({ control, name: "assignedClass" });

  const onSubmit = (data: StudentCreateFormData) => {
    console.log("학생 등록 데이터:", data);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">학생 등록</DialogTitle>
          <DialogDescription>
            등록 후 학적과 수업 정보를 바로 연결할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* 학생 정보 */}
            <h3 className="text-sm font-semibold">학생 정보</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">
                  학생 이름 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="studentName"
                  {...register("name")}
                  placeholder="홍길동"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  연락처 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="010-1234-5678"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school">
                  학교 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="school"
                  {...register("school")}
                  placeholder="서울고등학교"
                />
                {errors.school && (
                  <p className="text-xs text-red-500">
                    {errors.school.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolYear">
                  학년 <span className="text-red-500">*</span>
                </Label>
                <SelectBtn
                  value={schoolYear}
                  placeholder="학년 선택"
                  options={GRADE_SELECTING_OPTIONS}
                  onChange={(value) =>
                    setValue("schoolYear", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {errors.schoolYear && (
                  <p className="text-xs text-red-500">
                    {errors.schoolYear.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 학부모 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">학부모 정보</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentPhone">
                  학부모 연락처 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parentPhone"
                  {...register("parentPhone")}
                  placeholder="010-9876-5432"
                />
                {errors.parentPhone && (
                  <p className="text-xs text-red-500">
                    {errors.parentPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 수업 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">수업 정보</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedClass">
                  배정 클래스 <span className="text-red-500">*</span>
                </Label>
                <SelectBtn
                  value={assignedClass}
                  placeholder="클래스 선택"
                  options={mockLectures.map((lecture) => ({
                    label: lecture.name,
                    value: lecture.id,
                  }))}
                  onChange={(value) =>
                    setValue("assignedClass", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {errors.assignedClass && (
                  <p className="text-xs text-red-500">
                    {errors.assignedClass.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDate">학생 등록 날짜</Label>
                <Input
                  id="registrationDate"
                  type="date"
                  {...register("registrationDate")}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          {/* 추가 메모 */}
          <div className="space-y-2">
            <Label htmlFor="memo">추가 메모</Label>
            <Textarea
              id="memo"
              {...register("memo")}
              placeholder="학생에 대한 추가 정보를 입력하세요"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-xs text-muted-foreground">
              저장 시 학사 담당자에게 자동으로 공유됩니다.
            </p>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                취소
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={!isValid}
              >
                학생 등록
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
