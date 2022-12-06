<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue'

type Point = { x: number, y: number }
const OFFSET = 50;
let rAF: number;

const randomColor = (): string => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

// 粒子类
class Particle {
    #w = 0
    #h = 0
    r = randomIntBetween(10, 20)
    circle: Point = { x: 0, y: 0 }
    speed: Point = { x: 0, y: 0 }
    color: string = randomColor()
    dx = randomIntBetween(-2, 2) // x速度
    dy = 15 // 偏移量
    constructor(w: number, h: number) {
        this.#w = w
        this.#h = h
        this.circle = {
            x: randomIntBetween(0, this.#w),
            y: randomIntBetween(this.r, this.#h >> 1), // 上半区
        }
    }
    update(w: number, h: number) {
        const { circle, r } = this;

        // 边界碰撞反弹
        if (circle.x < r || circle.x > w - r) {
            this.dx *= -1;
        }

        if (circle.y >= h - r) {
            this.dx *= 0.95;
        }

        if (circle.y > h - r - this.dy) {
            this.dy *= -0.95;
        } else {
            this.dy += 1;
        }

        circle.x += this.dx;
        circle.y += this.dy;
    }
    draw(ctx: CanvasRenderingContext2D) {
        const { circle, r, } = this;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color
        ctx.fill();
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

        this.initParticles()
    }
    initParticles() {
        for (let i = 0; i < 50; i++) {
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
        ctx.clearRect(0, 0, this.w, this.h);
        this.particles.forEach((particle, i) => {
            particle.update(this.w, this.h); // 更新粒子
            particle.draw(ctx); // 绘制粒子
        })

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
