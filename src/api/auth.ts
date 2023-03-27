import * as opt from '@/utils/optimize';
import axios from 'axios';
// import _ from 'lodash';

const authAxios = axios.create();

authAxios.defaults.timeout = 20000;
authAxios.defaults.headers.post["Content-Type"] = "multipart/form-data;charset=utf-8";
authAxios.defaults.baseURL = '/apis'
// const BASE_URL = 'https://40f071780t.goho.co:443';

export async function loginApi(loginForm: Object) {
    const loginUrl = opt.timestamp('auth/login')
    if (!loginForm['loginPassword'] || !loginForm['loginEmail']) {
        return opt.errRes;
    }
    let _res;
    await authAxios({
        method: 'POST',
        url: loginUrl + '',
        data: {
            password: loginForm['loginPassword'],
            email: loginForm['loginEmail']
        }
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
    });
    return _res;
}

export async function logoutApi() {
    const url = opt.timestamp('auth/logout');
    if (!localStorage.getItem('token')) {
        return opt.errRes;
    }
    let _res;
    await authAxios({
        method: 'GET',
        url: url + '',
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(res => {
        _res = res
    }).catch(err => {
        console.error(err);
    });
    return _res;
}

export async function regApi(regForm: Object) {
    const url = opt.timestamp('auth/register');
    if (!regForm['regEmail'] || !regForm['regPassword'] || !regForm['regCheckPassword'] || !regForm['regUsername'] || !regForm['regCaptcha'])
        return opt.errRes;
    let _res;
    await authAxios({
        method: 'POST',
        url: url + '',
        data: {
            password: regForm['regPassword'],
            password_confirm: regForm['regCheckPassword'],
            email: regForm['regEmail'],
            username: regForm['regUsername'],
            captcha: regForm['regCaptcha']
        }
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
    });
    return _res;
}

export function forgetApi(forgetForm: Object) {
    opt.debounce(async () => {
        await console.log('忘记密码', forgetForm);
    }, 1500, true)
}

export async function emailAccessApi(email: String) {
    const url = opt.timestamp('auth/captcha/email');
    let _res;
    if (!email) {
        return opt.errRes;
    }
    await authAxios({
        method: 'GET',
        url: url + '',
        params: {
            email: email
        }
    }).then(res => {
        _res = res
    }).catch(err => {
        console.error(err);
    });
    return _res;
}