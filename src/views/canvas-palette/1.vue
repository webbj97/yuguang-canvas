<script setup lang='ts'>
import { ref, Ref, onMounted, onUnmounted, reactive } from 'vue';
import {
    RedoOutlined,
    DownloadOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { func } from 'vue-types';

interface formT {
    type: string,
    width: string,
    color: string,
    activeDraw: number,
}

const canvasList: Canvas[] = reactive([])
const form = reactive({
    type: 'pencil',
    width: '2',
    color: 'black',
    activeDraw: 0,
});

type Action = {
    x: number;
    y: number;
    method: 'drawTo'
} | {
    x: number;
    y: number;
    r: number;
    method: 'drawArc'
}

interface HistoryEntry {
    lineWidth: number;
    strokeColor: string;
    actions: Action[];
}

let history: HistoryEntry[] = []


let canvasRef = reactive({});

const list: any[] = [];

class Canvas {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    moving = false
    history: any[] = []
    show = false
    currentStep = 0
    historyEntry?: HistoryEntry
    constructor() {
        // 加断言
        const wrapper = document.getElementById('wrapper') as HTMLElement;
        const rect = wrapper.getBoundingClientRect();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = rect.width;
        canvas.height = rect.height;

        this.ctx = ctx;
        this.canvas = canvas;
        this.show = true;

        wrapper.append(canvas)
        canvasList.push(this);

        this.initHairPencil();
    }
    initHairPencil() {
        this.canvas.addEventListener('mousedown', (point) => this.strokeStart(point));
        this.canvas.addEventListener('mouseup', () => this.strokeEnd());
        this.canvas.addEventListener('mousemove', (point) => this.stroke(point));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('加载画笔完成...');
    }
    strokeStart(point: MouseEvent) {
        const { offsetX: x, offsetY: y } = point;
        this.moving = true;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        const isPen = form.type === 'pencil';
        const color = isPen ? form.color : '#fff';
        const width = isPen ? +form.width : 10;
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;

        this.historyEntry = {
            lineWidth: width,
            strokeColor: color,
            actions: []
        };
    }
    stroke(point: MouseEvent) {
        if (this.moving) {
            const { offsetX: x, offsetY: y } = point;
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.historyEntry?.actions.push({ method: 'drawTo', x, y })
        }
    }
    strokeEnd() {
        this.ctx.closePath();
        this.moving = false
        if (this.historyEntry) {
            history.push(this.historyEntry);
            this.currentStep = history.length;
            this.historyEntry = undefined;
        }
        console.log('历史记录', history);
    }
    download() {
        const url = this.canvas.toDataURL('image/png');
        let a: HTMLAnchorElement | null = document.createElement('a'); // 生成一个a元素
        a.href = url; // 将生成的URL设置为a.href属性
        a.download = 'picture'; // 设置图片名称
        const event = new MouseEvent('click'); // 创建一个单击事件
        a.dispatchEvent(event); // 触发a的单击事件
        a = null; // 置空
    }
    reload(clear?: true) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (clear) {
            history = history.slice(0, 0)
        }
        console.log('重置完成...');
    }
    toggleShow() {
        this.canvas.style.border = '1px solid red';
    }
    back() {
        console.log('this.currentStep', this.currentStep);
        if (this.currentStep - 1 >= 0) {
            this.reload();
            this.currentStep -= 1
            for (let i = 0; i <= this.currentStep - 1; i++) {
                this.draw(history[i])
                console.log('绘制', i);
            }
        } else {
            message.warning('没有啦~');
        }
    }
    front() {
        if (this.currentStep + 1 <= history.length) {
            this.reload();
            this.currentStep += 1;
            for (let i = 0; i <= this.currentStep - 1; i++) {
                this.draw(history[i])
                console.log('绘制', i);
            }
        } else {
            message.warning('没有啦~');
        }

    }

    draw(his: HistoryEntry) {
        const { actions, strokeColor, lineWidth } = his;
        const start = actions[0];
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeColor;

        for (let i = 0; i < actions.length; i++) {
            const p = actions[i]
            this.ctx.lineTo(p.x, p.y);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}

function reload() {
    if (canvasRef instanceof Canvas) {
        canvasRef.reload(true);
    }
}

function download() {
    if (canvasRef instanceof Canvas) {
        canvasRef.download();
    }
}

function back() {
    if (canvasRef instanceof Canvas) {
        canvasRef.back();
    }
}

function front() {
    if (canvasRef instanceof Canvas) {
        canvasRef.front();
    }
}

function add() {
    new Canvas();
}

function toggleShow(item: Canvas) {
    item.show = !item.show
}

function deleteLayer(idx: number) {
    canvasList.splice(idx, 1)
}

onMounted(() => {
    const canvas = new Canvas();
    canvasRef = canvas;
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
                <label>菜单</label>
                <div class="flex">
                    <a-tooltip placement="topLeft">
                        <template #title>清除画布</template>
                        <RedoOutlined @click.stop="reload" />
                    </a-tooltip>
                    <a-tooltip placement="topLeft">
                        <template #title>导出图片</template>
                        <DownloadOutlined @click.stop="download" />
                    </a-tooltip>
                    <a-tooltip placement="topLeft">
                        <template #title>回退</template>
                        <ArrowLeftOutlined @click.stop="back" />
                    </a-tooltip>
                    <a-tooltip placement="topLeft">
                        <template #title>前进</template>
                        <ArrowRightOutlined @click.stop="front" />
                    </a-tooltip>
                </div>
            </div>
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
            <!-- <div class="row">
                <label>画布</label>
                <div v-for="(board, idx) in canvasList">
                    <span>画板{{ (idx + 1) }}</span>
                    <eye-outlined v-if="board.show" @click="toggleShow(board)" />
                    <eye-invisible-outlined v-else @click="toggleShow(board)" />
                    <delete-outlined @click="deleteLayer(idx)" />
                </div>
            </div> -->
        </div>
        <!-- <div v-for="(c, idx) in canvasList" class="canvas-item">
            <canvas :id="`canvas-${idx}`" v-if="c.show"></canvas>
        </div> -->
    </div>
</template>

<style lang='less'>
#wrapper {
    position: relative;
    height: 100%;

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
    }

    .canvas-item {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .control-board {
        z-index: 1;
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
            background: #fff;
            border-radius: 4px;
            padding: 4px;
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

        .anticon {
            padding: 6px;
            font-size: 18px;
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