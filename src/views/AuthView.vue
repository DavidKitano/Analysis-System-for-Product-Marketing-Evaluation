<template>
    <!-- 深色模式 开发中 -->
    <!-- <button @click="toggleDark()">
        <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

        <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
    </button> -->
    <div class="mainBox" v-loading="regLoading || loginLoading">
        <el-container class="contentBox">
            <el-main class="contentElement contentPre" id="contentPre">
                <RouterLink to="/home">
                    <h5>&Lt; HOME</h5>
                </RouterLink>
                <h2 id="guideInfo">No Account?</h2>
                <el-divider id="guideDivide" border-style="dotted">
                    ⭐
                </el-divider>
                <el-text type="primary" id="guideBtn" @click="switchEle()">Click here to register</el-text>
            </el-main>
            <el-main class="contentElement">
                <h1>Login</h1>
                <section class="contentForm contentBack">
                    <el-form :label-position="labelPosition" :label-width="labelWidth" :model="loginForm"
                        :style="formInlineStyle" ref="loginFormRef" :rules="loginRules" :size="formSize">
                        <el-form-item label="Email" prop="loginEmail">
                            <el-input class="generalInput" name="loginEmail" v-model="loginForm.loginEmail"
                                placeholder="Please Input email" />
                        </el-form-item>
                        <el-form-item label="Password" prop="loginPassword">
                            <el-input class="generalInput" name="loginPassword" v-model="loginForm.loginPassword"
                                placeholder="Please Input password" :maxlength="maxLengthPassword"
                                :minlength="minLengthPassword" :show-password="showPassword" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="loginSubmit(loginFormRef)">Login</el-button>
                            <el-text id="forgotPassBtn" size="small" type="primary"
                                @click="forgetVisible = true">Forgot?</el-text>
                        </el-form-item>
                    </el-form>
                </section>
            </el-main>
            <el-main class="contentElement">
                <h1>Register</h1>
                <section class="contentForm">
                    <el-form :label-position="labelPosition" :label-width="labelWidth" :model="regForm"
                        :style="formInlineStyle" ref="regFormRef" :rules="regRules" :size="formSize"
                        :status-icon="statusIcon">
                        <el-form-item label="Email" prop="regEmail">
                            <el-input class="generalInput" name="regEmail" v-model="regForm.regEmail"
                                placeholder="Please input email" />
                        </el-form-item>
                        <el-form-item label="Code" prop="regCaptcha">
                            <el-input class="captchaInput" name="regCaptcha" v-model="regForm.regCaptcha"
                                placeholder="Verify code" :maxlength="lengthCaptcha" :minlength="lengthCaptcha" />
                            <el-button type="primary" :disabled="onRegCold" @click="captchaAccess(-1)">
                                {{ captchaRegBtnInfo }}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="Username" prop="regUsername">
                            <el-input class="generalInput" name="regUsername" v-model="regForm.regUsername"
                                placeholder="Please input username" :maxlength="maxLengthUsername"
                                :minlength="minLengthUsername" />
                        </el-form-item>
                        <el-form-item label="Password" prop="regPassword">
                            <el-input class="generalInput" name="regPassword" v-model="regForm.regPassword"
                                placeholder="Please input password" :maxlength="maxLengthPassword"
                                :minlength="minLengthPassword" :show-password="showPassword" />
                        </el-form-item>
                        <el-form-item label="Confirm" prop="regCheckPassword">
                            <el-input class="generalInput" name="regCheckPassword" v-model="regForm.regCheckPassword"
                                placeholder="Please confirm password" :maxlength="maxLengthPassword"
                                :minlength="minLengthPassword" :show-password="showPassword" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="regSubmit(regFormRef)">Register</el-button>
                        </el-form-item>
                    </el-form>
                </section>
            </el-main>
        </el-container>
    </div>

    <!-- 忘记密码 -->
    <div class="forgetBox" v-loading="forgetLoading">
        <el-dialog v-model="forgetVisible" title="Reset Password" width="50%" :lock-scroll="lockScroll"
            :close-on-click-modal="closeOnClickModal" :destroy-on-close="DestroyOnClose" :show-close="showClose"
            :close-on-press-escape="closeOnPressEscape">
            <section class="contentForm">
                <el-form :label-position="labelPosition" :label-width="labelWidth2" :model="forgetForm"
                    :style="formInlineStyle" ref="forgetFormRef" :rules="forgetRules" :size="formSize2"
                    :status-icon="statusIcon">
                    <el-form-item label="Email" prop="forgetEmail">
                        <el-input class="generalInput" ref="forgetFormEmailRef" name="forgetEmail"
                            v-model="forgetForm.forgetEmail" placeholder="Please input email" />
                    </el-form-item>
                    <el-form-item label="Code" prop="forgetCaptcha">
                        <el-input class="captchaInput" name="forgetCaptcha" v-model="forgetForm.forgetCaptcha"
                            placeholder="Verify code" :maxlength="lengthCaptcha" :minlength="lengthCaptcha" />
                        <el-button type="primary" :disabled="onForgetCold" @click="captchaAccess(1)">
                            {{ captchaForgetBtnInfo }}
                        </el-button>
                    </el-form-item>
                    <el-form-item label="New Password" prop="forgetPassword">
                        <el-input class="generalInput" name="forgetPassword" v-model="forgetForm.forgetPassword"
                            placeholder="Please input your new password" :maxlength="maxLengthPassword"
                            :minlength="minLengthPassword" :show-password="showPassword" />
                    </el-form-item>
                    <el-form-item label="Confirm" prop="forgetCheckPassword">
                        <el-input class="generalInput" name="forgetCheckPassword" v-model="forgetForm.forgetCheckPassword"
                            placeholder="Please confirm your password" :maxlength="maxLengthPassword"
                            :minlength="minLengthPassword" :show-password="showPassword" />
                    </el-form-item>
                </el-form>
            </section>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeForgetWindow()">
                        Cancel
                    </el-button>
                    <el-button type="primary" @click="forgetSubmit(forgetFormRef)">
                        Submit
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus';
import { ElNotification, ElMessage } from 'element-plus';
import { onMounted, reactive, ref, h } from 'vue';
import { useRouter } from "vue-router";
import * as validation from '@/utils/formValidate';
import * as auth from '@/api/auth';
import * as opt from '@/utils/optimize';
// import { useDark, useToggle } from '@vueuse/core'

