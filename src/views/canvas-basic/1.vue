<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'

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

const max = 300;
const min = 0;
const base = reactive({
	x: min, y: min, width: 100, height: 100
})

function animate() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.clearRect(0, 0, config.w, config.h)
		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
		ctx.fillRect(base.x, base.y, base.width, base.height);
		ctx.strokeRect(base.x, base.y, base.width, base.height)
	}
}

onMounted(() => {
	init();
	animate()
})

watch(
	() => base,
	(count, prevCount) => {
		console.log("变动");
		animate();
	},
	{ deep: true }
)

</script>

<template>
	<div class="page-canvas-1 page-canvas">
		<div class="page-canvas__left">
			<p>渲染上下文：ctx</p>
			<p>填充颜色：ctx.fillStyle</p>
			<p>绘制矩形：ctx.fillRect（{{ base.x }}, {{ base.y }}, {{ base.width }}, {{ base.height }}）</p>
			<p>绘制矩形：ctx.strokeRect（x, y, width, height）</p>

			<div class="wrapper">
				<h2>控制面板（fillRect / strokeRect）</h2>
				<div class="row">
					<label>x：</label>
					<a-slider id="test" :max="max" :min="min" v-model:value="base.x" />
				</div>
				<div class="row">
					<label>y：</label>
					<a-slider id="test" :max="max" :min="min" v-model:value="base.y" />
				</div>
				<div class="row">
					<label>width：</label>
					<a-slider id="test" :max="max" :min="min" v-model:value="base.width" />
				</div>
				<div class="row">
					<label>height：</label>
					<a-slider id="test" :max="max" :min="min" v-model:value="base.height" />
				</div>
			</div>
		</div>
		<div class="page-canvas__right">
			<canvas id="canvas"></canvas>
		</div>
	</div>
</template>

<style lang="less" scoped>

// @media (width: light) {
//     :root {
//         color: #213547;
//         background-color: #ffffff;
//     }
//     a:hover {
//         color: #747bff;
//     }
//     button {
//         background-color: #f9f9f9;
//     }
// }
.page-canvas-1 {
	position: relative;
	padding: 24px;

	.wrapper {
		padding: 20px;
		width: 100%;
		background: #a6afba;
		border-radius: 16px;

		.row {
			display: flex;
			align-items: center;
		}

		.ant-slider {
			width: 300px;
		}

		label {
			width: 55px
		}
	}
}

.page-canvas {
	display: flex;
	flex-wrap: wrap;

	&__left {
		width: 30%;
	}

	&__right {
		margin-left: auto;
	}
}
</style>