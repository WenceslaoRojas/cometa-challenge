export const ROUTES = {
    AUTH: {
        SIGN_IN: '/sign-in'
    },
    PRIVATE: {
        WELCOME: '/welcome',
        HOME: '/home',
        PROFILE: '/profile',
        ORDERS: '/orders',
        BEER: (id: string) => `/beer/${id}`,
        ORDER: (id: string) => `/order/${id}`
    }
};
