"use client";

import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type StudentRegistrationSectionProps = {
  activeTab: "manual" | "existing";
  disabled: boolean;
  onTabChange: (tab: "manual" | "existing") => void;
  children: ReactNode;
};

export function StudentRegistrationSection({
  activeTab,
  disabled,
  onTabChange,
  children,
}: StudentRegistrationSectionProps) {
  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">👥 수기입력 학생 등록</h2>
      </div>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-4 border-b">
          <button
            type="button"
            onClick={() => !disabled && onTabChange("manual")}
            disabled={disabled}
            className={`pb-3 px-1 ${
              activeTab === "manual"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            수기 입력
          </button>
          <button
            type="button"
            onClick={() => !disabled && onTabChange("existing")}
            disabled={disabled}
            className={`pb-3 px-1 ${
              activeTab === "existing"
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            기존 학생 선택
          </button>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
