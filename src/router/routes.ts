import Home from "@/views/home/index.vue";
// import Demo from "../views/canvas/index.vue";
import Canvas1 from "@/views/canvas/1.vue";
import Canvas2 from "@/views/canvas/2.vue";
import Canvas3 from "@/views/canvas/3.vue";
import Canvas4 from "@/views/canvas/4.vue";
import Canvas5 from "@/views/canvas/5.vue";
import Canvas6 from "@/views/canvas/6.vue";
import Canvas7 from "@/views/canvas/7.vue";
import Canvas8 from "@/views/canvas/8.vue";
import Canvas9 from "@/views/canvas/9.vue";

import CanvasB1 from "@/views/canvas-basic/1.vue";
import CanvasB2 from "@/views/canvas-basic/2.vue";
import CanvasB3 from "@/views/canvas-basic/3.vue";

import CanvasP1 from "@/views/canvas-palette/1.vue"

const routes = [
    { path: "/", name: "首页", component: Home },
    {
        path: "/canvas-palette",
        name: "canvas画板",
        redirect: "/canvas-palette/1",
        children: [
            {
                path: "1",
                name: "基础画笔",
                component: CanvasP1,
            },
        ],
    },  
    {
        path: "/canvas-basic",
        name: "canvas基础",
        redirect: "/canvas-basic/1",
        children: [
            {
                path: "1",
                name: "矩形",
                component: CanvasB1,
            },
            {
                path: "2",
                name: "线段/三角形",
                component: CanvasB2,
            },
            {
                path: "3",
                name: "圆弧",
                component: CanvasB3,
            },
        ],
    },
    {
        path: "/canvas",
        name: "canvas动效",
        redirect: "/canvas/1",
        children: [
            {
                path: "1",
                name: "移动的球",
                component: Canvas1,
            },
            {
                path: "2",
                name: "移动的球（边界反弹）",
                component: Canvas2,
            },
            {
                path: "3",
                name: "移动的球（手指吸附）",
                component: Canvas3,
            },
            {
                path: "4",
                name: "移动的粒子（手指吸附）",
                component: Canvas4,
            },
            {
                path: "5",
                name: "移动的粒子（动态连线）",
                component: Canvas5,
            },
            {
                path: "6",
                name: "移动的粒子（手势渐变）",
                component: Canvas6,
            },
            {
                path: "7",
                name: "坠落的弹力球",
                component: Canvas7,
            },
            {
                path: "8",
                name: "旋转",
                component: Canvas8,
            },
            {
                path: "9",
                name: "经典贪吃蛇",
                component: Canvas9,
            },
        ],
    },
];

export default routes;
