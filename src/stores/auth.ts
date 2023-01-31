import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { AuthStore } from "@type";

// Store
export const useAuthStore = defineStore('auth', () => {
        // state -> ref() or reactive()
        const authStore = ref({} as AuthStore);

        // actions -> function()
        function login(data: {token: string, id: number}) {
            authStore.value = {
                token: data.token,
                id: data.id,
                loggedIn: true
            }
        }
        function logout() {
            authStore.value = {
                token: '',
                id: null,
                loggedIn: false
            }
        }

        // getters -> computed()
        const token = computed(() => authStore.value.token)
        const loginStatus = computed(() => authStore.value.loggedIn)
        const id = computed(() => authStore.value.id)

        return {
            authStore,
            token,
            loginStatus,
            id,
            login,
            logout
        }
    },
    {
        persist: {
            key: 'auth',
            storage: localStorage
        }
    }
)