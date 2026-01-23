import { LecturesHeader } from "@/app/(dashboard)/educators/lectures/_components/LecturesHeader";
import { LecturesStats } from "@/app/(dashboard)/educators/lectures/_components/LecturesStats";
import { LecturesList } from "@/app/(dashboard)/educators/lectures/_components/LecturesList";

export default function LecturesPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <LecturesHeader />
      <LecturesStats />
      <LecturesList />
    </div>
  );
}
