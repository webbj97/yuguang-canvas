<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, initCustomFormatter } from 'vue'

const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)
const object = { foo: ref(1) }
const { foo } = object

const config = {
	w: window.innerWidth / 2,
	h: window.innerHeight / 2
}
// const array: Array<number> = []
// const arr: Ref<number[]> = ref([])
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

		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect(0, 0, config.w, config.h);
		ctx.strokeRect(25, 25, config.w - 50, config.h - 50)
		ctx.beginPath()

		requestAnimationFrame(animate);
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
		<p></p>

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
