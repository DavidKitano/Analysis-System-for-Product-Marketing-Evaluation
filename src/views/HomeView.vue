<script setup lang="ts">
import generalHeader from '@/components/generalHeader.vue'
</script>

<template>
  <main>
    <header>
      <generalHeader></generalHeader>
    </header>
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </el-main>
    </el-container>
  </main>
</template>
