<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter } from 'vue'

type Point = { x: number, y: number }


const r = 50; // 半径
const circle = { x: r, y: r } // 起始坐标
let w = 0 // 画板宽
let h = 0 // 画板高
const speed = { // 方向+速度
    x: 2,
    y: 2,
};
const pointer = { x: 0, y: 0 };
const OFFSET = 50

function randomIntBetween(min: number, max: number) {
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

function getBetween(a: Point, b: Point) {
    const distanceX = Math.abs(a.x - b.x);
    const distanceY = Math.abs(a.y - b.y);
    return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

function init() {
    const ele = document.querySelector('.page-canvas-3') as Element
    w = ele.clientWidth
    h = ele.clientHeight
    circle.x = w / 2
    circle.y = w / 2
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    canvasRef.addEventListener('mousemove', (e) => {
        pointer.x = e.offsetX
        pointer.y = e.offsetY;
    })
    if (canvasRef) {
        const ctx = canvasRef.getContext('2d');
        if (!ctx) {
            return;
        }
        canvasRef.width = w;
        canvasRef.height = h;
    }
}

function lerp(start: number, end: number) {
    return start + ((end - start) * 0.1); // 0.1 = 过渡速率
}

function animate() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, w, h);

        const distance = getBetween(circle, pointer)
        if (distance <= OFFSET && pointer.x < (w - r) && pointer.y < (h - r) && pointer.x > r && pointer.y > r) {
            if (circle.x !== pointer.x) {
                circle.x = lerp(circle.x, pointer.x)
            }
            if (circle.y !== pointer.y) {
                circle.y = lerp(circle.y, pointer.y)
            }
        } else {
            circle.x += speed.x;
            circle.y += speed.y;

            // 边界碰撞反弹
            if (circle.x > (w - r) || circle.x < r) {
                speed.x *= -1;
            }
            if (circle.y > (h - r) || circle.y < r) {
                speed.y *= -1;
            }
        }

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        requestAnimationFrame(animate);
    }
}

onMounted(() => {
    init();
    animate()
})

</script>

<template>
    <div class="page-canvas-3">
        <p>随机生成若干速率的小球</p>
        <p>判断偏移量在合理范围，控制小球</p>
        <p>上下左右边界检测</p>
        <p>鼠标吸附效果</p>
        <canvas id="canvas"></canvas>
    </div>

</template>

<style lang="less" scoped>
.page-canvas-3 {
    position: relative;
    min-height: 100%;
    padding: 24px;

    #canvas {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
    }
}
</style>
