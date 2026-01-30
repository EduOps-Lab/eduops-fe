"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useReportStore } from "@/stores/report.store";

export function ReportTemplateSelect() {
  const { selectedTemplate, selectTemplate } = useReportStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">템플릿 선택</h3>
      <Card className="bg-muted/30">
        <CardContent className="space-y-3 py-4">
          {/* 프리미엄 리포트 */}
          <button
            onClick={() => selectTemplate("premium")}
            className={`w-full rounded-lg p-4 text-left transition-colors ${
              selectedTemplate === "premium"
                ? "border-2 border-primary bg-background"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <p className="font-medium">프리미엄 리포트</p>
            <p className="text-sm text-muted-foreground">
              시험 상세 데이터를 반영한 리포트 템플릿
            </p>
          </button>

          {/* 심플 리포트 */}
          <button
            onClick={() => selectTemplate("simple")}
            className={`w-full rounded-lg p-4 text-left transition-colors ${
              selectedTemplate === "simple"
                ? "border-2 border-primary bg-background"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <p className="font-medium">심플 리포트</p>
            <p className="text-sm text-muted-foreground">
              간단한 성적 요약 리포트 템플릿
            </p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
