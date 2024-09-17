// store/useStore.js
import { create } from 'zustand';

// Zustand store definition
const useStore = create((set) => ({
    activeTime: null,
    passiveTime: null,
    sessionContext: null,

    isStagnant: false, 
    mostFrequentPosition: [0, 0],
    mostFrequentDirection: 'None',

    facialRecognitionAccuracy: null,
    lecturePresenceSpread: null,

    densestArea: null,
    movementDeduction: null,


    setActiveTime: (activeTime) => set(() => ({ activeTime })),
    setPassiveTime: (passiveTime) => set(() => ({ passiveTime })),
    setSessionContext: (session) => set(() => ({ session })),
    
    setIsStagnant: (isStagnant) => set(() => ({ isStagnant })),
    setMostFrequentPosition: (mostFrequentPosition) => set(() => ({ mostFrequentPosition })),
    setMostFrequentDirection: (mostFrequentDirection) => set(() => ({ mostFrequentDirection })),

    setFacialRecognitionAccuracy: (facialRecognitionAccuracy) => set(() => ({ facialRecognitionAccuracy })),
    setLecturePresenceSpread: (lecturePresenceSpread) => set(() => ({ lecturePresenceSpread })),

    setDensestArea: (densestArea) => set(() => ({ densestArea })),
    setMovementDeduction: (movementDeduction) => set(() => ({ movementDeduction })),
}));

export default useStore;
