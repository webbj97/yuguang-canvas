<script setup lang="ts">
import { nextTick, ref, Ref } from 'vue'

// defineProps<{ msg: string }>()

const state = ref({ name: 'yuguang', age: 25 })
const count = ref(0)


</script>

<template>
	<div>demo</div>
</template>

<style lang="less">
.read-the-docs {
	color: #888;
}
</style>
