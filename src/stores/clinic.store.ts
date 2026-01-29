import { create } from "zustand";

import { mockClinicStudents } from "@/data/clinic.mock";

export type ClinicStudent = {
  id: string;
  name: string;
  initial: string;
  color: string;
  class: string;
  examName: string;
  score: number;
  cutoff: number;
  failedDate: string;
  status: "알림 예정" | "완료";
  phone: string;
  parentPhone: string;
};

type ClinicStore = {
  students: ClinicStudent[];
  selectedIds: string[];
  selectAll: (ids: string[]) => void;
  toggleSelected: (id: string, checked: boolean) => void;
  clearSelection: () => void;
  markAsCompleted: () => void;
};

export const useClinicStore = create<ClinicStore>((set) => ({
  students: mockClinicStudents,
  selectedIds: [],
  selectAll: (ids) =>
    set(() => ({
      selectedIds: Array.from(new Set(ids)),
    })),
  toggleSelected: (id, checked) =>
    set((state) => ({
      selectedIds: checked
        ? state.selectedIds.includes(id)
          ? state.selectedIds
          : [...state.selectedIds, id]
        : state.selectedIds.filter((selectedId) => selectedId !== id),
    })),
  clearSelection: () =>
    set(() => ({
      selectedIds: [],
    })),
  markAsCompleted: () =>
    set((state) => ({
      students: state.students.map((student) =>
        state.selectedIds.includes(student.id)
          ? { ...student, status: "완료" as const }
          : student
      ),
      selectedIds: [],
    })),
}));
