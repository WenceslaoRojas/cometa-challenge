import { User } from '@/lib/types/auth.types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStoreState {
    user: User | null;
}

export const UserInitialState: AuthStoreState = {
    user: null
};

export const authStore = create(
    persist(
        (set) => {
            return {
                ...UserInitialState,
                setUser: (user: User) => set(() => ({ user }))
            };
        },
        { name: 'user-storage' }
    )
);
