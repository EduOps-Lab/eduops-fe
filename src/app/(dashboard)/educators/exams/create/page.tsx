"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePageHeader } from "@/app/(dashboard)/educators/exams/create/_components/create/CreatePageHeader";
import { ExamSelectSection } from "@/app/(dashboard)/educators/exams/create/_components/create/ExamSelectSection";
import { ExamInfoSection } from "@/app/(dashboard)/educators/exams/create/_components/create/ExamInfoSection";
import { ExamScoreSection } from "@/app/(dashboard)/educators/exams/create/_components/create/ExamScoreSection";
import { ExamQuestionsSection } from "@/app/(dashboard)/educators/exams/create/_components/create/ExamQuestionsSection";
import {
  createDefaultQuestion,
  EXAM_FORM_DEFAULTS,
} from "@/constants/exam.defaults";
import { ExamFormInput, examFormSchema } from "@/validation/exam.validation";

export default function CreateExamPage() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const examForm = useForm<ExamFormInput>({
    resolver: zodResolver(examFormSchema),
    mode: "onChange",
    defaultValues: EXAM_FORM_DEFAULTS,
  });

  const { control, handleSubmit, formState } = examForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = useWatch({ control, name: "questions" }) || [];
  const totalQuestions = questions.length;
  const totalScore = questions.reduce(
    (sum, question) => sum + (Number(question?.score) || 0),
    0
  );
  const questionsErrorMessage =
    typeof formState.errors.questions?.message === "string"
      ? formState.errors.questions?.message
      : undefined;

  const handleAddQuestion = () => {
    if (isSaved) return;
    append(createDefaultQuestion());
  };

  const handleRemoveQuestion = (index: number) => {
    if (isSaved) return;
    remove(index);
  };

  const handleSave = handleSubmit((formData) => {
    const data = {
      ...formData,
      totalQuestions: formData.questions.length,
      totalScore,
    };

    console.log("=== 저장된 데이터 ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("==================");

    setIsSaved(true);
    alert("저장되었습니다! (콘솔을 확인하세요)");
  });

  const handleCancel = () => {
    if (isSaved) {
      setIsSaved(false);
    } else {
      if (confirm("작성 중인 내용을 취소하시겠습니까?")) {
        router.back();
      }
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <CreatePageHeader
        totalQuestions={totalQuestions}
        totalScore={totalScore}
        isSaved={isSaved}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <ExamSelectSection disabled={isSaved} />

      <ExamInfoSection form={examForm} disabled={isSaved} />

      <ExamScoreSection
        totalQuestions={totalQuestions}
        totalScore={totalScore}
        errorMessage={questionsErrorMessage}
      />

      <ExamQuestionsSection
        form={examForm}
        fields={fields}
        disabled={isSaved}
        onAdd={handleAddQuestion}
        onRemove={handleRemoveQuestion}
      />
    </div>
  );
}
