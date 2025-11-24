export function getCurrentRouteInfo() {
    const pages = getCurrentPages();
    if (pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        return {
            route: currentPage.route,
            options: currentPage.options || {}
        };
    }
    return null;
}

// 在页面中使用
import { getCurrentRouteInfo } from '@/pages/utils/route.js';

export default {
    mounted() {
        const routeInfo = getCurrentRouteInfo();
        console.log('路由信息:', routeInfo);
    }
}
