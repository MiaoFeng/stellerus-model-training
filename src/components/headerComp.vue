<script setup lang="ts">
import { ElMenu, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus';
import { User, Plus } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue';
import { get, post } from '@/apis/index.js';
import { useHeaderStore } from '../store/headerStore';

const activeIndex = ref('2');
const activeProject = ref(null);
const projectOptions = ref([]);
const headerStore = useHeaderStore();

//获取项目列表
const getProjects = async () => {
    const res = await get('https://virtserver.swaggerhub.com/MIAOFENG/project/1.0.0/getList');
    return res;
}

//创建项目
const handleCreateProjet = async(formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const res = createProject();
            if(res) dialogVisible.value = false;
        } else {
            console.log('error submit!', fields)
            return false
        }
    })
}

const createProject = async () => {
    const res = await post('/api/project/create', form);
    console.log(res);
    return res;
}

onMounted(async() => {
    const res = await getProjects();
    projectOptions.value = res;
    activeProject.value = res[0].id;
    headerStore.setProject(res[0].id);
})

const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}

//弹框
const dialogVisible = ref(false);
const ruleFormRef = ref();
const form = reactive({
    name: '',
    desc: '',
})

const rules = reactive({
    name: [
        { required: true, message: 'Please input project name', trigger: 'blur' },
        { min: 4, max: 30, message: 'Length should be 4 to 30', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: 'Please input project description', trigger: 'blur' },
    ]
});

</script>

<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        style="background: linear-gradient(to bottom right, rgb(73,81,166), rgb(11,31,56));border-bottom: none;"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item class="logo" index="0" disabled>
            <!-- <img
                style="width: 90px"
                src="../assets/image/stellerus.jpg"
                alt="Stellerus-Tech"
            /> -->
            <span style="font-size: 20px; color: white;">Stellerus</span>
            <!-- <span>Accurate ClimaTech Lead</span> -->
        </el-menu-item>   
        <el-menu-item index="1" class="slogan">Project:  
            <el-select
                v-model="activeProject"
                placeholder="Select"
                size="small"
                style="min-width: 120px; margin-left: 16px;"
            >
                <el-option
                    v-for="item in projectOptions"
                    :key="item.id"
                    :label="item.Name"
                    :value="item.id"
                />
            </el-select>
        </el-menu-item>
        <el-menu-item index="1" class="slogan">
            <el-button type="primary" :icon="Plus" size="small" @click="dialogVisible = true">
                New Project
            </el-button>
        </el-menu-item>
        <el-menu-item index="3" class="slogan"><el-button :icon="User" circle /></el-menu-item>
        
        <!-- new project弹框 -->
        <el-dialog
            v-model="dialogVisible"
            title="New Project"
            width="400"
        >
            <el-form
                ref="ruleFormRef"
                :model="form"
                :rules="rules"
                label-width="120px"
            >
                <el-form-item label="Project Name:">
                    <el-input v-model="form.name" type="text" />
                </el-form-item>
                <el-form-item label="Description:">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleCreateProjet">
                    Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-menu>
</template>

<style lang="scss" scoped>
.main-container {
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu--horizontal > .el-menu-item.logo {
  color: black;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  color: lightgray;
  background: transparent;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background: transparent;
}
.el-menu-item.logo.is-disabled{
    opacity: 1;
}
.el-menu-item.slogan.is-disabled{
    opacity: 1;
}

</style>
