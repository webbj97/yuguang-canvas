<script setup lang="ts">
import { nextTick, ref, Ref } from 'vue';
import { useRouter } from 'vue-router'
import routes from '../../../router/routes';

const router = useRouter()
// defineProps<{ msg: string }>()

const routeList = ref(routes)
function handleTo(nav: { name: string }) {
    router.push({ name: nav.name })
}

</script>

<template>
    <div class="main-header">
        <div v-for="nav in routeList" :key="nav.name" class="nav-item">
            <span class="nav-item__label" @click="handleTo(nav)"> {{ nav.name }} </span>
            <div class="nav-item__list" v-if="nav.children?.length">
                <span v-for="child in nav.children" @click.native="handleTo(child)">{{ child.name }}</span>
            </div>
        </div>
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
    padding: 0 24px;
    box-shadow: 0 0 1px rgb(0 0 0 / 30%);
    transition: all 0.2s;

    .nav-item {
        position: relative;
        margin-right: 20px;

        .nav-item__list {
            display: none;
            top: 22px;
            left: 0;
            position: absolute;
            width: 200px;
            padding: 6px 12px;
            overflow: scroll;
            background: #fff;
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.1),
                0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all .3s;
        }

        &:hover {

            .nav-item__label {
                color: #535bf2;
                cursor: pointer;
            }

            .nav-item__list {
                display: flex;
                flex-direction: column;

                span {
                    &:hover {
                        color: #535bf2;
                        cursor: pointer;
                    }
                }
            }
        }

    }

}
</style>
