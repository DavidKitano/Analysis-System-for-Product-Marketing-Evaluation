<style scoped lang="scss">
@import '../assets/scss/analyzer.module.scss';
</style>
<template>
    <span class="defaultText" id="indent">&nbsp;&nbsp;&nbsp;&nbsp;</span>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import * as validation from '@/utils/formValidate';
import * as auth from '@/api/auth';
import * as opt from '@/utils/optimize';

/*
    生命周期函数分隔
*/
// 挂载
onMounted(() => {
    const indent = document.getElementById('indent');
    const tempSpan = document.createElement('span');
    tempSpan.classList.add('positionText');
    tempSpan.innerText = 'aa';
    console.log('indent', indent)
    console.log(tempSpan)
    indent?.append(tempSpan);
    indent?.insertAdjacentElement('afterend', tempSpan);
})
</script>