<template>
    <div class="box">
        <div class="sideBar" :class="showBox ? '' : 'controller-box-hide'">
        <div class="showBnt" @click="onclick">
            <el-icon v-show="showBox"><DArrowLeft /></el-icon>
            <el-icon v-show="!showBox"><DArrowRight /></el-icon>
        </div>
        <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    const showBox = ref(true)
    const onclick = defineEmits(['onclick'])
</script>

<style lang="scss" scoped>
.box {
    height: 100%;
    position: relative;
    background: wheat;
    z-index: 100;
}
.sideBar {
  width: 368px;
  height: 100%;
//   background-color: rgba(7, 20, 35, 0.7);
  position: absolute;
  top: 0px;
  left: 0px;
  transition: right 0.5s;
  background:white;
}
.showBnt {
  position: absolute;
  top: 16px;
  left: 368px;
  width: 20px;
  height: 82px;
  z-index: 99;
  font-size: 20px;
  color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.controller-box-hide {
  right: -368px !important;
  transition: right 0.5s;
}
</style>