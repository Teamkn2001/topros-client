import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { login, register } from '../api/auth'

const useUserStore = create(persist((set) => ({
    user : null,
    token : null,
    register: async (formData) => {
        console.log("register", formData)
        const rs = await register(formData)
        console.log(rs)
    },
    login: async (formData) => {
        console.log("login", formData)
        const rs = await login(formData)
        console.log(rs)
        set({ user: rs.data.user, token: rs.data.token })
    },
    logout: () => set({ user: null, token: null})
}),
    {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        // store only user and token
        partialize: (state) => ({ 
            user: state.user, 
            token: state.token 
        })
    }
))

export default useUserStore