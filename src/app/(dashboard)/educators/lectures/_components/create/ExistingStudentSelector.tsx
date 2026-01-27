"use client";

import { Input } from "@/components/ui/input";
import { Student } from "@/data/students.mock";

type ExistingStudentSelectorProps = {
  students: Student[];
  selectedIds: string[];
  searchQuery: string;
  disabled: boolean;
  onSearchChange: (value: string) => void;
  onToggle: (id: string) => void;
};

export function ExistingStudentSelector({
  students,
  selectedIds,
  searchQuery,
  disabled,
  onSearchChange,
  onToggle,
}: ExistingStudentSelectorProps) {
  return (
    <>
      <div>
        <label
          htmlFor="student-search"
          className="block text-sm font-medium mb-2"
        >
          학생 검색
        </label>
        <Input
          id="student-search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="학생 이름 또는 학교 검색"
          disabled={disabled}
        />
      </div>

      <div className="space-y-3">
        {students.map((student) => (
          <label
            key={student.id}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-accent"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(student.id)}
                onChange={() => onToggle(student.id)}
                disabled={disabled}
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">
                  {student.school} · {student.grade}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{student.phone}</p>
          </label>
        ))}
      </div>

      <div className="border-t pt-4">
        <p className="text-center text-sm text-muted-foreground border rounded-lg py-3 bg-muted/50">
          선택된 학생 {selectedIds.length}명
        </p>
      </div>
    </>
  );
}
