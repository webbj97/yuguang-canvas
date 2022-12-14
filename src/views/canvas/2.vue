<script setup lang="ts">
import { nextTick, ref, reactive, onMounted, onUnmounted, watch } from 'vue'

// 基础定义
let w = 0 // 画板宽
let h = 0 // 画板高
let rAF: number
const base = reactive({
    r: 50,
})
const speed = { // 方向+速度
    x: 5,
    y: 5,
};
const config = { x: base.r, y: base.r } // 起始坐标

// 初始化
function init() {
    const ele = document.querySelector('.page-canvas-3') as Element
    w = ele.clientWidth
    h = ele.clientHeight
    config.x = ele.clientWidth / 2
    config.y = ele.clientWidth / 2
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = canvasRef;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = ele.clientWidth;
        canvas.height = ele.clientWidth;
    }
}
// 
function draw() {
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
        if (config.x > (w - base.r) || config.x < base.r) {
            speed.x *= -1;
        }
        if (config.y > h - base.r || config.y < base.r) {
            speed.y *= -1;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(config.x, config.y, base.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        rAF = requestAnimationFrame(draw);
    }
}

onMounted(() => {
    init();
    draw()
})

onUnmounted(() => {
    cancelAnimationFrame(rAF)
})

watch(
    () => base,
    (count, prevCount) => {
        console.log("变动");
        cancelAnimationFrame(rAF)
        draw();
    },
    { deep: true }
)
</script>

<template>
    <div class="page-canvas-3">
        <div class="wrapper">
            <div class="row">
                <label>半径</label>
                <a-slider id="test" :max="70" :min="30" v-model:value="base.r" />
            </div>
            <!-- <div class="row">
                <label>height：</label>
                <a-slider id="test" :max="max" :min="min" v-model:value="base.height" />
            </div> -->
        </div>
        <canvas id="canvas"></canvas>
    </div>

</template>

<style lang="less" scoped>
.page-canvas-3 {
    position: relative;
    min-height: 100%;
    padding: 24px;

    .wrapper {
        position: absolute;
        z-index: 2;
        top: 10px;
        left: 10px;
        padding: 20px;
        width: 100%;
        max-width: 300px;
        background: #ECEFFF;
        border-radius: 16px;

        .row {
            display: flex;
            align-items: center;
        }

        .ant-slider {
            width: 300px;
        }

        label {
            width: 55px
        }
    }

    #canvas {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
    }
}
</style>
