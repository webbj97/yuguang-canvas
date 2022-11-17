<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from './views/components/header/index.vue'
</script>

<template>
	<Header />
	<div class="app-main-container">
		<router-view />
	</div>
</template>

<style lang="less">
#app {
	padding-top: 56px;
	height: 100vh;
	width: 100%;
	.app-main-container{
		height: 100%;
		overflow-y: auto;
	}
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
