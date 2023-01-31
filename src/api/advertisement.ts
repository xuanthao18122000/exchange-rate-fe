import createClient from '@/lib/axios/axios'
import type { FilterTransaction } from '@type'

const client = createClient()

export async function listAdv(filter: FilterTransaction){
    const url = '/advertisement/list'
    try {
        const { data } = await client.get(url, { params: filter })
        console.log(data)
        return data.data
    } catch (error: any) {
        return error.response.data
    }
}
