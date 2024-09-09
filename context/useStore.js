// store/useStore.js
import { create } from 'zustand';

// Zustand store definition
const useStore = create((set) => ({
//   user: null,
//   theme: 'light',
//   session: null,

//   // Actions
//   setUser: (user) => set(() => ({ user })),
//   toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
//   setSession: (session) => set(() => ({ session })),

    activeTime: null,
    passiveTime: null,

    setActiveTime: (activeTime) => set(() => ({ activeTime })),
    setPassiveTime: (passiveTime) => set(() => ({ passiveTime })),
}));

export default useStore;
