"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditProfileFormData, StudentEnrollment } from "@/types/students.type";
import { editProfileSchema } from "@/validation/students.validation";

type EditProfileModalProps = {
  studentData: StudentEnrollment;
};

export default function EditProfileModal({
  studentData,
}: EditProfileModalProps) {
  const { isOpen, closeModal } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    defaultValues: studentData,
  });

  // 모달 열릴 때 폼 데이터만 reset (state 변경 X)
  useEffect(() => {
    if (isOpen) {
      reset(studentData);
    }
  }, [isOpen, studentData, reset]);

  const handleEditToggle = () => {
    setIsEditMode(true);
  };

  const handleClose = () => {
    reset(studentData); // 변경사항 초기화
    setIsEditMode(false);
    closeModal();
  };

  const onSubmit = (data: EditProfileFormData) => {
    // dirtyFields 기준으로 변경된 데이터만 추출
    const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof EditProfileFormData] =
        data[key as keyof EditProfileFormData];
      return acc;
    }, {} as Partial<EditProfileFormData>);

    if (Object.keys(changedData).length === 0) return;

    console.log("변경된 데이터:", changedData);

    // TODO: API 요청
    // await updateStudentApi(changedData);

    reset(data);
    setIsEditMode(false);
    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset(studentData);
          setIsEditMode(false);
          closeModal();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학생 정보 수정</DialogTitle>
          <DialogDescription>
            학생 정보를 최신 상태로 유지하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* 학생 정보 */}
            <div className="flex flex-col gap-4 text-xs">
              <div className="space-y-2">
                <Label htmlFor="name">학생 이름</Label>
                <Input
                  id="name"
                  className="w-full"
                  disabled={!isEditMode}
                  {...register("name")}
                  placeholder="학생 이름"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">학교</Label>
                <Input
                  id="school"
                  className="w-full"
                  disabled={!isEditMode}
                  {...register("school")}
                  placeholder="학교"
                />
                {errors.school && (
                  <p className="text-red-500">{errors.school.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolYear">학년</Label>
                <Input
                  id="schoolYear"
                  className="w-full"
                  disabled={!isEditMode}
                  {...register("schoolYear")}
                  placeholder="학년"
                />
                {errors.schoolYear && (
                  <p className="text-red-500">{errors.schoolYear.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">연락처</Label>
                <Input
                  id="phoneNumber"
                  className="w-full"
                  disabled={!isEditMode}
                  {...register("phoneNumber")}
                  placeholder="연락처"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  className="w-full"
                  disabled={!isEditMode}
                  {...register("email")}
                  placeholder="이메일"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentPhone">학부모 연락처</Label>
                <Input
                  id="parentPhone"
                  disabled={!isEditMode}
                  {...register("parentPhone")}
                  placeholder="학부모 연락처"
                  className="w-full"
                />
                {errors.parentPhone && (
                  <p className="text-red-500">{errors.parentPhone.message}</p>
                )}
              </div>
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
              {!isEditMode && (
                <Button
                  type="button"
                  variant="default"
                  onClick={handleEditToggle}
                >
                  수정
                </Button>
              )}
              {isEditMode && (
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={!isValid || !isDirty}
                >
                  저장
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
