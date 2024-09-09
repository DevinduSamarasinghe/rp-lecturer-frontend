import create from 'zustand';

const useStore = create((set)=>({

    user:null,
    theme: 'light',
    isLoggedIn: true,
    setUser : (user)=> set(()=> ({user})),
    toggleTheme: ()=> set((state)=>({theme: state.theme === 'light' ? 'dark' : 'light'})),
    setLogInStatus: (status)=> set(()=>({isLoggedIn: status})),

    facialRecognitionAccuracy: null,
    lecturePresenceSpread: null,
    setFacialRecognitionAccuracy: (accuracy)=> set(()=> ({facialRecognitionAccuracy: accuracy})),
    setLecturePresenceSpread: (spread)=> set(()=> ({lecturePresenceSpread: spread})),

    
}))

export default useStore;