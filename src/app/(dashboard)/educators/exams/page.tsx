import { ExamsHeader } from "@/app/(dashboard)/educators/exams/_components/ExamsHeader";
import { ExamsStats } from "@/app/(dashboard)/educators/exams/_components/ExamsStats";
import { ExamsList } from "@/app/(dashboard)/educators/exams/_components/ExamsList";

export default function ExamsPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <ExamsHeader />
      <ExamsStats />
      <ExamsList />
    </div>
  );
}
