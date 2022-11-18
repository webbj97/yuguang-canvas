import Home from "@/views/home/index.vue";
// import Demo from "../views/canvas/index.vue";
import Canvas1 from "@/views/canvas/1.vue";
import Canvas2 from "@/views/canvas/2.vue";
import Canvas3 from "@/views/canvas/3.vue";
import Canvas4 from "@/views/canvas/4.vue";
import Canvas5 from "@/views/canvas/5.vue";
import Canvas6 from "@/views/canvas/6.vue";

const routes = [
    { path: "/", name: "首页", component: Home },
    {
        path: "/canvas",
        name: "canvas",
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
        ],
    },
];

export default routes;
