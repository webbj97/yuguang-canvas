<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'

const config: { x: number, y: number } = { x: 0, y: 0 };
const base = reactive({
    x: 0,
    y: 0,
})

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



function start() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, config.x, config.y)

        ctx.moveTo(100, 100)
        ctx.lineTo(600, 100)
       
        ctx.shadowColor = '#ccc' // 设置阴影颜色
        ctx.shadowBlur = 3 // 设置阴影模糊度
        ctx.lineWidth = 6;

        ctx.shadowOffsetX = base.x * 0.5 // 向x轴正方向平移10像素
        ctx.shadowOffsetY = base.y * 0.5  // 向y轴正方向平移10像素
        
        ctx.stroke()
        // 绘制一个带阴影的矩形：
        ctx.fillRect(100, 150, 100, 50)
        // 绘制带阴影的文本：
        ctx.lineWidth = 1
        ctx.font = '30px Verdana'
        ctx.strokeText('Hello Canvas!', 300, 190, 400)
        // 绘制带阴影的圆：
        ctx.beginPath();

        ctx.shadowOffsetX = base.x * -1 // 向x轴负方向平移20像素
        ctx.shadowOffsetY = base.y * -1 // 向y轴负方向平移20像素
        ctx.shadowColor = 'skyblue' // 设置阴影颜色为天蓝色
        ctx.shadowBlur = 9 // 设置阴影模糊度
        ctx.lineWidth = 5
        ctx.arc(350, 400, 100, 0, 2 * Math.PI)
        ctx.stroke()
    }
}

onMounted(() => {
    init();
    start();
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
    <div class="page-canvas-6 page-canvas">
        <div class="page-canvas__left">
            <div class="wrapper">
                <h3>控制面板</h3>
                <div class="row">
                    <label>x偏移：</label>
                    <a-slider :max="20" :min="0" v-model:value="base.x" />
                </div>
                <div class="row">
                    <label>y偏移：</label>
                    <a-slider :max="20" :min="0" v-model:value="base.y" />
                </div>
            </div>
        </div>
        <div id="container">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-6 {
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