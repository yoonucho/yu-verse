import { create } from "zustand";

// 향후 다른 클라이언트 상태 관리를 위해 스토어의 기본 구조를 남겨둡니다.
// 예: UI 테마, 사용자 설정, 장바구니 등

type BookStore = {
  // 예시: 즐겨찾기 기능 상태
  // favoriteISBNs: number[];
  // addFavorite: (isbn: number) => void;
  resetSearch: () => void;
};

const useBookStore = create<BookStore>((set) => ({
  // favoriteISBNs: [],
  // addFavorite: (isbn) => set((state) => ({ favoriteISBNs: [...state.favoriteISBNs, isbn] })),
  resetSearch: () => {
    // 검색 상태 리셋 로직 (필요 시 구현)
  },
}));

export default useBookStore;
