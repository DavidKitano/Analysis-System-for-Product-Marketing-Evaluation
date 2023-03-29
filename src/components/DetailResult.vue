<style scoped lang="scss">
@import '../assets/scss/analyzer.module.scss';
@import '../assets/scss/sentimental_category.scss';
</style>
<template>
    <span class="defaultText" id="indent">&nbsp;&nbsp;&nbsp;&nbsp;</span>
</template>
<script setup lang="ts">
import { numberReg } from '@/utils/formValidate';
import { onMounted, type PropType } from 'vue';
import type * as opt from '@/utils/upload'

const props = defineProps({
    data: {
        type: Array as unknown as PropType<[opt.DetailResGroup]>,
    }
})
/*
    生命周期函数分隔
*/
// 挂载
onMounted(() => {
    // console.log('传参', props.data[1][0])
    if (!props.data?.length) {
        return;
    }
    for (let i = 0; i < props.data?.length; i++) {
        const indent = document.getElementById('indent');
        const tempSpan = document.createElement('span');
        tempSpan.classList.add(props.data[i][0] + 'Text');
        tempSpan.innerText = props.data[i][1];
        console.log('indent', indent)
        console.log(tempSpan)
        indent?.append(tempSpan);
        indent?.insertAdjacentElement('afterend', tempSpan);
    }
})
</script>