/** 获取路由实例 */
const router = useRouter();
/** 默认访问的表单 login/register */
const mod = router.currentRoute.value.query.mod;
/** 是否展示注册表单的布尔值 */
let regFormShow = ref<Boolean>(false);

/** contentPre的实例 */
let pre = document.getElementById('contentPre') as HTMLElement;
/** guideInfo的实例  */
let info = document.getElementById('guideInfo') as HTMLElement;
/** guideBtn的实例 */
let btn = document.getElementById('guideBtn') as HTMLElement;

/** Element Plus 标签吸附位置 */
const labelPosition = ref<String>('left');
/** Element Plus 标签长度 */
const labelWidth = ref<String>('80px');
/** Element Plus 标签长长度 */
const labelWidth2 = ref<String>('120px');
/** Element Plus 表格尺寸 */
const formSize = ref<String>('default');
/** Element Plus 表格大尺寸 */
const formSize2 = ref<String>('large');
/** 表格内联样式 */
const formInlineStyle = ref<String>('max-width: 460px');
/** 密码可输入最大长度 */
const maxLengthPassword = ref<Number>(25);
/** 密码可输入最小长度 */
const minLengthPassword = ref<Number>(6);
/** 用户名可输入最大长度 */
const maxLengthUsername = ref<Number>(25);
/** 用户名可输入最小长度 */
const minLengthUsername = ref<Number>(3);
/** 验证码可输入长度 */
const lengthCaptcha = ref<Number>(4);
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
/** Element Plus 忘记密码模态框是否可以通过ESC关闭 */
const closeOnPressEscape = ref<Boolean>(false);
/** Element Plus 忘记密码加载 */
const forgetLoading = ref<Boolean>(false);
/** Element Plus 注册加载 */
const regLoading = ref<Boolean>(false);
/** Element Plus 登录加载 */
const loginLoading = ref<Boolean>(false);
/** 注册冷却 */
const onRegCold = ref<Boolean>(false);
/** 忘记密码冷却 */
const onForgetCold = ref<Boolean>(false);
/** 注册获取验证码倒计时 */
const regCountdown = ref<Number>(60);
/** 忘记密码获取验证码倒计时 */
const forgetCountdown = ref<Number>(60);

/** 获取验证码按钮内容 - 注册 */
const captchaRegBtnInfo = ref<String>('Get Code');
/** 获取验证码按钮内容 - 忘记密码 */
const captchaForgetBtnInfo = ref<String>('Get Code');


/** 登录表格实例 */
const loginFormRef = ref<FormInstance>();
/** 注册表格实例 */
const regFormRef = ref<FormInstance>();
/** 忘记密码表格实例 */
const forgetFormRef = ref<FormInstance>();

