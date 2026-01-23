import { create } from "zustand";

import { LecturesState } from "@/types/lectures";
import { mockLectures } from "@/data/lectures.mock";

const INITIAL_VISIBLE_COUNT = 4;
const LOAD_MORE_COUNT = 2;

export const useLecturesStore = create<LecturesState>((set) => ({
  lectures: mockLectures,
  visibleCount: INITIAL_VISIBLE_COUNT,

  loadMore: () =>
    set((state) => ({
      visibleCount: state.visibleCount + LOAD_MORE_COUNT,
    })),

  resetVisibleCount: () =>
    set(() => ({
      visibleCount: INITIAL_VISIBLE_COUNT,
    })),
}));
