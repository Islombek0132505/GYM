import { create } from "zustand"

type BreakRuleState = "break" | "free"

interface IBreakRuleStateStore {
    breakState: BreakRuleState,
    setBreak: (state: BreakRuleState) => void 
}

export const useBreakRuleState = create<IBreakRuleStateStore>(set => ({
    breakState: 'free',
    setBreak: state => set({breakState: state})
}))

