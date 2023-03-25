<template>
    <el-container>
        <el-main>
            <el-form :label-position="labelPosition" :label-width="labelWidth" :model="loginForm" :style="formInlineStyle"
                ref="loginFormRef" :rules="loginRules" :size="formSize">
                <el-form-item label="邮箱" prop="loginEmail">
                    <el-input name="loginEmail" v-model="loginForm.loginEmail" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="密码" prop="loginPassword">
                    <el-input name="loginPassword" v-model="loginForm.loginPassword" placeholder="请输入密码"
                        :maxlength="maxLengthPassword" :minlength="minLengthPassword" :show-password="showPassword" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginSubmit(loginFormRef)">登录</el-button>
                    <el-text id="forgotPassBtn" size="small" type="primary" @click="forgetVisible = true">忘记密码？</el-text>
                </el-form-item>
            </el-form>
        </el-main>
        <el-aside>没有账号？去注册</el-aside>
    </el-container>
    <el-container>
        <el-aside>已有账号？去登录</el-aside>
        <el-main>
            <el-form :label-position="labelPosition" :label-width="labelWidth" :model="regForm" :style="formInlineStyle"
                ref="regFormRef" :rules="regRules" :size="formSize" :status-icon="statusIcon">
                <el-form-item label="邮箱" prop="regEmail">
                    <el-input name="regEmail" v-model="regForm.regEmail" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="验证码" prop="regCapture">
                    <el-input name="regCapture" v-model="regForm.regCapture" placeholder="请输入验证码" :maxlength="lengthCapture"
                        :minlength="lengthCapture" />
                </el-form-item>
                <el-form-item label="用户名" prop="regUsername">
                    <el-input name="regUsername" v-model="regForm.regUsername" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="regPassword">
                    <el-input name="regPassword" v-model="regForm.regPassword" placeholder="请输入密码"
                        :maxlength="maxLengthPassword" :minlength="minLengthPassword" :show-password="showPassword" />
                </el-form-item>
                <el-form-item label="重复密码" prop="regCheckPassword">
                    <el-input name="regCheckPassword" v-model="regForm.regCheckPassword" placeholder="请再次输入密码"
                        :maxlength="maxLengthPassword" :minlength="minLengthPassword" :show-password="showPassword" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="regSubmit(regFormRef)">注册</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>

    <!-- 忘记密码 -->
    <el-dialog v-model="forgetVisible" title="更改密码" width="30%" :lock-scroll="lockScroll"
        :close-on-click-modal="closeOnClickModal" :destroy-on-close="DestroyOnClose" :show-close="showClose">
        <span>更改密码</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="forgetVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="forgetVisible = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import * as validation from '@/utils/formValidate';
import * as auth from '@/api/auth';

/** Element Plus 标签吸附位置 */
const labelPosition = ref<String>('right');
/** Element Plus 标签长度 */
const labelWidth = ref<String>('100px');
/** Element Plus 表格尺寸 */
const formSize = ref<String>('default');
/** 表格内联样式 */
const formInlineStyle = ref<String>('max-width: 460px');
/** 密码可输入最大长度 */
const maxLengthPassword = ref<Number>(25);
/** 密码可输入最小长度 */
const minLengthPassword = ref<Number>(6);
/** 验证码可输入长度 */
const lengthCapture = ref<Number>(4);
/** Element Plus 展示密码切换钮 */
const showPassword = ref<Boolean>(true);
/** Element Plus 验证状态标志 */
const statusIcon = ref<Boolean>(true);
/** Element Plus 忘记密码模态框可见状态 */
const forgetVisible = ref<Boolean>(false);
/** Element Plus 忘记密码模态框激活期间允许页面滚动 */
const lockScroll = ref<Boolean>(true);
/** Element Plus 忘记密码模态框是否可以通过点击模态区的方式关闭 */
const closeOnClickModal = ref<Boolean>(false);
/** Element Plus 在忘记密码模态框关闭之后销毁对应的DOM元素 */
const DestroyOnClose = ref<Boolean>(true);
/** Element Plus 忘记密码模态框右上角小× */
const showClose = ref<Boolean>(false);

/** 登录表格实例 */
const loginFormRef = ref<FormInstance>();
/** 注册表格实例 */
const regFormRef = ref<FormInstance>();

/** 登录表格监听 loginXXX */
const loginForm = reactive({
    loginEmail: '',
    loginPassword: '',

})
/** 注册表格监听 regXXX*/
const regForm = reactive({
    regEmail: '',
    regPassword: '',
    regCheckPassword: '',
    regUsername: '',
    regCapture: ''
})

/** 登录表格校验监听 */
const loginRules = reactive<FormRules>({
    loginEmail: [
        { validator: validation.emailValidate, trigger: 'change' },
        { validator: validation.emailValidate, trigger: 'blur' },
    ],
    loginPassword: [
        {
            validator: (rule, value, callback) => {
                validation.passwordValidate(rule, value, callback, 'login', null)
            },
            trigger: 'change'
        },
        {
            validator: (rule, value, callback) => {
                validation.passwordValidate(rule, value, callback, 'login', null)
            },
            trigger: 'blur'
        },
    ]
})
/** 注册表格校验监听 */
const regRules = reactive<FormRules>({
    regEmail: [
        { validator: validation.emailValidate, trigger: 'change' },
        { validator: validation.emailValidate, trigger: 'blur' },
    ],
    regUsername: [
        { validator: validation.emailValidate, trigger: 'change' },
        { validator: validation.emailValidate, trigger: 'blur' },
    ],
    regCapture: [
        { validator: validation.emailValidate, trigger: 'change' },
        { validator: validation.emailValidate, trigger: 'blur' },
    ],
    regPassword: [
        {
            validator: (rule, value, callback) => {
                /** 一个监听是否通过改变密码而操控校验重复密码框的布尔值 */
                let checkWarn = new Boolean(false);
                checkWarn = validation.passwordValidate(rule, value, callback, 'reg', regForm.regCheckPassword);
                if (checkWarn) {
                    if (!regFormRef.value) {
                        return;
                    }
                    regFormRef.value.validateField('regCheckPassword', () => null);
                }
            },
            trigger: 'change'
        },
        {
            validator: (rule, value, callback) => {
                let checkWarn = new Boolean(false);
                checkWarn = validation.passwordValidate(rule, value, callback, 'reg', regForm.regCheckPassword);
                if (checkWarn) {
                    if (!regFormRef.value) {
                        return;
                    }
                    regFormRef.value.validateField('regCheckPassword', () => null);
                }
            },
            trigger: 'blur'
        },
    ],
    regCheckPassword: [
        {
            validator: (rule, value, callback) => {
                validation.passwordDoubleValidate(rule, value, callback, regForm.regPassword);
            },
            trigger: 'change'
        },
        {
            validator: (rule, value, callback) => {
                validation.passwordDoubleValidate(rule, value, callback, regForm.regPassword);
            },
            trigger: 'blur'
        },
    ],
})

/**
 * 通体检查有效后向api发起登录请求
 * @param formEl 表实例
 */
const loginSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            auth.loginApi(loginForm);
        }
        else {
            return false
        }
    })
}
/**
 * 通体检查有效后向api发起注册请求
 * @param formEl 表实例
 */
const regSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            auth.regApi(regForm);
        }
        else {
            return false
        }
    })
}

</script>

<style lang="scss" scoped>
@import url('@/assets/scss/auth.module.scss');

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>