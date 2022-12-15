<script setup lang="ts">
import { nextTick, ref, Ref, computed } from 'vue';
import { useRouter } from "vue-router";
import routes from '../../../router/routes';

const router = useRouter();
const routeList = ref(routes);
let showNav = ref(false);

function handleTo(nav: { name: string }) {
    showNav.value = !showNav.value
    router.push({ name: nav.name });
}

const activeName = computed(() => {
    return router.currentRoute.value.name;
})

</script>

<template>
    <div class="main-header">
        <div v-for="nav in routeList" :key="nav.name" class="nav-item">
            <a-tooltip placement="bottomLeft" trigger="click" class="main-header-tooltip">
                <span class="nav-item__label" @click="handleTo(nav)"> {{ nav.name }} </span>
                <template #title v-if="nav.name !== '首页'">
                    <div class="nav-item__list" v-if="nav.children && nav.children.length">
                        <div v-for="child in nav.children" :class="['nav', { active: activeName === child.name }]"
                            @click.native="handleTo(child)">
                            {{ child.name }}
                        </div>
                    </div>
                </template>
            </a-tooltip>

        </div>
        <a href="https://github.com/webbj97/yuguang-vite" target="_blank">star⭐️</a>
    </div>
</template>

<style lang="less">
.main-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 91;
    width: 100%;
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 48px;
    box-shadow: 0 0 1px rgb(0 0 0 / 30%);
    background: #fff;
    transition: all 0.2s;

    .nav-item {
        position: relative;
        margin-right: 20px;
        &__label{
            cursor: pointer;
        }
        &:first-child {
            margin-right: auto;
        }
    }
}

.ant-tooltip-content {

    .ant-tooltip-arrow {
        display: none;
    }

    .ant-tooltip-inner {
        .nav {
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 450px) {
    .main-header {
        padding-left: 2rem;
        padding-right: 1rem;
    }
}
</style>
