const routeManager = {
    // 当前路由栈
    routeStack: [],

    // 添加当前路由到栈中
    addCurrentRoute() {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];

        if (currentPage) {
            const routeInfo = {
                route: currentPage.route,
                options: currentPage.options,
                timestamp: Date.now()
            };

            // 避免重复添加相同的路由
            const lastRoute = this.routeStack[this.routeStack.length - 1];
            if (!lastRoute || lastRoute.route !== routeInfo.route) {
                this.routeStack.push(routeInfo);
                console.log('路由栈更新:', this.routeStack);
            }
        }
    },

    // 获取上一个路由
    getPreviousRoute() {
        if (this.routeStack.length > 1) {
            return this.routeStack[this.routeStack.length - 2];
        }
        return null;
    },

    // 清空路由栈
    clearStack() {
        this.routeStack = [];
    },

    // 获取路由栈长度
    getStackLength() {
        return this.routeStack.length;
    }
};

export default routeManager;