/** 深色模式判定 */
// const isDark = useDark()
/** 深色模式触发 */
// const toggleDark = useToggle(isDark)

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
    regCaptcha: ''
})
/** 忘记密码表格监听 forgetXXX*/
const forgetForm = reactive({
    forgetEmail: '',
    forgetPassword: '',
    forgetCheckPassword: '',
    forgetCaptcha: ''
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
        { validator: validation.usernameValidate, trigger: 'change' },
        { validator: validation.usernameValidate, trigger: 'blur' },
    ],
    regCaptcha: [
        { validator: validation.captchaValidate, trigger: 'change' },
        { validator: validation.captchaValidate, trigger: 'blur' },
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
/** 注册表格校验监听 */
const forgetRules = reactive<FormRules>({
    forgetEmail: [
        { validator: validation.emailValidate, trigger: 'change' },
        { validator: validation.emailValidate, trigger: 'blur' },
    ],
    forgetCaptcha: [
        { validator: validation.captchaValidate, trigger: 'change' },
        { validator: validation.captchaValidate, trigger: 'blur' },
    ],
    forgetPassword: [
        {
            validator: (rule, value, callback) => {
                let checkWarn = new Boolean(false);
                checkWarn = validation.passwordValidate(rule, value, callback, 'forget', forgetForm.forgetCheckPassword);
                if (checkWarn) {
                    if (!forgetFormRef.value) {
                        return;
                    }
                    forgetFormRef.value.validateField('forgetCheckPassword', () => null);
                }
            },
            trigger: 'change'
        },
        {
            validator: (rule, value, callback) => {
                let checkWarn = new Boolean(false);
                checkWarn = validation.passwordValidate(rule, value, callback, 'forget', forgetForm.forgetCheckPassword);
                if (checkWarn) {
                    if (!forgetFormRef.value) {
                        return;
                    }
                    forgetFormRef.value.validateField('forgetCheckPassword', () => null);
                }
            },
            trigger: 'blur'
        },
    ],
    forgetCheckPassword: [
        {
            validator: (rule, value, callback) => {
                validation.passwordDoubleValidate(rule, value, callback, forgetForm.forgetPassword);
            },
            trigger: 'change'
        },
        {
            validator: (rule, value, callback) => {
                validation.passwordDoubleValidate(rule, value, callback, forgetForm.forgetPassword);
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
    await formEl.validate(async (valid) => {
        if (valid) {
            loginLoading.value = true;
            setTimeout(async () => {
                opt.debounce(async () => {
                    let res = await auth.loginApi(loginForm);
                    res = opt.formalizeRes(res);
                    loginLoading.value = false;
                    if (!res) return;
                    if (res['avail']) {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'success',
                            duration: 1500
                        })
                        // 正常情况下应该localStorage存token，由于项目时间紧、该部分不是着重点以及与后端的沟通本处采用session
                        sessionStorage.setItem('username', res['data']);
                        location.href = '/home';
                    } else {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'error',
                            duration: 1500
                        })
                    }
                }, 1000, true);
            }, 1000)
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
    await formEl.validate(async (valid) => {
        if (valid) {
            regLoading.value = true;
            setTimeout(async () => {
                opt.debounce(async () => {
                    let res = await auth.regApi(regForm);
                    res = opt.formalizeRes(res);
                    regLoading.value = false;
                    if (!res) return;
                    if (res['avail']) {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'success',
                            duration: 1500
                        })
                        location.href = '/auth?mod=log';
                    } else {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'error',
                            duration: 1500
                        })
                    }
                }, 1000, true);
            }, 1000)
        }
        else {
            return false;
        }
    })
}

/**
 * 通体检查有效后向api发起忘记密码请求
 * @param formEl 表实例
 */
const forgetSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            forgetLoading.value = true;
            auth.forgetApi(forgetForm);
        }
        else {
            return false;
        }
    })
}

/**
 * 简单检查邮箱后向api发起邮箱验证请求
 * @param mod 参数，-1为注册用，1为找回密码用
 */
