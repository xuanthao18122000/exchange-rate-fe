import type { RouteRecordRaw } from "vue-router";

const AuthRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'auth.login',
        component: () => import('@/views/auth/LoginView.vue')
    },
    {
        path: '/change-password',
        name: 'auth.change_password',
        component: () => import('@/views/auth/ChangePassword.vue'),
        meta: {
            requiresAuth: true
        }
    },
];

export default AuthRoutes;