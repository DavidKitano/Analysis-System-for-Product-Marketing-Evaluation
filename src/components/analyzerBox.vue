<template>
    <el-card class="boxCard">
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as analyzer from '@/api/analyzer';

const history = reactive({

});
</script>

<style scoped lang="scss">
@import '../assets/scss/analyzer.module.scss';
</style>