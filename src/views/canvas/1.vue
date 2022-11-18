<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter } from 'vue'

const object = { foo: ref(1) }
const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)
const { foo } = object
const config = {
	w: window.innerWidth / 2,
	h: window.innerHeight / 2
}

function init() {
	const canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
	const canvas = canvasRef;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		canvas.width = window.innerWidth / 2;
		canvas.height = window.innerHeight / 2;
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

		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
		ctx.fillRect(0, 0, config.w, config.h);
		ctx.strokeRect(25, 25, config.w - 50, config.h - 50)
		ctx.beginPath()

		ctx.moveTo(25, 25);
		ctx.lineTo(105, 25);
		ctx.lineTo(105, 105);

		ctx.moveTo(105, 105);
		ctx.lineTo(150, 150);
		ctx.lineTo(150, 195);

		ctx.fill();

		// requestAnimationFrame(animate);
	}
}

onMounted(() => {
	init();
	animate()
})

</script>

<template>
	<div class="page-canvas-1">
		<p>渲染上下文：ctx</p>
		<p>填充颜色：ctx.fillStyle</p>
		<p>绘制矩形：ctx.fillRect
			<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect">#</a>
		</p>
		<p>绘制路径起点：ctx.moveTo(x, y) 将笔触移动到指定的坐标</p>
		<p>绘制绘制直线：ctx.lineTo(x, y) 绘制一条从当前位置到指定 x 以及 y 位置的直线。</p>
		<canvas id="canvas"></canvas>
	</div>

</template>

<style scoped>
.page-canvas-1 {
	padding: 24px
		/* width: 600px;
	height: 300px;
	margin: 0 auto; */
}
</style>
