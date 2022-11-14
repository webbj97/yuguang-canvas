<script setup lang="ts">
import { nextTick, ref } from 'vue'

defineProps<{ msg: string }>()


const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)

const array: Array<number> = []
const arr = ref(array)

console.log(count, typeof count, count.value);

function add() {
	console.log('渲染开始');
	count.value++;
	nextTick(() => {
		console.log('渲染结束');
	})
}

function handle() {
	arr.value.push(1)
	console.log(arr);
}


</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="add">count is {{ count }}</button>
	</div>
	<div>
		{{ state.name }}
	</div>
	<div>{{ state.age }}</div>
	<!-- <div v-for="item in obj" :key="item">{{item}}</div> -->
	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
		starter
	</p>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
