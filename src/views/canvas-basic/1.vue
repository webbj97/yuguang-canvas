<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'

const config: { x: number, y: number } = { x: 0, y: 0 };

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

const max = 200;
const min = 0;
const base = reactive({
    x: min, y: min, width: 100, height: 100
})

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
        // var gradient = ctx.createLinearGradient(0, 0, base.width, base.height);
        // gradient.addColorStop(0, "green");
        // gradient.addColorStop(1, "white");
        // ctx.fillStyle = gradient;
        ctx.fillStyle = 'green';
        ctx.fillRect(base.x, base.y, base.width, base.height);
    }
}

onMounted(() => {
    init();
    draw();
    console.log(111);
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
            <h4>fillRect（{{ base.x }}, {{ base.y }}, {{ base.width }}, {{ base.height }}）</h4>
            <div class="row">
                <label>width：</label>
                <a-slider id="test" :max="max" :min="min" v-model:value="base.width" />
            </div>
            <div class="row">
                <label>height：</label>
                <a-slider id="test" :max="max" :min="min" v-model:value="base.height" />
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
    
    #container {
        width: 100%;
        height: 100%;
    }
    #canvas{
        margin-top: 20px;
    }
}
</style>