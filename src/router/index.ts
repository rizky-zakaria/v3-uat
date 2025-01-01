import appSetting from '@/app-setting';
import { useAppStore } from '@/stores/index';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'home', component: HomeView },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
