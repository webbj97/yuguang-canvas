<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { object } from 'vue-types';

const config: { x: number, y: number } = { x: 0, y: 0 };

function init() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const wrapper = document.getElementById('container') as HTMLElement;
	const rect = wrapper.getBoundingClientRect();
	console.log(rect);
	Object.assign(config, {
		x: rect.width,
		y: rect.width,
	})
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		canvas.width = config.x;
		canvas.height = config.y;
	}
}

const base = reactive({
	x: 150, y: 150, width: 100, height: 100, shadowBlur: 10
})

function start() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.clearRect(0, 0, config.x, config.y);
		ctx.beginPath();
		ctx.shadowColor = '#d53'; // 阴影颜色
		ctx.shadowBlur = base.shadowBlur; // 模糊效果程度的
		ctx.lineWidth = 5; // 线段宽度
		ctx.strokeStyle = '#38f'; // 线段颜色
		ctx.strokeRect(10, 10, base.x, base.y);
	}
}

onMounted(() => {
	init();
	start()
})

watch(
	() => base,
	(count, prevCount) => {
		console.log("变动");
		start();
	},
	{ deep: true }
)

</script>

<template>
	<div class="page-canvas-4 page-canvas">
		<div class="page-canvas__left">
			<div class="wrapper">
				<h3>shadowBlur = {{ base.shadowBlur }}</h3>
				<div class="row">
					<label>模糊：</label>
					<a-slider id="test" :max="20" :min="5" v-model:value="base.shadowBlur" />
				</div>
				<h3>strokeRect(10, 10, {{ base.x }}, {{ base.y }})</h3>
				<div class="row">
					<label>width：</label>
					<a-slider id="test" :max="300" :min="100" v-model:value="base.x" />
				</div>
				<div class="row">
					<label>height：</label>
					<a-slider id="test" :max="300" :min="100" v-model:value="base.y" />
				</div>
			</div>
		</div>
		<div id="container">
			<canvas id="canvas"></canvas>
		</div>
	</div>
</template>

<style lang="less" scoped>
.page-canvas-4 {
	position: relative;
	padding: 24px;
	height: 100%;

	.wrapper {
		padding: 20px;
		width: 100%;
		max-width: 320px;
		background: #ECEFFF;
		border-radius: 16px;

		.row {
			display: flex;
			align-items: center;
		}

		.ant-slider {
			width: 300px;
		}

		label {
			width: 55px;
			flex-shrink: 0;
		}
	}

	#container {
		width: 100%;
		height: 100%;
	}

	#canvas {
		margin-top: 20px;
	}
}
</style>