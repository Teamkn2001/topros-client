import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { login, register } from '../api/auth'
import { getUserById, getUserByUsername } from '../api/guest'

const useUserStore = create(persist((set, get) => ({
    user : null,
    token : null,
    register: async (formData) => {
        const rs = await register(formData)
    },
    login: async (formData) => {
        const rs = await login(formData)
        set({ user: rs.data.user, token: rs.data.token })
    },
    logout: () => set({ user: null, token: null}),
    fetchEditedUser: async (userId) => {
        const rs = await getUserById(userId)
        set({ user: rs.userData })
       
        return rs
    }
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