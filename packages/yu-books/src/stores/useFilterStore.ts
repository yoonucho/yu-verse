import { create } from "zustand";
import { FilterStore } from "@/types/BookInfo";

// 향후 다른 클라이언트 필터 상태 관리를 위해 스토어의 기본 구조를 남겨둡니다.

const useFilterStore = create<Partial<FilterStore>>((set) => ({
  // 이 스토어는 현재 리팩토링된 도서 목록 기능에서는 사용되지 않습니다.
  // 향후 필요한 클라이언트 전용 필터 상태를 여기에 추가할 수 있습니다.
  // 예: filters: { ... },
}));

export default useFilterStore;