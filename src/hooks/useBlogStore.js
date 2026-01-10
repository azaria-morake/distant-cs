import { create } from 'zustand';

export const useBlogStore = create((set) => ({
  activePostId: null,
  openPost: (id) => set({ activePostId: id }),
  closePost: () => set({ activePostId: null }),
}));
