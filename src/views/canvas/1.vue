<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue'

const w = window.innerWidth / 2
const h = window.innerHeight / 2
const config = {
	x: w / 2,
	y: h / 2
}
let rAF: number

function init() {
	const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
	const canvas = canvasRef;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		canvas.width = w;
		canvas.height = h;
	}
}

function animate() {
	const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
	const canvas = canvasRef;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.clearRect(0, 0, w, h);
		ctx.beginPath();
		if (config.x > w) {
			config.x = 50
		} else {
			config.x++
		}
		if (config.y > h) {
			config.y = 50
		} else {
			config.y++
		}
		ctx.arc(config.x, config.y, 50, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();

		rAF = requestAnimationFrame(animate);
	}
}

onMounted(() => {
	init();
	animate()
})

onUnmounted(() => {
	cancelAnimationFrame(rAF)
})

</script>

<template>
	<div class="page-canvas-2">
		<p>渲染上下文：ctx</p>
		<p>填充颜色：ctx.fillStyle</p>
		<p>创建弧线和曲线：ctx.arc
			<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect">#</a>
		</p>
		<p></p>

		<canvas id="canvas"></canvas>
	</div>

</template>

<style scoped>
.page-canvas-2 {
	padding: 24px
		/* width: 600px;
	height: 300px;
	margin: 0 auto; */
}
</style>
