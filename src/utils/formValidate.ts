/** 邮箱校验正则表达式 */
const emailReg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$');
const numberReg = new RegExp('^[0-9]+$');

/**
 * 邮箱校验
 * 
 * @param rule 校验规则
 * @param value 邮箱值
 * @param callback callback函数
 */
export const emailValidate = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入邮箱'));
    }
    else if (!emailReg.test(value)) {
        callback(new Error('请输入正确的邮箱'));
    }
    else {
        callback();
    }
}

/**
 * 用户名校验
 * 
 * @param rule 校验规则
 * @param value 用户名值
 * @param callback callback函数
 */
export const usernameValidate = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'));
    }
    else if (value.length < 3 || value.length > 20) {
        callback(new Error('请输入3~20位以内的用户名'));
    }
    else {
        callback();
    }
}

/**
 * 验证码位数校验，深入校验在后台
 * 
 * @param rule 校验规则
 * @param value 验证码值
 * @param callback callback函数
 */
export const captureValidate = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入验证码'));
    }
    else if (value.length !== 4 || !numberReg.test(value)) {
        callback(new Error('请输入4位数字验证码'));
    }
    else {
        callback();
    }
}

/**
 * 密码校验，可通过如下例子对返回值进行重复密码字段的检测
 * 
 *          if (!ref表格实例.value) {
 *              return;
 *          }
 *          ref表格实例.value.validateField('重复密码字段名', () => null);
 * 
 * @param rule 校验规则
 * @param value 密码值
 * @param callback callback函数
 * @param mod 模式（登录/注册，匹配字符串login及reg）
 * @param value2 重复密码值
 * @return 一个监听是否通过改变密码而操控校验重复密码框的布尔值
 */
export const passwordValidate = (rule: any, value: any, callback: any, mod: String, value2: any | undefined | null) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    }
    else if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入6~20位的密码'));
    }
    else if (mod === 'reg') {
        if (value2 !== '') {
            callback();
            return true;
        }
        callback();
    }
    else {
        callback();
    }
    return false;
}

/**
 * 再次输入密码校验
 * 
 * @param rule 校验规则
 * @param value 再次输入密码值
 * @param callback callback函数
 * @param value2 原密码值
 */
export const passwordDoubleValidate = (rule: any, value: any, callback: any, value2: any) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    }
    else if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入6~20位密码'));
    }
    else if (value !== value2) {
        callback(new Error('两次输入不一致'));
    }
    else {
        callback();
    }
}