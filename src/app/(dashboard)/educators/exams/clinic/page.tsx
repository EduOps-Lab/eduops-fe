import { ClinicHeader } from "./_components/ClinicHeader";
import { ClinicStats } from "./_components/ClinicStats";
import { ClinicFilters } from "./_components/ClinicFilters";
import { ClinicTable } from "./_components/ClinicTable";

export default function ClinicPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <ClinicHeader />
      <ClinicStats />
      <ClinicFilters />
      <ClinicTable />
    </div>
  );
}
