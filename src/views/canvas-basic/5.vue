<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { object } from 'vue-types';

const config: { x: number, y: number } = { x: 0, y: 0 };

function init() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const wrapper = document.getElementById('container') as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    console.log(rect);
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

const options = [
    { label: 'left', value: 'left' },
    { label: 'right', value: 'right' },
    { label: 'center', value: 'center' },
    { label: 'start', value: 'start' },
    { label: 'end', value: 'end' },
];
const base = reactive({
    x: 300,
    y: 50,
    fill: false,
    font: 50,
    align: 'left'
})

function start() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, config.x, config.y)
        ctx.textAlign = base.align as CanvasTextAlign;
        ctx.font = `${base.font}px serif`;
        ctx.fillText('Canvas!', 200, 200, 400);

        // 两条相互垂直的辅助线，两条线的交点为文本绘制的起始点：
        ctx.beginPath()
        ctx.moveTo(200, 0)
        ctx.lineTo(200, 400)
        ctx.setLineDash([10])
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, 200)
        ctx.lineTo(400, 200)
        ctx.stroke()
    }
}

onMounted(() => {
    init();
    start()
})

watch(
    () => base,
    (count, prevCount) => {
        console.log("变动");
        start();
    },
    { deep: true }
)

</script>

<template>
    <div class="page-canvas-5 page-canvas">
        <div class="page-canvas__left">
            <div class="wrapper">
                <h3>ctx.font = "{{ base.font }}px serif";</h3>
                <div class="row">
                    <a-slider :max="80" :min="30" v-model:value="base.font" />
                </div>
                <h3>ctx.textAlign = "{{ base.align }}";</h3>
                <div class="row">
                    <a-radio-group v-model:value="base.align" :options="options" />
                </div>
            </div>
        </div>
        <div id="container">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-5 {
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

            label {
                width: 100px;
            }
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

    #canvas {
        margin-top: 20px;
    }
}
</style>