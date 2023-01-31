import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ProfileStore } from "@type";

// Store
export const useProfileStore = defineStore('profile', () => {
        // state -> ref() or reactive()
        const profileStore = ref(null as ProfileStore | null);

        // actions -> function()
        function setProfile(data: ProfileStore) {
            profileStore.value = {
                id: data.id,
                username: data.username,
                code: data.code,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
        }

        return {
            profileStore,
            setProfile
        }
    }
)