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
import Canvas10 from "@/views/canvas/10.vue";

import CanvasB1 from "@/views/canvas-basic/1.vue";

const routes = [
    { path: "/", name: "首页", component: Home },
    {
        path: "/canvas-basic",
        name: "canvas常用方法",
        redirect: "/canvas-basic/1",
        children: [
            {
                path: "1",
                name: "canvas-basic-1",
                component: CanvasB1,
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
                name: "canvas-1",
                component: Canvas1,
            },
            {
                path: "2",
                name: "canvas-2",
                component: Canvas2,
            },
            {
                path: "3",
                name: "canvas-3",
                component: Canvas3,
            },
            {
                path: "4",
                name: "canvas-4",
                component: Canvas4,
            },
            {
                path: "5",
                name: "canvas-5",
                component: Canvas5,
            },
            {
                path: "6",
                name: "canvas-6",
                component: Canvas6,
            },
            {
                path: "7",
                name: "canvas-7",
                component: Canvas7,
            },
            {
                path: "8",
                name: "canvas-8",
                component: Canvas8,
            },
            {
                path: "9",
                name: "canvas-9",
                component: Canvas9,
            },
            {
                path: "10",
                name: "canvas-10",
                component: Canvas10,
            },
        ],
    },
];

export default routes;
