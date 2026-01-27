"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockStudentEnrollments } from "@/data/students.mock";
import SelectBtn from "@/components/common/button/SelectBtn";
import { useModal } from "@/providers/ModalProvider";
import { useStudentSelectionStore } from "@/stores/studentsList.store";

type SendTarget = "all" | "student" | "parent";

export function TalkNotificationModal() {
  const { isOpen, closeModal } = useModal();
  const [sendChannel, setSendChannel] = useState("kakao");
  const [sendTarget, setSendTarget] = useState<SendTarget>("all");
  const [messageContent, setMessageContent] = useState("");

  // 선택된 학생들 가져오기
  const selectedStudentIds = useStudentSelectionStore(
    (state) => state.selectedStudentIds
  );

  // 선택된 학생 및 학부모의 수
  const selectedStudents = mockStudentEnrollments.filter((s) =>
    selectedStudentIds.includes(s.enrollmentId)
  );

  const getExpectedRecipients = () => {
    const studentCount = selectedStudents.length;
    if (sendTarget === "all") return studentCount * 2; // 학생 + 학부모
    return studentCount;
  };

  const handleSubmit = () => {
    console.log({
      selectedStudentIds,
      sendChannel,
      sendTarget,
      messageContent,
    });
    // TODO: API 호출
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setSendChannel("kakao");
    setSendTarget("all");
    setMessageContent("");
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      {" "}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              수업 알림 발송
            </span>
          </div>
          <DialogTitle className="text-xl flex items-center gap-2">
            알림톡 전송
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="w-full grid grid-cols-2 gap-3 items-start">
            <div>
              <Label>발송 채널</Label>
              <RadioGroup value={sendChannel} onValueChange={setSendChannel}>
                <div className="flex items-center space-x-3 border rounded-lg px-4 py-3 w-full">
                  <RadioGroupItem value="kakao" id="kakao" />
                  <Label htmlFor="kakao" className="font-normal cursor-pointer">
                    카카오톡
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 발송 대상 */}
            <div>
              <Label>발송 대상</Label>
              <div className="flex border rounded-lg p-4">
                <div className="flex flex-col gap-2 w-full">
                  <SelectBtn
                    className="w-full"
                    value={sendTarget}
                    placeholder="발송 대상 선택"
                    options={[
                      { label: "전체", value: "all" },
                      { label: "학생", value: "student" },
                      { label: "학부모", value: "parent" },
                    ]}
                    onChange={(value) => setSendTarget(value as SendTarget)}
                  />
                  <p className="text-xs text-muted-foreground">
                    총 예상 수신: {getExpectedRecipients()}명
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 대상 학생 정보 */}
          <div>
            <Label>대상 학생 정보</Label>
            <div className="border rounded-lg p-4 space-y-2 max-h-[200px] overflow-y-auto">
              {selectedStudents.map((studentData) => (
                <div
                  key={studentData.enrollmentId}
                  className="space-y-1 pb-2 border-b last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm mb-1">{studentData.student.name}</p>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        연락처: {studentData.student.phone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        부모님 연락처: {studentData.parent.phone}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {sendChannel === "kakao" ? "카카오톡" : "SMS"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>메시지 내용</Label>
            {/* 메시지 입력 */}
            <Textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="전송할 메시지를 입력하세요"
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            className="cursor-pointer"
            variant="default"
            onClick={handleSubmit}
            disabled={
              !messageContent ||
              selectedStudents.length === 0 ||
              getExpectedRecipients() === 0
            }
          >
            알림 전송
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
