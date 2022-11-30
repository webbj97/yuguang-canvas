<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
import base1 from './data';

const config = {
    w: window.innerWidth / 2,
    h: window.innerHeight / 2
}

function init() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        canvas.width = config.w;
        canvas.height = config.h;
    }
}

const options = [
    { label: '是', value: true },
    { label: '否', value: false },
];
const max = 400;
const min = 100;
const base = reactive({
    x: min, y: min, fill: false
})

function animate() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, config.w, config.h);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(base.x, base.y);
        ctx.lineTo(0, base.y);
        ctx.lineTo(base.x, 0);

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgb(${base.x % 255},${base.y % 255},0)`;
        ctx.stroke();
        if (base.fill) {
            ctx.fill();
        }
    }
}

onMounted(() => {
    init();
    animate();
})

watch(
    () => base,
    (count, prevCount) => {
        console.log("变动");
        animate();
    },
    { deep: true }
)

</script>

<template>
    <div class="page-canvas-2 page-canvas">
        <div class="page-canvas__left">
            <p>渲染上下文：ctx</p>
            <p>笔触起点：ctx.moveTo(0, 0);</p>
            <p>画线1：ctx.lineTo({{ base.x }}, {{ base.y }});</p>
            <p>画线2：ctx.lineTo(0, {{ base.y }});</p>
            <p>画线3：ctx.lineTo({{ base.x }}, 0);</p>
            <p>填充颜色：ctx.fillStyle</p>
            <p>填充路径绘制区域：ctx.fill()</p>

            <div class="wrapper">
                <h2>控制面板</h2>
                <div class="row">
                    <label>x：</label>
                    <a-slider id="test" :max="max" :min="min" v-model:value="base.x" />
                </div>
                <div class="row">
                    <label>y：</label>
                    <a-slider id="test" :max="max" :min="min" v-model:value="base.y" />
                </div>
                <div class="row">
                    <label>填充：</label>
                    <a-radio-group v-model:value="base.fill" :options="options" />
                </div>
            </div>
        </div>
        <div class="page-canvas__right">
            <canvas id="canvas"></canvas>
        </div>
    </div>

</template>

<style lang="less" scoped>
.page-canvas-2 {
    position: relative;
    padding: 24px;

    .wrapper {
        padding: 20px;
        width: 100%;
        background: #a6afba;
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
}

.page-canvas {
    display: flex;

    &__left {
        width: 30%;
    }

    &__right {
        margin-left: auto;
    }
}
</style>