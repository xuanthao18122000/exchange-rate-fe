type MenuItem = {
    icon: string;
    label: string;
    hasSub: boolean;
    activeAt: string[];
    route: { name: string }
    children?: {
        label: string;
        route: { name: string };
        activeAt: string[];
    }[],
}

export const menu = <MenuItem[]>([
    {
        label: 'Exchange Rate',
        icon: 'ionicon ionicon-albums',
        hasSub: false,
        route: {name: 'exchange-rate.index'},
        activeAt: ['exchange-rate.index'],
    },
    {
        label: 'Top Crypto Spot',
        icon: 'ionicon ionicon-albums',
        hasSub: false,
        route: {name: 'top-crypto-spot.index'},
        activeAt: ['top-crypto-spot.index'],
    },
    {
        label: 'Advertisement',
        icon: 'ionicon ionicon-people',
        hasSub: false,
        route: {name: 'advertisement.index'},
        activeAt: ['advertisement.index'],
    },
    {
        label: 'Users',
        icon: 'ionicon ionicon-people',
        hasSub: false,
        route: {name: 'users.index'},
        activeAt: ['users.index'],
    },
    {
        label: 'Transactions',
        icon: 'ionicon ionicon-albums',
        hasSub: false,
        route: {name: 'transaction.index'},
        activeAt: ['transaction.index'],
    },

    // {
    //     label: 'Menu',
    //     icon: 'ionicon ionicon-grid',
    //     hasSub: true,
    //     activeAt: ['home.1', 'home.2'],
    //     children: [
    //         { label: 'Submenu 1', route: {name: 'home.1'}, activeAt: ['home.1']},
    //         { label: 'Submenu 2', route: {name: 'home.2'}, activeAt: ['home.2']},
    //     ]
    // },
    {
        label: 'Security',
        icon: 'ionicon ionicon-lock-closed',
        hasSub: false,
        route: {name: 'auth.change_password'},
        activeAt: ['auth.change_password'],
    },
])