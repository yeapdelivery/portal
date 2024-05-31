import { create } from "zustand";
import { User } from "../models/user";

interface UserStore {
  user: User;
  setUser: (settings: Partial<User>) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (settings) =>
    set((state) => ({
      user: {
        ...state.user,
        ...settings,
      },
    })),
}));
