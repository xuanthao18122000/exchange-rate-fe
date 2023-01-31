import createClient from '@/lib/axios/axios'
import type { LoginForm, ChangePasswordForm } from "@type";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";

const client = createClient()

// Login
export async function login(theUser: LoginForm){
    const store = useAuthStore()
    const url = '/auth/login'
    try {
        const { data } = await client.post(url, theUser);
        console.log(data)
        if(data.success && data.code == 0){
            // Keep token in store, vue-persist put store to localStorage if supported
            store.login({
                token: data.token,
                id: data.id
            })
        }
        return data
    } catch (error: any) {
        return error.response.data
    }
}

// Profile
export async function getProfile(){
    const store = useProfileStore()
    const url = '/auth/user-info'
    try {
        const { data } = await client.get(url);
        if(!data.statusCode){
            store.setProfile(data)
        }
        return data
    } catch (error: any) {
        return error.response.data
    }
}

// Change Password
export async function changePassword(params: ChangePasswordForm){
    const url = '/user/change-password'
    try {
        const { data } = await client.put(url, params)
        return data
    } catch (error: any) {
        return error.response.data
    }
}