<script setup>
    import { defineProps } from 'vue';
    import { ElTable, ElTableColumn } from 'element-plus';

    const props = defineProps({
        data: Array
    });
    console.log(props.data);
</script>

<template>
    <el-table :data="data" style="width: 100%">
        <el-table-column prop="sample" label="Sample" width="60">
            <template #default="scope">
                <div class="color-box" :style="{ backgroundColor: scope.row.color }"></div>
            </template>
        </el-table-column>
        <el-table-column prop="level" label="Level" width="80">
        <template #default="scope">
            <div :style="{ color: scope.row.color }">
                {{ scope.row.name }}
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="area" label="Area" width="100">
        <template #default="scope">
            <div :style="{ color: scope.row.color }">
                {{  scope.row.area }}
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="percentage" label="Percentage" width="120">
        <template #default="scope">
            <div :style="{ color: scope.row.color }">
                {{ scope.row.percentage }}
            </div>
        </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
.color-box {
    width: 40px;
    height: 16px;
}
</style>