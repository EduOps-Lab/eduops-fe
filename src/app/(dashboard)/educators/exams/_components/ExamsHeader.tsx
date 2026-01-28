import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";

export function ExamsHeader() {
  return (
    <div className="space-y-6">
      {/* 제목 및 설명 */}
      <Title
        title="시험 및 과제 관리"
        description="학생 평가를 생성, 채점 및 관리합니다."
      />

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
