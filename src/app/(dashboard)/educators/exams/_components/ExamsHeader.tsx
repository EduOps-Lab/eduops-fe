import { Button } from "@/components/ui/button";

export function ExamsHeader() {
  return (
    <div className="space-y-6">
      {/* 제목 및 설명 */}
      <div>
        <h1 className="text-3xl font-bold">시험 및 과제 관리</h1>
        <p className="mt-2 text-muted-foreground">
          학생 평가를 생성, 채점 및 관리합니다.
        </p>
      </div>

      {/* 상단 네비게이션 버튼 */}
      <div className="flex gap-2">
        <Button variant="secondary" className="rounded-full">
          시험 관리
        </Button>
        <Button variant="outline" className="rounded-full">
          시험 등록/수정
        </Button>
        <Button variant="outline" className="rounded-full">
          클리닉
        </Button>
        <Button className="rounded-full">성적표 발송</Button>
      </div>
    </div>
  );
}
