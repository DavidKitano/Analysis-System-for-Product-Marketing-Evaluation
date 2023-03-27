<template >
    <section class="el-header">
        <section class="headerLogo">
            <h2>Æ</h2>
            <h4>～Analysis System for Product Marketing Evaluation～</h4>
        </section>

        <el-button-group v-if="!isLogin">
            <el-button type="primary">
                <RouterLink to="/auth">
                    Login
                </RouterLink>
            </el-button>
            <el-button type="primary">
                <RouterLink to="/auth?mod=reg">
                    Register
                </RouterLink>
            </el-button>
        </el-button-group>

        <section v-if="isLogin" id="userBar">
            <h3>Welcome, {{ usernameSession }} </h3>
            <el-dropdown>
                <el-button type="primary">
                    Options<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Change Username</el-dropdown-item>
                        <el-dropdown-item>Change Password</el-dropdown-item>
                        <el-divider></el-divider>
                        <el-dropdown-item>Log Out</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </section>
    </section>
</template>

<script setup lang="ts">
// import { useMainStore } from '@/stores'
import { ref } from 'vue'

// const usernameStored = useMainStore().username;
const usernameSession = sessionStorage.getItem('username');
const isLogin = ref<Boolean>(false)
if (usernameSession) {
    isLogin.value = true;
}

</script>

<style scoped lang="scss">
@import '../assets/scss/header.module.scss';
</style>