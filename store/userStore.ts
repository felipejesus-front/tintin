import { create } from 'zustand';

type UserState = {
  token: string | null;
  email: string | null;
  setUser: (user: { token: string; email: string }) => void;
  logout: () => void;
};

const useUserStore = create<UserState>((set: any) => ({
  token: null,
  email: null,
  setUser: (user: any) => set({ token: user.token, email: user.email }),
  logout: () => set({ token: null, email: null }),
}));

export default useUserStore;
