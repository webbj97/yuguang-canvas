<script setup lang="ts">
import { nextTick, ref, reactive, onMounted, onUnmounted, watch } from 'vue'

// 基础定义
let w = 0 // 画板宽
let h = 0 // 画板高
let rAF: number
const base = reactive({
    r: 50,
    follow: false,
})
const options = [
    { value: true, label: '是' },
    { value: false, label: '否' }
]
const config = { x: base.r, y: base.r } // 起始坐标
let move = false;
// 初始化
function init() {
    const ele = document.querySelector('.page-canvas-1') as Element
    w = ele.clientWidth
    h = ele.clientHeight
    config.x = ele.clientWidth / 2
    config.y = ele.clientHeight / 2
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = canvasRef;
    canvas.onpointerdown = (point) => strokeStart(point);
    canvas.onpointermove = (point) => stroke(point);
    canvas.onpointerup = () => strokeEnd();
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = ele.clientWidth;
        canvas.height = ele.clientHeight;
    }
}
function strokeStart(point: PointerEvent) {
    const { offsetX: x, offsetY: y } = point;
    if (base.follow) {
        move = true;
        config.x = x;
        config.y = y;
        draw();
    } else if (config.x + base.r > x && config.x - base.r < x && config.y + base.r > y && config.y - base.r < y) {
        move = true;
    }

}
function stroke(point: PointerEvent) {
    if (move) {
        const { offsetX: x, offsetY: y } = point;
        config.x = x;
        config.y = y;
        draw();
    }
}
function strokeEnd() {
    move = false;
    draw();
}
function draw() {
    const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = canvasRef;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        // 边界碰撞反弹
        if (config.x > (w - base.r) || config.x < base.r) {
            config.x = config.x < base.r ? base.r : w - base.r;
        }
        if (config.y > h - base.r || config.y < base.r) {
            config.y = config.y < base.r ? base.r : h - base.r;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'skyblue';
        ctx.arc(config.x, config.y, base.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
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
    <div class="page-canvas-1">
        <div class="wrapper">
            <div class="row">
                <label>跟随:</label>
                <a-radio-group v-model:value="base.follow" :options="options" />
            </div>
            <div class="row">
                <label>半径:</label>
                <a-slider id="test" :max="70" :min="30" v-model:value="base.r" />
            </div>
        </div>
        <canvas id="canvas"></canvas>
    </div>

</template>

<style lang="less" scoped>
.page-canvas-1 {
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
        max-width: 320px;
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
            width: 55px;
            flex-shrink: 0;
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
