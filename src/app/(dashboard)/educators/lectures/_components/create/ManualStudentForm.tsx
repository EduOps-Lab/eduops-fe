"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LectureFormInput } from "@/validation/lecture.validation";

type ManualStudentFormProps = {
  form: UseFormReturn<LectureFormInput>;
  disabled: boolean;
};

const emptyStudent = {
  name: "",
  phone: "",
  school: "",
  studentGrade: "",
  parentPhone: "",
  registrationDate: "",
};

export function ManualStudentForm({ form, disabled }: ManualStudentFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "students",
  });

  return (
    <>
      <div className="space-y-4">
        {fields.map((field, index) => {
          const fieldErrors = errors.students?.[index];

          return (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">학생 정보 {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={disabled}
                  className="text-red-500 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  삭제
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    학생 이름 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register(`students.${index}.name`)}
                    placeholder="예: 김민준"
                    disabled={disabled}
                  />
                  {fieldErrors?.name?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.name.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register(`students.${index}.phone`)}
                    placeholder="예: 010-1234-5678"
                    disabled={disabled}
                  />
                  {fieldErrors?.phone?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.phone.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    학생 학교 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register(`students.${index}.school`)}
                    placeholder="예: 서울고등학교"
                    disabled={disabled}
                  />
                  {fieldErrors?.school?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.school.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    학생 학년 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register(`students.${index}.studentGrade`)}
                    placeholder="예: 2학년"
                    disabled={disabled}
                  />
                  {fieldErrors?.studentGrade?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.studentGrade.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  학부모 번호 <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register(`students.${index}.parentPhone`)}
                  placeholder="예: 010-9876-5432"
                  disabled={disabled}
                />
                {fieldErrors?.parentPhone?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.parentPhone.message as string}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  학생 등록날짜 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  {...register(`students.${index}.registrationDate`)}
                  disabled={disabled}
                />
                {fieldErrors?.registrationDate?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.registrationDate.message as string}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => append({ ...emptyStudent })}
        variant="outline"
        className="w-full border-dashed"
        disabled={disabled}
      >
        + 학생 추가
      </Button>
    </>
  );
}
