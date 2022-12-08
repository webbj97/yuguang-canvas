<script setup lang="ts">
import Header from './views/components/header/index.vue';
</script>

<template>
	<Header />
	<div class="app-main-container">
		<Transition name="fade" mode="out-in">
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
		</Transition>
	</div>
</template>

<style lang="less">
#app {
	padding-top: 56px;
	height: 100vh;
	width: 100%;

	.app-main-container {
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
