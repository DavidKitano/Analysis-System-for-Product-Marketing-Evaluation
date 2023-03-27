import * as opt from '@/utils/optimize';
import axios from 'axios';
// import _ from 'lodash';

const authAxios = axios.create();

authAxios.defaults.timeout = 20000;
authAxios.defaults.headers.post["Content-Type"] = "multipart/form-data;charset=utf-8";
authAxios.defaults.headers.put["Content-Type"] = "multipart/form-data;charset=utf-8";
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
    // 正常情况下应该localStorage存token，由于项目时间紧、该部分不是着重点以及与后端的沟通本处采用session
    // if (!localStorage.getItem('token')) {
    //     return opt.errRes;
    // }
    if (!sessionStorage.getItem('username')) {
        return opt.errRes;
    }
    let _res;
    await authAxios({
        method: 'GET',
        url: url + '',
        // headers: {
        //     token: localStorage.getItem('token')
        // }
    }).then(res => {
        _res = res;
        console.log(_res);

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

export async function forgetVerifyApi(forgetForm: Object) {
    const url = opt.timestamp('auth/mail/verify')
    if (!forgetForm['forgetEmail'] || !forgetForm['forgetCaptcha']) {
        return opt.errRes;
    }
    let _res;
    await authAxios({
        method: 'POST',
        url: url + '',
        data: {
            email: forgetForm['forgetEmail'],
            captcha: forgetForm['forgetCaptcha']
        }
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
    });
    return _res;
}

export async function forgetAllApi(forgetForm: Object) {
    const url = opt.timestamp('auth/mail/reset')
    if (!forgetForm['forgetEmail'] || !forgetForm['forgetCaptcha'] || !forgetForm['forgetPassword'] || !forgetForm['forgetCheckPassword']) {
        return opt.errRes;
    }
    let _res;
    await authAxios({
        method: 'POST',
        url: url + '',
        data: {
            email: forgetForm['forgetEmail'],
            captcha: forgetForm['forgetCaptcha'],
            password: forgetForm['forgetPassword'],
            password_confirm: forgetForm['forgetCheckPassword']
        }
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
    });
    return _res;
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

export async function changeUsernameApi(name: String) {
    const url = opt.timestamp('/auth/username/reset');
    const email = sessionStorage.getItem('id');
    let _res;
    if (!email || !name) {
        return opt.errRes;
    }
    await authAxios({
        method: 'PUT',
        url: url + '',
        data: {
            email: email,
            username: name
        }
    }).then(res => {
        _res = res
    }).catch(err => {
        console.error(err);
    });
    return _res;
}