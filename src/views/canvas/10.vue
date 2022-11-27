<script setup lang='ts'>
import { ref, Ref, onMounted, onUnmounted } from 'vue'

let rAF: number = 0;

class Point {
    x: number = 0;
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

// Canvas面板类
class Canvas {
    w = 0
    h = 0
    particles: Point[] = []
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
        console.log(111);
        document.addEventListener('onkeydown', (e) => {
            console.log(e);
        })
        this.initParticles()
    }
    initParticles() {
        for (let i = 0; i < 40; i++) {
            this.particles.push(new Point(this.w, this.h))
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
        // this.particles.forEach((particle) => particle.update(ctx))
        rAF = requestAnimationFrame(() => this.draw());
    }
}


onMounted(() => {
    const canvas = new Canvas();
    canvas.init();
})
onUnmounted(() => {
    cancelAnimationFrame(rAF)
})

</script>
<template>
    <div class="page-canvas-6">
        <canvas id="canvas" />
    </div>
</template>

<style lang='less'>

</style>