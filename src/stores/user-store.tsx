import { User } from "firebase/auth";
import { create } from "zustand";

type UserType = User | null

interface IUserStateStore {
    isLoading: boolean,
    user: UserType,
    setUser: (user: UserType) => void 
    setLoading: (loading: boolean) => void
}

export const useUserState = create<IUserStateStore>(set => ({
    isLoading: true,
    user: null,
    setUser: user => set({isLoading: false, user}),
    setLoading: isLoading => set({isLoading})
}))