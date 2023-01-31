import type { RouteRecordRaw } from "vue-router";

const TransactionRoutes: Array<RouteRecordRaw> = [
    {
        path: '/transaction',
        alias: '/',
        name: 'transaction.index',
        component: () => import('@/views/transaction/TransactionView.vue'),
        meta: {
            requiresAuth: true
        }
    },
];

export default TransactionRoutes;
