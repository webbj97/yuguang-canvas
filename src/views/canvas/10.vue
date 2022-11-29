<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue'

let rAF: number = 0;
type Point = { x: number, y: number }
function randomIntBetween(min: number, max: number) {
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

// Canvas面板类
class Canvas {
    w = 0
    h = 0
    dx = 0
    dy = 1
    isPlaying = false;
    food?: Point | null
    body: Point[] = []
    canvasEle?: HTMLCanvasElement
    containerEle?: Element
    DOT_COUNT = 30; // 每行30个点
    DOT_SIZE: number
    speed = 1000
    constructor() {
        // dom
        this.containerEle = document.querySelector('.page-canvas-10') as Element
        this.canvasEle = document.getElementById('canvas') as HTMLCanvasElement;
        // number
        this.w = this.canvasEle.width = this.containerEle.clientWidth / 2
        this.h = this.canvasEle.height = this.containerEle.clientWidth / 2
        this.DOT_SIZE = this.w / this.DOT_COUNT;
        // event
        window.addEventListener('keyup', ({ code }) => {
            // 游戏前
            if (!this.isPlaying && code === 'Space') {
                this.init();
                return;
            }

            // 游戏中
            const isSingleBody = this.body.length === 1;
            const isTurnX = code === 'ArrowLeft' || code === 'ArrowRight';
            const isTurnY = code === 'ArrowUp' || code === 'ArrowDown';
            const isOpposite = (this.dx !== 0 && isTurnX) || (this.dy !== 0 && isTurnY);

            if (!isSingleBody && isOpposite) {
                return;
            }

            // 改变方向
            if (isTurnX) {
                this.dy = 0;
            }
            if (isTurnY) {
                this.dx = 0;
            }
            switch (code) {
                case 'ArrowUp':
                    this.dy = -1;
                    return;
                case 'ArrowDown':
                    this.dy = 1;
                    return;
                case 'ArrowLeft':
                    this.dx = -1;
                    return;
                case 'ArrowRight':
                    this.dx = 1;
                    return;
            }
        });
    }
    welcome() {
        if (!this.canvasEle) {
            return;
        }
        const ctx = this.canvasEle.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.font = '5vmin sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText('按 Space 键开始', this.w / 2, this.h / 2);
    }
    // 初始化贪吃蛇
    init() {
        this.body = [];
        this.body.push(this.generateDot());
        this.food = this.generateDot();

        this.walk();
    }

    draw({ x, y }: Point, color: string) {
        const { DOT_SIZE } = this;
        if (!this.canvasEle) {
            return;
        }
        const ctx = this.canvasEle.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.fillStyle = color;
        ctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
    }

    eatFood({ x, y }: Point) {
        if (this.food) {
            return x === this.food.x && y === this.food.y;
        }
        return false
    }

    checkDeath({ x, y }: Point) {
        const max = this.DOT_COUNT - 1;
        return (x < 0 || x > max || y < 0 || y > max);
    }

    walk() {
        if (!this.canvasEle) {
            return;
        }
        const ctx = this.canvasEle.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, this.w, this.h);

        const nextPosition = this.getNextPosition();

        // 游戏是否失败
        if (this.checkDeath(nextPosition)) {
            this.body = [];
            this.food = null;
            ctx.font = '5vmin sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'red';
            ctx.fillText('你死了哈哈哈哈', this.w / 2, this.h / 2);
            this.isPlaying = false;
            return;
        }

        // 前进一步
        this.body.pop();
        this.body.unshift(nextPosition);

        // 是否取得食物
        if (this.eatFood(nextPosition) && this.food) {
            this.body.unshift({
                x: this.food.x + this.dx,
                y: this.food.y + this.dy,
            });
            this.food = this.generateDot();
        }

        // 绘制下一帧
        this.body.forEach(item => this.draw(item, 'black'));
        this.food && this.draw(this.food, 'red');
        // 控制速度？

        setTimeout(() => this.walk(), this.speed * 0.5);
    }

    getNextPosition() {
        const head = this.body[0];
        const next = {
            x: head.x + this.dx,
            y: head.y + this.dy,
        }
        console.log('next', next);
        return next
    }

    generateDot(): Point {
        const x = randomIntBetween(0, 19); // 新点
        const y = randomIntBetween(0, 19);
        const _body = this.food ? this.body.concat(this.food) : this.body;
        const isUsed = _body.some(item => item.x === x && item.y === y);
        // 递归返回一个没有被使用的点
        if (isUsed) {
            return this.generateDot();
        }
        return { x, y };
    }
}


onMounted(() => {
    const canvas = new Canvas();
    canvas.welcome();
})
onUnmounted(() => {
    cancelAnimationFrame(rAF)
})

</script>
<template>
    <div class="page-canvas-10">
        <canvas id="canvas" />
    </div>
</template>

<style lang='less'>
.page-canvas-10 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;

    #canvas {
        border: 1px solid #999;
    }
}
</style>