<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue'

type Point = { x: number, y: number }
const OFFSET = 50;
const pointer = { x: 0, y: 0 };
let rAF: number;

const randomColor = (): string => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

// 粒子类
class Particle {
    #w = 0
    #h = 0
    x = 0
    y = 0
    color: string = randomColor()
    lastPointer: Point
    radius = Math.random() * 3 + 1
    radians = Math.random() * (Math.PI * 2)
    distanceFromCenter = randomIntBetween(50, 120);
    velocity = 0.05
    constructor(w: number, h: number) {
        this.#w = w
        this.#h = h
        this.x = w / 2
        this.y = h / 2
        this.lastPointer = { x: this.x, y: this.y }
    }
    update(ctx: CanvasRenderingContext2D) {
        // 缓存上一次的位置形成轨迹
        const lastPos = { x: this.x, y: this.y };
        this.lastPointer.x += (pointer.x - this.lastPointer.x) * 0.05;
        this.lastPointer.y += (pointer.y - this.lastPointer.y) * 0.05;
        // 计算切角
        this.radians += this.velocity;
        this.x = this.lastPointer.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastPointer.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(ctx, lastPos);
    }

    draw(ctx: CanvasRenderingContext2D, lastPos: Point) {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = this.radius;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}
// Canvas面板类
class Canvas {
    w = 0
    h = 0
    particles: Particle[] = []
    canvasEle?: HTMLCanvasElement
    containerEle?: Element
    constructor() { }
    init() {
        // dom
        this.containerEle = document.querySelector('.page-canvas-6') as Element
        this.canvasEle = document.getElementById('canvas') as HTMLCanvasElement;
        // number
        this.w = this.canvasEle.width = this.containerEle.clientWidth
        this.h = this.canvasEle.height = this.containerEle.clientHeight
        // event
        pointer.x = this.w / 2
        pointer.y = this.h / 2
        this.canvasEle.addEventListener('mousemove', (e) => {
            pointer.x = e.offsetX
            pointer.y = e.offsetY;
        })
        this.initParticles()
    }
    initParticles() {
        for (let i = 0; i < 40; i++) {
            this.particles.push(new Particle(this.w, this.h))
        }
    }
    draw() {
        if (!this.canvasEle) {
            return;
        }
        const ctx = this.canvasEle.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, this.w, this.h);
        this.particles.forEach((particle) => particle.update(ctx))
        rAF = requestAnimationFrame(() => this.draw());
    }
}

function randomIntBetween(min: number, max: number) {
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

function init() {
    const canvas = new Canvas()
    canvas.init();
    canvas.draw();
}


onMounted(() => {
    init();
})
onUnmounted(() => {
    cancelAnimationFrame(rAF)
})

</script>

<template>
    <div class="page-canvas-6">
        <p>随机生成若干速率的小球</p>
        <p>合理压缩小球反弹空间</p>
        <p>反弹后衰减小球速率</p>
        <p>边界碰撞</p>
        <canvas id="canvas"></canvas>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-6 {
    position: relative;
    min-height: 100%;
    padding: 24px;

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
