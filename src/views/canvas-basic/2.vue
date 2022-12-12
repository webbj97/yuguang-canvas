<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { object } from 'vue-types';

const position: { x: number, y: number } = { x: 0, y: 0 };

function init() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const wrapper = document.getElementById('container') as HTMLElement;
	const rect = wrapper.getBoundingClientRect();
	console.log(rect);
	Object.assign(position, {
		x: rect.width,
		y: rect.width,
	})
    base.max = rect.width;
	if (canvas) {
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		canvas.width = position.x;
		canvas.height = position.y;
	}
}

const options = [
    { label: '是', value: true },
    { label: '否', value: false },
];
const config = reactive({
	max: 300,
    min: 50,
})
const base = reactive({
	x: config.min, y: config.min, fill: false
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
        ctx.moveTo(0, 0);
        ctx.lineTo(base.x, base.y);
        ctx.lineTo(0, base.y);
        ctx.lineTo(base.x, 0);

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgb(${base.x % 255},${base.y % 255},0)`;
        ctx.stroke();
        if (base.fill) {
            ctx.fill();
        }
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
	<div class="page-canvas-2 page-canvas">
		<div class="page-canvas__left">
			<div class="wrapper">
                <h2>控制面板</h2>
                <div class="row">
                    <label>x：</label>
                    <a-slider id="test" :max="config.max" :min="config.min" v-model:value="base.x" />
                </div>
                <div class="row">
                    <label>y：</label>
                    <a-slider id="test" :max="config.max" :min="config.min" v-model:value="base.y" />
                </div>
                <div class="row">
                    <label>填充：</label>
                    <a-radio-group v-model:value="base.fill" :options="options" />
                </div>
            </div>
		</div>
		<div id="container">
			<canvas id="canvas"></canvas>
		</div>
	</div>
</template>

<style lang="less" scoped>
.page-canvas-2 {
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