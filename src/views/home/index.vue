<script setup lang="ts">
import { nextTick, ref, Ref, onMounted, onUnmounted } from 'vue';
import CanvasBg from './bg';


const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)
const object = { foo: ref(1) }
const arr = [
	{ action: 'Canvas画笔' },
	{ action: '基础API' },
	{ action: '衍生动效' },
]

interface funcType {
	<T>(arg: T): T;
}

let canvas: any;

onMounted(() => {
	canvas = new CanvasBg('.home-page');
	canvas.init();
	canvas.draw();
})
onUnmounted(() => {
	canvas.cancel();
})

</script>

<template>
	<div class="home-page">
		<div class="accent">Canvas</div>
		<p class="desc">Canvas API 提供了一个通过JavaScript 和 HTML的 <b>canvas</b>
			元素来绘制图形的方式。</p>
		<p class="desc">它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。</p>
		<section class="box-container">
			<div class="vt-box" v-for="item in arr" :key="item.action">
				{{ item.action }}
			</div>
		</section>

		<canvas id="canvas"></canvas>
	</div>
</template>

<style lang="less" scoped>
.home-page {
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10%;
	padding-left: 48px;
	padding-right: 48px;

	.accent {
		margin-bottom: 24px;
		font-size: 48px;
		line-height: 1;
		font-weight: bold;
		color: transparent;
		background: linear-gradient(315deg, #42d392 25%, #647eff);
		-webkit-background-clip: text;
	}

	.desc {
		max-width: 960px;
	}

	.box-container {
		display: flex;
		flex-wrap: wrap;
		max-width: 960px;
		margin: 0 auto;
		gap: 30px;
		color: rgba(60, 60, 60, .7);

		&>div {
			padding: 18px 36px;
			border-radius: 8px;
			font-size: 20px;
			font-size: 14px;
			font-weight: 500;
		}
	}

	#canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
