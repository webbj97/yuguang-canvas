import * as VueRouter from "vue-router";
import routes from './routes';
// 1. 定义路由组件.
// 2. 定义一些路由
// 从其他文件导入
// 每个路由都需要映射到一个组件。
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});

export default router
