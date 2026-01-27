"use client";

import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { Trash2, Check } from "lucide-react";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExamFormInput } from "@/validation/exam.validation";

type QuestionItemProps = {
  form: UseFormReturn<ExamFormInput>;
  index: number;
  questionNumber: number;
  disabled?: boolean;
  onDelete?: () => void;
};

export function QuestionItem({
  form,
  index,
  questionNumber,
  disabled = false,
  onDelete,
}: QuestionItemProps) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = form;
  const questionType = useWatch({
    control,
    name: `questions.${index}.type`,
  });
  const selectedAnswer = useWatch({
    control,
    name: `questions.${index}.answer.selected`,
  });
  const questionErrors = errors.questions?.[index] as
    | {
        score?: { message?: string };
        answer?: {
          selected?: { message?: string };
          text?: { message?: string };
        };
      }
    | undefined;

  return (
    <AccordionItem value={`question-${questionNumber}`}>
      <div className="flex items-center gap-4 px-6 py-4 border-b">
        <div className="flex items-center gap-4 flex-1">
          {/* 문항 번호 및 유형 */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {questionNumber}
            </div>
            <Controller
              name={`questions.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="객관식">객관식</SelectItem>
                    <SelectItem value="주관식">주관식</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* 배점 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                step={1}
                {...register(`questions.${index}.score`, {
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
                disabled={disabled}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">점</span>
            </div>
            {questionErrors?.score && (
              <p className="text-xs text-red-500">
                {questionErrors.score.message}
              </p>
            )}
          </div>
        </div>

        {/* 액션 영역 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            aria-label={`문항 ${questionNumber} 삭제`}
            className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <AccordionTrigger className="px-6" disabled={disabled}>
        <span className="text-sm text-muted-foreground">상세 설정</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {/* 유형 및 출처 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`question-${index}-category`}
                className="block text-sm font-medium mb-2"
              >
                유형
              </label>
              <Input
                id={`question-${index}-category`}
                placeholder="예: 제목, 빈칸, 요약"
                {...register(`questions.${index}.category`)}
                disabled={disabled}
              />
            </div>
            <div>
              <label
                htmlFor={`question-${index}-source`}
                className="block text-sm font-medium mb-2"
              >
                출처
              </label>
              <Input
                id={`question-${index}-source`}
                placeholder="예: 2025 3월 모의고사"
                {...register(`questions.${index}.source`)}
                disabled={disabled}
              />
            </div>
          </div>

          {/* 문제 내용 */}
          <div>
            <label
              htmlFor={`question-${index}-content`}
              className="block text-sm font-medium mb-2"
            >
              문제 내용 (선택사항)
            </label>
            <textarea
              id={`question-${index}-content`}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="문항 1"
              {...register(`questions.${index}.content`)}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground mt-1">
              시험지 파일을 업로드한 경우 생략 가능
            </p>
          </div>

          {/* 객관식 정답 설정 */}
          {questionType === "객관식" && (
            <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Check className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">객관식 정답 설정</h3>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    aria-pressed={selectedAnswer === num}
                    onClick={() =>
                      setValue(`questions.${index}.answer.selected`, num, {
                        shouldValidate: true,
                      })
                    }
                    disabled={disabled}
                    className={`
                      w-12 h-12 rounded-full border-2 font-medium transition-colors
                      ${
                        selectedAnswer === num
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-background border-input hover:bg-accent"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
              {questionErrors?.answer?.selected && (
                <p className="text-xs text-red-500 mt-2">
                  {questionErrors.answer.selected.message}
                </p>
              )}
            </div>
          )}

          {/* 주관식 정답 설정 */}
          {questionType === "주관식" && (
            <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Check className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium">주관식 정답 설정</h3>
              </div>
              <div>
                <label
                  htmlFor={`question-${index}-answer-text`}
                  className="block text-sm font-medium mb-2"
                >
                  정답 입력
                </label>
                <Input
                  id={`question-${index}-answer-text`}
                  {...register(`questions.${index}.answer.text`)}
                  placeholder="정답을 입력하세요"
                  disabled={disabled}
                />
                {questionErrors?.answer?.text && (
                  <p className="text-xs text-red-500 mt-1">
                    {questionErrors.answer.text.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
