import { create } from "zustand";

type StudentSelectionState = {
  selectedStudentIds: string[];
  setSelectedStudentIds: (ids: string[]) => void;
  toggleStudent: (id: string) => void;
  removeStudent: (id: string) => void;
  resetSelection: () => void;
};

export const useStudentSelectionStore = create<StudentSelectionState>(
  (set) => ({
    selectedStudentIds: [],

    setSelectedStudentIds: (ids) => set({ selectedStudentIds: ids }),

    toggleStudent: (id) =>
      set((state) => ({
        selectedStudentIds: state.selectedStudentIds.includes(id)
          ? state.selectedStudentIds.filter((v) => v !== id)
          : [...state.selectedStudentIds, id],
      })),

    removeStudent: (id) =>
      set((state) => ({
        selectedStudentIds: state.selectedStudentIds.filter(
          (sid) => sid !== id
        ),
      })),

    resetSelection: () => set({ selectedStudentIds: [] }),
  })
);
