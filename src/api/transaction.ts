import createClient from '@/lib/axios/axios'
import type { FilterTransaction } from '@type'

const client = createClient()

// List Transaction
export async function listTransaction(filter: FilterTransaction){
    const url = '/transaction'
    try {
        const { data } = await client.get(url, { params: filter })
        return data
    } catch (error: any) {
        return error.response.data
    }
}

export async function listCoin(filter: FilterTransaction){
    const url = '/exchange-rate/list'
    try {
        const { data } = await client.get(url, { params: filter })
        return data
    } catch (error: any) {
        return error.response.data
    }
}