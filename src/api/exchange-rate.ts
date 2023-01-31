import createClient from '@/lib/axios/axios'
import type { FilterTransaction } from '@type'

const client = createClient()

export async function listCoin(filter: FilterTransaction){
    const url = '/exchange-rate/list'
    try {
        const { data } = await client.get(url, { params: filter })
        console.log(data)
        return data.data
    } catch (error: any) {
        return error.response.data
    }
}

export async function listTopSpot(filter: FilterTransaction){
    const url = '/exchange-rate/top-crypto-spot/list'
    try {
        const { data } = await client.get(url, { params: filter })
        console.log(data)
        return data.data
    } catch (error: any) {
        return error.response.data
    }
}