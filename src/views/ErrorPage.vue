<template>
    <el-empty :description="description">
        <RouterLink to="/home">&Lt; HOME</RouterLink>
    </el-empty>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const description = ref<String>("404 NOT FOUND")
</script>

<style lang='scss' scoped>
.el-empty {
    display: flex;
    width: 100vw;
    height: 100vh;
    margin-top: -5rem;
    justify-content: center;
    align-items: center;

    a {
        cursor: pointer;
        text-decoration: none;
        color: rgb(120, 120, 167);

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>