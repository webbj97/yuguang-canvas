<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { object } from 'vue-types';

const config: { x: number, y: number } = { x: 0, y: 0 };

function init() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    Object.assign(config, {
        x: 325,
        y: 310,
    })
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = config.x;
        canvas.height = config.y;
    }
}

onMounted(() => {
    init();
    start();
})

const max = 300;
const min = 0;
const base = reactive({
    x: min, y: min, width: 100, height: 100
})

function start() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
        return
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    const img = new Image();
    img.src = 'http://panpan.dapanna.cn//image-20221009113426344.png';
    // 图片加载完成之后绘制图片：
    img.onload = function () {
        ctx.drawImage(img, 0, 0); // 在(0,0)处绘制原图
    }

    onMounted(() => {
        init();
        start()
    })
}
</script>

<template>
    <div class="page-canvas-5 page-canvas">
        <p>ctx.drawImage(img, 0, 0); // 在(0,0)处绘制原图</p>
        <div id="container">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-5 {
    position: relative;
    padding: 24px;

    #container {
        width: 100%;
        height: 100%;
    }

    #canvas {
        margin-top: 20px;
    }
}
</style>