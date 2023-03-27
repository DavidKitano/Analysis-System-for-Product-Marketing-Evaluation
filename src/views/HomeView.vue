<script setup lang="ts">
import generalHeader from '@/components/generalHeader.vue';
import analyzerBox from '@/components/analyzerBox.vue';
</script>

<template>
  <main>
    <header>
      <generalHeader></generalHeader>
    </header>
    <el-container>
      <el-main>
        <analyzerBox></analyzerBox>
      </el-main>
    </el-container>
  </main>
</template>
