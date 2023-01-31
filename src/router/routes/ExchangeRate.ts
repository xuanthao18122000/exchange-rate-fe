import type { RouteRecordRaw } from "vue-router";

const ExchangeRateRoutes: Array<RouteRecordRaw> = [
    {
        path: '/exchange-rate',
        alias: '/',
        name: 'exchange-rate.index',
        component: () => import('@/views/exchange-rate/ExchangeRateView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/top-crypto-spot',
        alias: '/',
        name: 'top-crypto-spot.index',
        component: () => import('@/views/top-crypto-spot/TopCryptoSpotView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/advertisement',
        alias: '/',
        name: 'advertisement.index',
        component: () => import('@/views/advertisement/AdvertisementView.vue'),
        meta: {
            requiresAuth: true
        }
    },
];

export default ExchangeRateRoutes;
