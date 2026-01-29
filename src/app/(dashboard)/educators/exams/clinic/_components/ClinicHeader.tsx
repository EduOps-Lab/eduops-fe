"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";
import { useClinicStore } from "@/stores/clinic.store";

import { NotificationModal } from "../_modals/NotificationModal";

export function ClinicHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { students, selectedIds } = useClinicStore();

  const selectedStudents = students.filter((s) => selectedIds.includes(s.id));

  const handleOpenModal = () => {
    if (selectedIds.length > 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Title
          title="클리닉 대상자 관리"
          description="기준 점수 미달 학생들의 재시험 예약 및 현황을 관리합니다."
        />
        <Button
          className="gap-2"
          onClick={handleOpenModal}
          disabled={selectedIds.length === 0}
        >
          <Bell className="h-4 w-4" />
          알림 발송
        </Button>
      </div>

      <NotificationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        students={selectedStudents}
      />
    </>
  );
}
