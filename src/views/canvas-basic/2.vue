<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'

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

const base = reactive({
    r: 50,
    radian: 180,
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
        ctx.beginPath();
        ctx.arc(base.r, base.r, base.r, 0, base.radian * (Math.PI / 180));
        ctx.fill();
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
    <div class="page-canvas-2">
        <div class="wrapper">
            <h4>arc（{{ base.r }}, {{ base.r }}, {{ base.r }}, 0, 2π）</h4>
            <div class="row">
                <label>半径：</label>
                <a-slider id="test" :max="100" :min="20" v-model:value="base.r" />
            </div>
            <div class="row">
                <label>弧度：</label>
                <a-slider id="test" :max="360" :min="0" v-model:value="base.radian" />
            </div>
        </div>
        <div id="container">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>
<style lang="less" scoped>
.page-canvas-2 {
    position: relative;
    padding: 24px;
    height: 100%;

    .wrapper {
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

    #container {
        width: 100%;
        height: 100%;
    }

    #canvas {
        margin-top: 20px;
    }
}
</style>