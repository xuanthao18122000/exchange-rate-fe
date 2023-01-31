export type FilterTransaction = {
    page: number | null,
    limit: number | null,
    address?: string | null,
    currency?: string | null,
    user_id?: number | string | null,
    third_party_id?: number | null,
    agent_id?: number | null,
    network?: string | null,
}