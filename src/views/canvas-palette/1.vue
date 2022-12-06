<script setup lang='ts'>
import { ref, Ref, onMounted, onUnmounted } from 'vue';

interface formT {
    type: string,
    width: string,
    color: string,
    activeDraw: number,
    drawList: Canvas[],
}

const form: Ref<formT> = ref({
    type: 'pencil',
    width: '2',
    color: 'black',
    activeDraw: 0,
    drawList: [],
})

class Canvas {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    moving = false
    history: any[] = []
    constructor() {
        // 加断言
        const wrapper = document.getElementById('wrapper') as HTMLElement;
        const rect = wrapper.getBoundingClientRect();

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        this.ctx = ctx;
        this.canvas = canvas;

        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    initHairPencil() {
        this.canvas.addEventListener('mousedown', (point) => this.strokeStart(point));
        this.canvas.addEventListener('mouseup', () => this.strokeEnd());
        this.canvas.addEventListener('mousemove', (point) => this.stroke(point));

        console.log('加载画笔完成...');
    }
    strokeStart(point: MouseEvent) {
        const { offsetX: x, offsetY: y } = point;
        this.moving = true;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        const isPen = form.value.type === 'pencil';
        const color = isPen ? form.value.color : '#fff';
        const width = isPen ? +form.value.width : 10;
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
    }
    stroke(point: MouseEvent) {
        if (this.moving) {
            console.log(point);
            const { offsetX: x, offsetY: y } = point;
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    strokeEnd() {
        this.ctx.closePath();
        this.moving = false
    }
}

onMounted(() => {
    const canvas = new Canvas();
    form.value.drawList.push(canvas);
    form.value.activeDraw = 0;

    canvas.initHairPencil();
})

onUnmounted(() => {

})

</script>
<template>
    <div id="wrapper">
        <div class="control-board">
            <a-radio-group v-model:value="form.type" button-style="solid">
                <a-radio-button value="pencil">画笔</a-radio-button>
                <a-radio-button value="eraser">橡皮擦</a-radio-button>
            </a-radio-group>
            <div class="row">
                <label>颜色</label>
                <div class="flex">
                    <a-input v-model:value="form.color" class="palette" type="color" placeholder="请输入合法颜色" />
                    <span>{{ form.color }}</span>
                </div>
            </div>
            <div class="row">
                <label>粗细</label>
                <a-radio-group v-model:value="form.width" button-style="solid">
                    <a-radio-button value="2">2</a-radio-button>
                    <a-radio-button value="4">4</a-radio-button>
                    <a-radio-button value="6">6</a-radio-button>
                    <a-radio-button value="8">8</a-radio-button>
                </a-radio-group>
            </div>
        </div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<style lang='less'>
#wrapper {
    position: relative;
    height: 100%;

    .control-board {
        top: 10px;
        left: 10px;
        width: 240px;
        position: absolute;
        background: #ECEFFF;
        border-radius: 8px;
        padding: 24px 12px;

        .flex {
            display: flex;
            align-items: center;
        }

        .block {
            width: 40px;
            height: 40px;
            flex: 0;
        }

        .row {
            margin-top: 12px;
            display: flex;
            flex-direction: column;

            &>label {
                margin-bottom: 6px;
            }
        }
    }

    .palette {
        padding: 0;
        margin-right: 16px;
        width: 40px;
        height: 40px;
        border: none;
        box-shadow: none;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    span.line-width-1 {

        width: 10px;
        border-top: 1px solid #ccc;
        height: 0;
    }
}
</style>