"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScheduleData } from "@/types/lecture-form";

type LectureScheduleSectionProps = {
  schedules: number[];
  scheduleData: Record<number, ScheduleData>;
  disabled: boolean;
  onAdd: () => void;
  onRemove: (id: number) => void;
  onScheduleDataChange: (nextData: Record<number, ScheduleData>) => void;
};

export function LectureScheduleSection({
  schedules,
  scheduleData,
  disabled,
  onAdd,
  onRemove,
  onScheduleDataChange,
}: LectureScheduleSectionProps) {
  const updateScheduleField = (
    id: number,
    field: keyof ScheduleData,
    value: string
  ) => {
    onScheduleDataChange({
      ...scheduleData,
      [id]: {
        day: scheduleData[id]?.day || "",
        startTime: scheduleData[id]?.startTime || "",
        endTime: scheduleData[id]?.endTime || "",
        [field]: value,
      },
    });
  };

  return (
    <Card>
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">📅 강의 시간표</h2>
        <Button
          onClick={onAdd}
          size="default"
          variant="outline"
          disabled={disabled}
        >
          + 시간 추가
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-[1fr_1fr_1fr_48px] gap-4 mb-4 text-sm font-medium text-muted-foreground">
          <div>요일</div>
          <div>시작 시간</div>
          <div>종료 시간</div>
          <div></div>
        </div>

        <div className="space-y-3">
          {schedules.map((scheduleId) => (
            <div
              key={scheduleId}
              className="grid grid-cols-[1fr_1fr_1fr_48px] gap-4 items-center"
            >
              <select
                value={scheduleData[scheduleId]?.day || ""}
                onChange={(e) =>
                  updateScheduleField(scheduleId, "day", e.target.value)
                }
                disabled={disabled}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">선택</option>
                <option value="월">월요일</option>
                <option value="화">화요일</option>
                <option value="수">수요일</option>
                <option value="목">목요일</option>
                <option value="금">금요일</option>
                <option value="토">토요일</option>
                <option value="일">일요일</option>
              </select>

              <Input
                type="time"
                value={scheduleData[scheduleId]?.startTime || ""}
                onChange={(e) =>
                  updateScheduleField(scheduleId, "startTime", e.target.value)
                }
                disabled={disabled}
              />

              <Input
                type="time"
                value={scheduleData[scheduleId]?.endTime || ""}
                onChange={(e) =>
                  updateScheduleField(scheduleId, "endTime", e.target.value)
                }
                disabled={disabled}
              />

              <button
                onClick={() => onRemove(scheduleId)}
                disabled={disabled}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-input hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