const captchaAccess = async (mod: Number | undefined) => {
    if (mod === -1)
        regLoading.value = true;
    if (mod === 1)
        forgetLoading.value = true;
    setTimeout(async () => {
        let avail = false;
        if (!mod || mod < -1 || mod > 1 || mod == 0) {
            return;
        }
        if (mod === -1) {
            regLoading.value = false;
            if (regForm.regEmail === '' || !validation.emailReg.test(regForm.regEmail)) {
                avail = false;
            }
            else {
                avail = true;
            }
        }
        if (mod === 1) {
            forgetLoading.value = false;
            if (forgetForm.forgetEmail === '' || !validation.emailReg.test(forgetForm.forgetEmail)) {
                avail = false;
            }
            else {
                avail = true;
            }
        }
        if (!avail) {
            ElNotification({
                title: 'Email Wrong Input',
                message: h('b', { style: 'color: red;text-align:left;' }, 'You\'ve typed into a wrong email. Maybe it\'s due to format issues. Please check and try again. '),
                type: 'error',
                duration: 2000,
                position: 'top-right',
                showClose: false
            });
        }
        else {
            setCountdown(mod);
            opt.debounce(async () => {
                if (mod === -1) {
                    let res = await auth.emailAccessApi(regForm.regEmail);
                    res = opt.formalizeRes(res);
                    console.log(res);
                    if (!res)
                        return;
                    if (res['avail']) {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'success',
                            duration: 2500
                        });
                    } else {
                        ElMessage({
                            showClose: true,
                            message: res['msg'],
                            type: 'error',
                            duration: 1500
                        });
                    }
                }
                if (mod === 1) {
                    await auth.emailAccessApi(forgetForm.forgetEmail);
                }
            }, 1000, true)
        }
    }, 1000)
}

/**
 * 转换表单框
 */
const switchEle = () => {
    regFormShow.value = !regFormShow.value;
    if (regFormShow.value) {
        info.innerText = 'Already have an account?';
        btn.innerText = 'Click here to login';
        pre.style.marginLeft = '0%';
    } else {
        info.innerText = 'No account?';
        btn.innerText = 'Click here to register';
        pre.style.marginLeft = '50%';
    }
}

/**
 * 验证码倒计时
 * @param mod 参数，-1为注册用，1为找回密码用
 */
const setCountdown = (mod: Number | undefined) => {
    if (!mod) {
        return;
    }
    const countdownInstance = setInterval(async () => {
        if (mod === -1) {
            regCountdown.value = Number(regCountdown.value) - 1;
            onRegCold.value = true;
            captchaRegBtnInfo.value = "Retry in " + regCountdown.value;
        }
        else if (mod === 1) {
            forgetCountdown.value = Number(forgetCountdown.value) - 1;
            onForgetCold.value = true;
            captchaForgetBtnInfo.value = "Retry in " + forgetCountdown.value;
        }
        if ((mod === -1 && regCountdown.value <= 0) || (mod === 1 && forgetCountdown.value <= 0)) {
            clearInterval(countdownInstance);
            if (mod === -1) {
                regCountdown.value = 60;
                onRegCold.value = false;
                captchaRegBtnInfo.value = "Get Code";
            }
            else if (mod === 1) {
                forgetCountdown.value = 60;
                onForgetCold.value = false;
                captchaForgetBtnInfo.value = "Get Code";
            }

        }
    }, 1000)
}

/** 关闭忘记密码模态框 */
const closeForgetWindow = () => {
    forgetVisible.value = false;
    Object.keys(forgetForm).forEach(key => {
        /*
            ※ 在tsconfig.json中compilerOptions里加入"suppressImplicitAnyIndexErrors": true
            ※ 解决元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式不能用于索引类型 “Object“。 
            ※ 在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名的问题
            ※ 问题的原因是key值的类型不是string，在javascript中是默认给你转好的，
            ※ 而在Typescript中则不是，因此要么转，要么声明，要么忽略
        */
        forgetForm[key] = '';
    })
}

/*
    生命周期函数分隔
*/

onMounted(() => {
    // 在挂载时就获取实例方便首次判断
    pre = document.getElementById('contentPre') as HTMLElement;
    info = document.getElementById('guideInfo') as HTMLElement;
    btn = document.getElementById('guideBtn') as HTMLElement;
    // 判断地址传参mod的值从而判断默认的表单为注册或登录
    if (mod) {
        switch (mod) {
            default:
            case 'log':
            case 'login': {
                regFormShow.value = false;
                break;
            }
            case 'reg':
            case 'register': {
                regFormShow.value = true;
                break;
            }
        }
    }
    if (regFormShow.value) {
        info.innerText = 'Already have an account?';
        btn.innerText = 'Click here to login';
        pre.style.marginLeft = '0%';
    } else {
        info.innerText = 'No account?';
        btn.innerText = 'Click here to register';
        pre.style.marginLeft = '50%';
    }
})


</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth.module.scss';
</style>