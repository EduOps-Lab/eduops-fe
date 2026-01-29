"use client";

import { Bell } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClinicStudent } from "@/stores/clinic.store";

type NotificationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: ClinicStudent[];
};

export function NotificationModal({
  open,
  onOpenChange,
  students,
}: NotificationModalProps) {
  const handleSend = () => {
    // TODO: 알림 전송 로직
    console.log("알림 전송:", students);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" />
            수업 알림 발송
          </div>
          <DialogTitle className="text-2xl font-bold">알림톡 전송</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 발송 채널 & 발송 대상 */}
          <div className="grid grid-cols-2 gap-6">
            {/* 발송 채널 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">발송 채널</h3>
              <div className="rounded-lg border p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="channel"
                    value="kakao"
                    defaultChecked
                    className="h-4 w-4"
                  />
                  <span>카카오톡</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                현재는 카카오톡 발송 기능뿐임.
              </p>
            </div>

            {/* 발송 대상 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">발송 대상</h3>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                총 예상 수신: {students.length}명
              </p>
            </div>
          </div>

          {/* 대상 학생 정보 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">대상 학생 정보</h3>
            <div className="rounded-lg border max-h-[200px] overflow-y-auto">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== students.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      연락처: {student.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      부모님 연락처: {student.parentPhone}
                    </p>
                  </div>
                  <Button variant="secondary" size="default">
                    카카오톡
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">메시지 내용</h3>
            <Textarea
              placeholder="전송할 메시지를 입력하세요"
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSend}>알림 전송</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
