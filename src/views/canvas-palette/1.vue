<script setup lang='ts'>
import { ref, Ref, onMounted, onUnmounted, reactive } from 'vue';
import {
    RedoOutlined,
    DownloadOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    DeleteTwoTone,
    LeftSquareTwoTone,
    RightSquareTwoTone,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { object } from 'vue-types';

interface formT {
    type: string,
    lineWidth: string,
    strokeColor: string,
    activeDraw: number,
}

const canvasList: PaintBoard[] = reactive([])
const form: formT = reactive({
    type: 'pencil',
    lineWidth: '6',
    strokeColor: 'black',
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

// 记录类型
interface HistoryEntry {
    lineWidth: number;
    strokeColor: string;
    actions: Action[];
}

let canvasRef = reactive({});

class History {
    cacheQueue: HistoryEntry[] = []
    currentStep = 0
    step = 0
    getLength() {
        return this.cacheQueue.length;
    }
    reset() {
        this.cacheQueue = [];
        this.currentStep = 0;
        this.step = 0;
    }
    add(h: HistoryEntry) {
        this.cacheQueue.push(h);

        this.step = this.getLength();
        this.currentStep = this.getLength();
    }
    getCache(i: number) {
        return this.cacheQueue[i]
    }
}


class PaintBoard {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    moving = false
    currentStep = 0
    historyEntry: HistoryEntry | undefined
    history = new History()
    constructor() {
        // 布局 + 画板
        const wrapper = document.getElementById('wrapper') as HTMLElement;
        const rect = wrapper.getBoundingClientRect();
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = rect.width;
        canvas.height = rect.height;
        // 示例 + 历史记录
        this.ctx = ctx;
        this.canvas = canvas;
        this.history = new History();

        wrapper.append(canvas)
        canvasList.push(this);

        this.initListener();
    }
    initListener() {
        // this.canvas.addEventListener('mousedown', (point) => this.strokeStart(point));
        // this.canvas.addEventListener('mouseup', () => this.strokeEnd());
        // this.canvas.addEventListener('mousemove', (point) => this.stroke(point));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('监听画笔完成...');

        this.canvas.onpointerdown = (point) => this.strokeStart(point);
        this.canvas.onpointermove = (point) => this.stroke(point);
        this.canvas.onpointerup = () => this.strokeEnd();
        this.canvas.onpointerleave = () => this.strokeEnd();
    }
    // 监听画笔的三个方法，这段有点太重了
    strokeStart(point: MouseEvent) {
        const { offsetX: x, offsetY: y } = point;
        this.moving = true;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        const isPen = form.type === 'pencil';
        const color = isPen ? form.strokeColor : '#fff';
        const width = isPen ? +form.lineWidth : 10;

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
            this.history.add(this.historyEntry)
            this.historyEntry = undefined;
        }
    }
    // 重绘
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
    download() {
        const url = this.canvas.toDataURL('image/png');
        let a: HTMLAnchorElement | null = document.createElement('a'); // 生成一个a元素
        a.href = url; // 将生成的URL设置为a.href属性
        a.download = 'picture'; // 设置图片名称
        const event = new MouseEvent('click'); // 创建一个单击事件
        a.dispatchEvent(event); // 触发a的单击事件
        a = null; // 置空
    }
    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.history.reset();
        console.log('重置完成...');
    }
    reload() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('清空画布完成...');
    }
    back() {
        if (this.history.currentStep - 1 >= 0) {
            this.reload();
            this.history.currentStep -= 1
            for (let i = 0; i <= this.history.currentStep - 1; i++) {
                this.draw(this.history.getCache(i))
            }
        } else {
            message.warning('没有啦~');
        }
    }
    front() {
        if (this.history.currentStep + 1 <= this.history.step) {
            this.reload();
            this.history.currentStep += 1;
            for (let i = 0; i < this.history.currentStep; i++) {
                this.draw(this.history.getCache(i))
                console.log('绘制', i);
            }
        } else {
            message.warning('没有啦~');
        }

    }
}

// 临时方案
type MethodName = 'back' | 'front' | 'reset' | 'download';
function handleFunc<T extends MethodName>(method: T) {
    if (canvasRef instanceof PaintBoard) {
        canvasRef[method]();
    }
}

onMounted(() => {
    const canvas = new PaintBoard();
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
                        <template #title>回退</template>
                        <LeftSquareTwoTone @click.stop="handleFunc('back')" />
                    </a-tooltip>
                    <a-tooltip placement="topLeft">
                        <template #title>前进</template>
                        <RightSquareTwoTone @click.stop="handleFunc('front')" />
                    </a-tooltip>

                    <a-tooltip placement="topLeft">
                        <template #title>清除画布</template>
                        <DeleteTwoTone @click.stop="handleFunc('reset')" />
                    </a-tooltip>
                    <a-tooltip placement="topLeft">
                        <template #title>导出图片</template>
                        <DownloadOutlined @click.stop="handleFunc('download')" />
                    </a-tooltip>
                </div>
            </div>
            <div class="row">
                <label>颜色</label>
                <div class="flex">
                    <a-input v-model:value="form.strokeColor" class="palette" type="color" placeholder="请输入合法颜色" />
                    <span>{{ form.strokeColor }}</span>
                </div>
            </div>
            <div class="row">
                <label>粗细</label>
                <a-radio-group v-model:value="form.lineWidth" button-style="solid">
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
        border-radius: 12px;
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
            margin-right: 4px;

            &:last-child {
                margin-right: 0;
                margin-left: auto;
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