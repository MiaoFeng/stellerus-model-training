<script setup lang="ts">
import Header from '@/components/headerComp.vue';
import ContentLayout from './contentLayout.vue';
</script>

<template>
    <div class="common-layout">
      <el-container class="common-container">
        <el-header class="common-header">
            <Header />
        </el-header>
        <el-main class="common-main">
            <ContentLayout />
        </el-main>
        <el-footer class="common-footer"></el-footer>
      </el-container>
    </div>
  </template>

<style scoped>
.common-layout {
    height: 100%;
}
.common-container {
    height: 100%;
}
.common-header {
    padding: 0px;
    background-image: none;
}

.common-main {
    height: calc(100% - 64px);
    padding: 0;
    box-sizing: border-box;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: hidden;
    /* padding: var(--el-main-padding); */
}

.common-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
  