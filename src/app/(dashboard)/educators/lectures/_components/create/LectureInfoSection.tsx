"use client";

import { UseFormReturn } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LectureFormInput } from "@/validation/lecture.validation";

type LectureInfoSectionProps = {
  form: UseFormReturn<LectureFormInput>;
  disabled: boolean;
};

export function LectureInfoSection({
  form,
  disabled,
}: LectureInfoSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">📄 강의 기본정보</h2>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <label
            htmlFor="lecture-name"
            className="block text-sm font-medium mb-2"
          >
            수업명 <span className="text-red-500">*</span>
          </label>
          <Input
            id="lecture-name"
            {...register("name")}
            placeholder="예: [고3] 수능 대비 수학 강의"
            disabled={disabled}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="lecture-subject"
              className="block text-sm font-medium mb-2"
            >
              과목 <span className="text-red-500">*</span>
            </label>
            <Input
              id="lecture-subject"
              {...register("subject")}
              placeholder="예: 수학"
              disabled={disabled}
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lecture-grade"
              className="block text-sm font-medium mb-2"
            >
              학년 <span className="text-red-500">*</span>
            </label>
            <Input
              id="lecture-grade"
              {...register("grade")}
              placeholder="예: 고3"
              disabled={disabled}
            />
            {errors.grade && (
              <p className="text-xs text-red-500 mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="lecture-start-date"
              className="block text-sm font-medium mb-2"
            >
              개강일 <span className="text-red-500">*</span>
            </label>
            <Input
              id="lecture-start-date"
              type="date"
              {...register("startDate")}
              disabled={disabled}
            />
            {errors.startDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lecture-status"
              className="block text-sm font-medium mb-2"
            >
              수업 상태 <span className="text-red-500">*</span>
            </label>
            <select
              id="lecture-status"
              {...register("status")}
              disabled={disabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">선택</option>
              <option value="개강전">개강전</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
