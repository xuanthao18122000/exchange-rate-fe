import createClient from '@/lib/axios/axios'
import type { CreateUser, ConfigUser } from '@type'

const client = createClient()

// List User
export async function listUser(){
    const url = '/user/list-user'
    try {
        const { data } = await client.get(url)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

// Create User
export async function createUser(params: CreateUser){
    const url = '/user/create-user'
    try {
        const { data } = await client.post(url, params)
        return data
    } catch (error: any) {
        return error.response.data
    }
}

// Config User
export async function configUser(params: ConfigUser){
    const url = '/user/config'
    try {
        const { data } = await client.post(url, params)
        return data
    } catch (error: any) {
        return error.response.data
    }
}