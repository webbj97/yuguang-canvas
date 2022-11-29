<script setup lang="ts">
import { nextTick, ref, Ref, onMounted } from 'vue'


const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)
const object = { foo: ref(1) }
const arr = [
	{ action: '开始' },
	{ action: '进阶' },
]

</script>

<template>
	<div class="home-page">
		<div class="accent">Canvas</div>
		<p class="desc">Canvas API 提供了一个通过JavaScript 和 HTML的 <b>canvas</b>
			元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。</p>
		<section class="box-container">
			<div class="vt-box" v-for="item in arr">
				{{ item.action }}
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10%;
	padding-left: 48px;
	padding-right: 48px;

	.accent {
		margin-bottom: 12px;
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

			&:hover {
				cursor: pointer;
				background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
			}
		}
	}
}
</style>
