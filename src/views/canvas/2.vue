<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, onUnmounted } from 'vue'

const r = 50; // 半径
const config = { x: r, y: r } // 起始坐标
let w = 0 // 画板宽
let h = 0 // 画板高
let rAF: number
const speed = { // 方向+速度
    x: 5,
    y: 5,
};

function init() {
    const ele = document.querySelector('.page-canvas-3') as Element
    w = ele.clientWidth
    h = ele.clientHeight
    config.x = w / 2
    config.y = w / 2
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = canvasRef;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = w;
        canvas.height = h;
    }
}

function animate() {
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = canvasRef;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        config.x += speed.x;
        config.y += speed.y;

        // 边界碰撞反弹
        if (config.x > (w - r) || config.x < r) {
            speed.x *= -1;
        }
        if (config.y > h - r || config.y < r) {
            speed.y *= -1;
        }


        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(config.x, config.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        rAF = requestAnimationFrame(animate);
    }
}

onMounted(() => {
    init();
    animate()
})

onUnmounted(() => {
    cancelAnimationFrame(rAF)
})


</script>

<template>
    <div class="page-canvas-3">
        <p>渲染上下文：ctx</p>
        <p>填充颜色：ctx.fillStyle</p>
        <p>创建弧线和曲线：ctx.arc
            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect">#</a>
        </p>
        <p></p>

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
        top: 0;
        left: 0;
    }
}
</style>
