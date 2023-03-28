<script setup lang="ts">
// 在tsconfig.json里已经导入
// import generalHeader from '@/components/generalHeader.vue';
// import analyzerBox from '@/components/analyzerBox.vue';
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

  <el-backtop :bottom="100">
    <div class="backTop">
      <el-icon>
        <CaretTop />
      </el-icon>UP
    </div>
  </el-backtop>
</template>

