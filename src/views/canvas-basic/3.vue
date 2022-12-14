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
		y: rect.height,
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

const options = [
    { label: '是', value: true },
    { label: '否', value: false },
];
const base2 = reactive({
	max: 300,
    min: 50,
})
const base = reactive({
	x: 300, y: 50, fill: false
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
	<div class="page-canvas-3 page-canvas">
		<div class="page-canvas__left">
			<div class="wrapper">
                <h2>控制面板</h2>
                <div class="row">
                    <label>x：</label>
                    <a-slider id="test" :max="base2.max" :min="base2.min" v-model:value="base.x" />
                </div>
                <div class="row">
                    <label>y：</label>
                    <a-slider id="test" :max="base2.max" :min="base2.min" v-model:value="base.y" />
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
.page-canvas-3 {
    position: relative;
    padding: 24px;
    height: 100%;
    .wrapper {
        padding: 20px;
        width: 100%;
        max-width: 300px;
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
    
    #container {
        width: 100%;
        height: 100%;
    }
    #canvas{
        margin-top: 20px;
    }
}
</style>