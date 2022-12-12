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

const max = 300;
const min = 0;
const base = reactive({
	x: min, y: min, width: 100, height: 100
})

function start() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		ctx.clearRect(0, 0, config.x, config.y)
		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
		ctx.fillRect(base.x, base.y, base.width, base.height);
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
	<div class="page-canvas-1 page-canvas">
		<div class="page-canvas__left">
			<div class="wrapper">
				<h4>fillRect（{{ base.x }}, {{ base.y }}, {{ base.width }}, {{ base.height }}）</h4>
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
		<div id="container">
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
			width: 55px
		}
	}
}

.page-canvas {
	&__left {
		width: 30%;
		min-width: 300px;
	}
	#container {
		margin-top: 20px;
		width: 100%;
	}
}
</style>