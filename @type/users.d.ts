export type User = {
    id: number,
    username: string,
    status: string,
    code: string,
    created_at: string,
    updated_at: string,
    group: {id: number | null, code: string, description: string},
}

export type CreateUser = {
    email: string,
    password: string,
    group: string
}

export type ConfigUser = {
    user_id: number | undefined ,
    code: string,
    value: string
}