export type AuthStore = {
    token: string,
    id: number | null,
    loggedIn: boolean
}

export type LoginForm = {
    email: string,
    password: string
}

export type ChangePasswordForm = {
    password: string,
    new_password: string,
    re_new_password: string
}