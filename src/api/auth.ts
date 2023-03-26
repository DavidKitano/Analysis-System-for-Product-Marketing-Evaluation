
export async function loginApi(loginForm: Object) {
    console.log('登录', loginForm);
}

export async function regApi(regForm: Object) {
    console.log('注册', regForm);
}

export async function forgetApi(forgetForm: Object) {
    console.log('忘记密码', forgetForm);
}

export async function emailAccessApi(email: String) {
    console.log('请求邮箱', email);
}