<script setup lang="ts">
import { onMounted } from 'vue'

const config = {
	w: window.innerWidth / 2,
	h: window.innerHeight / 2
}

function init() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		canvas.width = config.w;
		canvas.height = config.h;
	}
}

function animate() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}

		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
		ctx.fillRect(0, 0, config.w, config.h);
		ctx.strokeRect(25, 25, config.w - 50, config.h - 50)
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
		<p>绘制矩形：ctx.fillRect</p>
		<p>绘制矩形：ctx.strokeRect</p>
		<canvas id="canvas"></canvas>
	</div>

</template>

<style scoped>
.page-canvas-1 {
	padding: 24px
}
</style>