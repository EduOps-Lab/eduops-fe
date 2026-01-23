"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCHOOL_INFO_FORM_DEFAULTS } from "@/constants/auth.defaults";
import { useSchoolStore } from "@/stores/auth.store";
import { schoolInfoSchema } from "@/validation/auth.validation";
import { SchoolInfoFormData } from "@/types/auth.type";

export default function SchoolInfoForm() {
  const { setSchoolInfo, setSchoolInfoValid } = useSchoolStore();

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SchoolInfoFormData>({
    mode: "onChange",
    resolver: zodResolver(schoolInfoSchema),
    reValidateMode: "onChange",
    defaultValues: SCHOOL_INFO_FORM_DEFAULTS,
  });

  const schoolName = watch("schoolName");
  const grade = watch("grade");

  // 값이 바뀔 때마다 store에 반영
  useEffect(() => {
    setSchoolInfo({
      schoolName,
      grade,
    });
    setSchoolInfoValid(isValid);
  }, [schoolName, grade, isValid, setSchoolInfo, setSchoolInfoValid]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="schoolName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            학교명
          </label>
          <input
            id="schoolName"
            type="text"
            {...register("schoolName")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="학교명을 입력하세요"
            aria-invalid={!!errors.schoolName}
            aria-describedby={
              errors.schoolName ? "schoolName-error" : undefined
            }
          />

          {errors.schoolName && (
            <p id="schoolName-error" className="mt-1 text-sm text-red-600">
              {errors.schoolName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            학년
          </label>
          <Select
            value={grade}
            onValueChange={(value) =>
              setValue("grade", value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger
              className="w-full h-12 px-4 py-3 border border-gray-300 shadow-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-invalid={!!errors.grade}
              aria-describedby={errors.grade ? "grade-error" : undefined}
            >
              <SelectValue placeholder="학년 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="중1">중1</SelectItem>
              <SelectItem value="중2">중2</SelectItem>
              <SelectItem value="중3">중3</SelectItem>
              <SelectItem value="고1">고1</SelectItem>
              <SelectItem value="고2">고2</SelectItem>
              <SelectItem value="고3">고3</SelectItem>
            </SelectContent>
          </Select>

          {errors.grade && (
            <p id="grade-error" className="mt-1 text-sm text-red-600">
              {errors.grade.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
