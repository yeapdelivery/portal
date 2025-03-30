import { create } from "zustand";

interface Chat {
  unreadMessages: string[];
  setUnreadMessages: (ids: string[]) => void;
  clearUnreadMessages: () => void;
}

export const useChat = create<Chat>((set) => ({
  chat: {} as Chat,
  setUnreadMessages: (settings) =>
    set((state) => ({
      ...state,
      unreadMessages: settings,
    })),
  clearUnreadMessages: () =>
    set(() => ({
      unreadMessages: [],
    })),
  unreadMessages: [],
}));
