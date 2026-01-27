"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockLectures } from "@/data/lectures.mock";
import { mockStudentEnrollments } from "@/data/students.mock";
import { useModal } from "@/providers/ModalProvider";
import { useStudentSelectionStore } from "@/stores/studentsList.store";
import SelectBtn from "@/components/common/button/SelectBtn";

export function StudentChangeModal() {
  const { isOpen, closeModal } = useModal();
  const [targetLecture, setTargetLecture] = useState("");
  const [memo, setMemo] = useState("");

  // 선택된 학생들 가져오기
  const selectedStudentIds = useStudentSelectionStore(
    (state) => state.selectedStudentIds
  );

  // 선택된 학생 제거
  const removeStudent = useStudentSelectionStore(
    (state) => state.removeStudent
  );

  // 선택된 학생 수
  const selectedStudents = mockStudentEnrollments.filter((s) =>
    selectedStudentIds.includes(s.enrollmentId)
  );

  const clearSelection = useStudentSelectionStore(
    (state) => state.resetSelection
  );

  const handleSubmit = () => {
    console.log({
      studentIds: selectedStudentIds,
      targetLecture,
      memo,
    });

    // TODO: API 호출
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setTargetLecture("");
    setMemo("");
    clearSelection();
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      {" "}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-xs text-muted-foreground mb-1">수업 이동</div>
          <DialogTitle className="text-xl">선택 학생 수업 변경</DialogTitle>
          <DialogDescription>
            이동할 학생을 선택하고 새로운 수업을 지정하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 학생 선택 섹션 */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                선택한 학생 {selectedStudents.length}명
              </p>
            </div>

            {/* 학생 목록 */}
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {selectedStudents.length === 0 ? (
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent">
                  <p className="text-center text-sm text-muted-foreground">
                    선택한 학생이 없습니다.
                  </p>
                </div>
              ) : (
                selectedStudents.map((student) => (
                  <div
                    key={student.enrollmentId}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {student.student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        현재 수업: {student.lecture.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`학생 ${student.student.name} 삭제`}
                      className="px-2 py-1 hover:bg-red-100 rounded"
                      onClick={() => removeStudent(student.enrollmentId)}
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* 이동할 수업 선택 */}
            <div className="space-y-2">
              <Label htmlFor="targetLecture">
                이동할 수업 <span className="text-red-500">*</span>
              </Label>

              <SelectBtn
                id="targetLecture"
                className="w-full"
                value={targetLecture}
                placeholder="수업 선택"
                options={mockLectures.map((lecture) => ({
                  label: lecture.name,
                  value: lecture.id,
                }))}
                onChange={setTargetLecture}
              />
            </div>
          </div>

          {/* 메모 */}
          <div className="space-y-2">
            <Label htmlFor="memo">메모</Label>
            <Textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="수업 변경 사유를 입력하세요"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs text-muted-foreground">
            선택 학생과 담당 강사에게 알림이 전송됩니다.
          </p>
          <div className="flex gap-2">
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
              onClick={handleSubmit}
              disabled={selectedStudents.length === 0 || !targetLecture}
            >
              수업 변경 적용
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
