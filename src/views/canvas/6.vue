<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter } from 'vue'

type Point = { x: number, y: number }

const pointer = { x: 0, y: 0 };
const OFFSET = 50;

// 粒子类
class Particle {
    #w = 0
    #h = 0
    circle: Point = { x: 0, y: 0 }
    speed: Point = { x: 0, y: 0 }
    r = 0.8
    constructor(w: number, h: number) {
        this.#w = w
        this.#h = h
        this.circle = {
            x: randomIntBetween(0, this.#w),
            y: randomIntBetween(0, this.#h),
        }
        this.speed = { // 方向+速度
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
        }
    }
    // 使用init 还是 放在初始化里
    // init() {
    //     this.circle = {
    //         x: randomIntBetween(0, this.#w),
    //         y: randomIntBetween(0, this.#h),
    //     }
    //     this.speed = { // 方向+速度
    //         x: Math.random() - 0.5,
    //         y: Math.random() - 0.5,
    //     }
    // }
}
// Canvas面板类
class Canvas {
    w = 0
    h = 0
    selector = '';
    particles: Particle[] = []
    canvasEle: HTMLCanvasElement
    containerEle: Element
    constructor(selector: string) {
        // 初始化节点+数据
        this.selector = selector
        this.containerEle = document.querySelector(this.selector) as Element
        this.canvasEle = document.getElementById('canvas') as HTMLCanvasElement;
        const { clientWidth, clientHeight } = this.containerEle
        this.w = this.canvasEle.width = clientWidth
        this.h = this.canvasEle.height = clientHeight
        this.init()
    }
    init() {
        // 这段放在什么位置合理？
        this.canvasEle.addEventListener('mousemove', (e) => {
            pointer.x = e.offsetX
            pointer.y = e.offsetY;
        })
        this.initParticles()
    }
    initParticles() {
        for (let i = 0; i < 500; i++) {
            this.particles.push(new Particle(this.w, this.h))
        }
    }
    draw() {
        if (this.canvasEle) {
            const ctx = this.canvasEle.getContext('2d');
            if (!ctx) {
                return;
            }
            ctx.clearRect(0, 0, this.w, this.h);
            this.particles.forEach((particle, i) => {
                const { speed, circle, r } = particle
                const distance = getBetween(circle, pointer)
                if (distance <= OFFSET && pointer.x < (this.w - r) && pointer.y < (this.h - r) && pointer.x > r && pointer.y > r) {
                    if (circle.x !== pointer.x) {
                        circle.x = lerp(circle.x, pointer.x)
                    }
                    if (circle.y !== pointer.y) {
                        circle.y = lerp(circle.y, pointer.y)
                    }
                } else {
                    circle.x += speed.x;
                    circle.y += speed.y;

                    // 边界碰撞反弹
                    if (circle.x > (this.w - r) || circle.x < r) {
                        speed.x *= -1;
                    }
                    if (circle.y > (this.h - r) || circle.y < r) {
                        speed.y *= -1;
                    }
                }

                ctx.beginPath();
                ctx.arc(circle.x, circle.y, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                this.particles.slice(i + 1).forEach((particle2) => {
                    // 这里需不需要将连线的能力封装到粒子内
                    // 如 particle.lineTo(particle2)
                    const distance = getBetween(circle, particle.circle) // 统计粒子的距离
                    if (distance <= OFFSET) {
                        ctx.beginPath();
                        ctx.moveTo(circle.x, circle.y);
                        ctx.lineTo(particle.circle.x, particle.circle.y);
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(0, 0, 0, ${(OFFSET - distance) / OFFSET})`; // 利用距离动态线条颜色
                        ctx.stroke()
                    }
                })
            })
            requestAnimationFrame(this.draw.bind(this));
        }
    }
}

function randomIntBetween(min: number, max: number) {
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

function getBetween(a: Point, b: Point) {
    const distanceX = Math.abs(a.x - b.x);
    const distanceY = Math.abs(a.y - b.y);
    return Math.sqrt(distanceX ** 2 + distanceY ** 2);
}

function lerp(start: number, end: number) {
    return start + ((end - start) * 0.1); // 0.1 = 过渡速率
}

function init() {
    const canvas = new Canvas('.page-canvas-3')
    canvas.draw();
}


onMounted(() => {
    init();
})
</script>

<template>
    <div class="page-canvas-3">
        <p>随机生成若干速率的小球</p>
        <p>判断偏移量在合理范围，控制小球</p>
        <p>上下左右边界检测</p>
        <p>鼠标吸附效果</p>
        <canvas id="canvas"></canvas>
    </div>
</template>

<style lang="less" scoped>
.page-canvas-3 {
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
