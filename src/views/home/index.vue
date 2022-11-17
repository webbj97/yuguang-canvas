<script setup lang="ts">
import { nextTick, ref, Ref, onMounted } from 'vue'



defineProps<{ msg: string }>()


const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)
const object = { foo: ref(1) }
const { foo } = object
console.log('foo', foo, 'foo');



// const array: Array<number> = []
const arr: Ref<number[]> = ref([])

console.log(count, typeof count, count.value);

function add() {
	console.log('渲染开始');
	count.value++;
	nextTick(() => {
		console.log('渲染结束');
		if (count.value > 5) {
			count.value = 0
			arr.value = []
		}
		handle()
	})
}

function handle() {
	arr.value.push(1)
	console.log(arr);
}

function initCanvas() {
	const canvas = <HTMLCanvasElement>document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	if (ctx) {
		ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
	}
}

onMounted(() => {
	initCanvas()
})

</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="add">count is {{ count }}</button>
	</div>
	<canvas id="canvas"></canvas>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
