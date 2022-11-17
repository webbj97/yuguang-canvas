<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter } from 'vue'

const r = 50; // 半径
const config = { x: r, y: r } // 起始坐标
let w = 0 // 画板宽
let h = 0 // 画板高
const speed = { // 方向+速度
    x: 2,
    y: 2,
};
const pointer = { x: 0, y: 0 };
const OFFSET = 50

function init() {
    const ele = document.querySelector('.page-canvas-3') as Element
    w = ele.clientWidth
    h = ele.clientHeight
    config.x = w / 2
    config.y = w / 2
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

        const distanceX = Math.abs(config.x - pointer.x)
        const distanceY = Math.abs(config.y - pointer.y)
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
        if (distance <= OFFSET && pointer.x < (w - r) && pointer.y < (h - r) && pointer.x > r && pointer.y > r) {
            if (config.x !== pointer.x) {
                config.x = lerp(config.x, pointer.x)
            }
            if (config.y !== pointer.y) {
                config.y = lerp(config.y, pointer.y)
            }
        } else {
            config.x += speed.x;
            config.y += speed.y;

            // 边界碰撞反弹
            if (config.x > (w - r) || config.x < r) {
                speed.x *= -1;
            }
            if (config.y > (h - r) || config.y < r) {
                speed.y *= -1;
            }
        }

        ctx.beginPath();
        ctx.arc(config.x, config.y, r, 0, Math.PI * 2);
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
        <p>渲染上下文：ctx</p>
        <p>定义速度</p>
        <p>定义撞墙反弹</p>
        <p>填充颜色</p>
        <p>添加canvas监听事件，获取鼠标相对位置</p>
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
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
