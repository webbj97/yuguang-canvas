<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'

const config: { x: number, y: number } = { x: 0, y: 0 };
const base = reactive({
    x: 0, y: 0, width: 100, height: 100, fillStyle: '#12de74'
})

// const canvas = document.getElementById('canvas') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d');
// <canvas id="canvas"></canvas>

// ctx

function init() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const wrapper = document.getElementById('container') as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    Object.assign(config, {
        x: rect.width,
        y: rect.height,
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

function draw() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        // 擦除一个矩形区域
        ctx.clearRect(0, 0, config.x, config.y);
        // 填充
        ctx.fillStyle = base.fillStyle;

        ctx.fillRect(base.x, base.y, base.width, base.height);
    }
}

onMounted(() => {
    init();
    draw();
})

watch(
    () => base,
    (count, prevCount) => {
        console.log("变动");
        draw();
    },
    { deep: true }
)

</script>

<template>
    <div class="page-canvas-1 page-canvas">
        <div class="wrapper">
            <h3>绘制矩形: fillRect（{{ base.x }}, {{ base.y }}, {{ base.width }}, {{ base.height }}）</h3>
            <div class="row">
                <label>width：</label>
                <a-slider id="test" :max="200" :min="20" v-model:value="base.width" />
            </div>
            <div class="row">
                <label>height：</label>
                <a-slider id="test" :max="200" :min="20" v-model:value="base.height" />
            </div>
            <br>
            <h3>填充颜色: fillStyle = {{ base.fillStyle }}</h3>
            <div class="row">
                <label>颜色</label>
                <div class="flex">
                    <a-input style="padding: 0;width: 30px;" v-model:value="base.fillStyle" type="color" />
                </div>
            </div>
        </div>
        <div id="container">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-1 {
    position: relative;
    padding: 24px;
    height: 100%;

    .wrapper {
        padding: 20px;
        width: 100%;
        max-width: 320px;
        background: rgb(236, 239, 255);
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

    #container {
        width: 100%;
        height: 100%;
    }

    #canvas {
        margin-top: 20px;
    }
}
</style>