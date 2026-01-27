"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExistingStudentSelector } from "@/app/(dashboard)/educators/lectures/_components/create/ExistingStudentSelector";
import { CreatePageHeader } from "@/app/(dashboard)/educators/lectures/_components/create/CreatePageHeader";
import { LectureInfoSection } from "@/app/(dashboard)/educators/lectures/_components/create/LectureInfoSection";
import { LectureScheduleSection } from "@/app/(dashboard)/educators/lectures/_components/create/LectureScheduleSection";
import { ManualStudentForm } from "@/app/(dashboard)/educators/lectures/_components/create/ManualStudentForm";
import { StudentRegistrationSection } from "@/app/(dashboard)/educators/lectures/_components/create/StudentRegistrationSection";
import { mockStudents } from "@/data/students.mock";
import { ScheduleData } from "@/types/lecture-form";
import {
  lectureFormSchema,
  LectureFormInput,
  scheduleSchema,
} from "@/validation/lecture.validation";

export default function LectureCreatePage() {
  const [activeTab, setActiveTab] = useState<"manual" | "existing">("manual");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<number[]>([1]);
  const [isSaved, setIsSaved] = useState(false);

  // React Hook Form 적용
  const lectureForm = useForm<LectureFormInput>({
    resolver: zodResolver(lectureFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      subject: "",
      grade: "",
      startDate: "",
      status: "개강전",
      students: [
        {
          name: "",
          phone: "",
          school: "",
          studentGrade: "",
          parentPhone: "",
          registrationDate: "",
        },
      ],
    },
  });

  const [scheduleData, setScheduleData] = useState<
    Record<number, ScheduleData>
  >({});

  const [searchQuery, setSearchQuery] = useState("");

  const toggleStudent = (studentId: string) => {
    if (isSaved) return;
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const addSchedule = () => {
    if (isSaved) return;
    const newId = schedules.length > 0 ? Math.max(...schedules) + 1 : 1;
    setSchedules([...schedules, newId]);
  };

  const removeSchedule = (id: number) => {
    if (isSaved) return;
    setSchedules(schedules.filter((scheduleId) => scheduleId !== id));
    const newData = { ...scheduleData };
    delete newData[id];
    setScheduleData(newData);
  };

  const handleSave = lectureForm.handleSubmit((lectureData) => {
    const hasInvalidSchedule = schedules.some(
      (id) => !scheduleSchema.safeParse(scheduleData[id]).success
    );

    if (hasInvalidSchedule) {
      alert("시간표의 요일/시작/종료 시간을 모두 입력해주세요.");
      return;
    }

    const data = {
      lecture: lectureData,
      schedules: schedules.map((id) => ({
        id,
        day: scheduleData[id]?.day || "",
        startTime: scheduleData[id]?.startTime || "",
        endTime: scheduleData[id]?.endTime || "",
      })),
      students:
        activeTab === "manual"
          ? {
              type: "manual",
              data: lectureData.students,
            }
          : {
              type: "existing",
              selectedIds: selectedStudents,
              selectedStudents: mockStudents.filter((s) =>
                selectedStudents.includes(s.id)
              ),
            },
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
        window.history.back();
      }
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <CreatePageHeader
        isSaved={isSaved}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <LectureInfoSection form={lectureForm} disabled={isSaved} />

      <LectureScheduleSection
        schedules={schedules}
        scheduleData={scheduleData}
        disabled={isSaved}
        onAdd={addSchedule}
        onRemove={removeSchedule}
        onScheduleDataChange={setScheduleData}
      />

      <StudentRegistrationSection
        activeTab={activeTab}
        disabled={isSaved}
        onTabChange={setActiveTab}
      >
        {activeTab === "manual" ? (
          <ManualStudentForm form={lectureForm} disabled={isSaved} />
        ) : (
          <ExistingStudentSelector
            students={mockStudents}
            selectedIds={selectedStudents}
            searchQuery={searchQuery}
            disabled={isSaved}
            onSearchChange={setSearchQuery}
            onToggle={toggleStudent}
          />
        )}
      </StudentRegistrationSection>
    </div>
  );
}
