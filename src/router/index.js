// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 页面组件导入
const Home = () => import('@/pages/home/home_index.vue');
const Activity = () => import('@/pages/activity/index.vue');
const My = () => import('@/pages/my/user.vue');
const Login = () => import('@/pages/login/index.vue');
const Error = () => import('@/pages/error/index.vue');

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页',
            requiresAuth: false
        }
    },
    {
        path: '/activity',
        name: 'Activity',
        component: Activity,
        meta: {
            title: '活动推荐',
            requiresAuth: false
        }
    },
    {
        path: '/my',
        name: 'My',
        component: My,
        meta: {
            title: '我的',
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            requiresAuth: false
        }
    },
    {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: {
            title: '错误页面',
            requiresAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/error'
    }
];

// 动态获取基础路径
const getBasePath = () => {
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const match = pathname.match(/^\/sensor\/ddingWork\/([^/]+)/);

        if (match) {
            const city = match[1];
            return `/sensor/ddingWork/${city}/`;
        }
    }
    return '/';
};

const basePath = getBasePath();
console.log('Vue Router basePath:', basePath);

const router = createRouter({
    history: createWebHistory(basePath),
    routes
});

// 避免重复导航
const originalPush = router.push;
router.push = function push(location) {
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
            throw err;
        }
    });
};

// 路由守卫
router.beforeEach((to, from, next) => {
    console.log(`路由跳转: ${from.path} -> ${to.path}`);

    // 设置页面标题
    if (to.meta.title) {
        document.title = to.meta.title;

        // 在UniApp中也要设置导航栏标题
        if (typeof uni !== 'undefined') {
            uni.setNavigationBarTitle({
                title: to.meta.title
            });
        }
    }

    next();
});

router.afterEach((to, from) => {
    console.log('路由跳转完成:', to.path);
});

// 路由错误处理
router.onError((error) => {
    console.error('路由错误:', error);
});

export default router;