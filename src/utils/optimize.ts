import { ElMessage } from 'element-plus'

/** 防抖计时器 */
let debounceTimer: any;
/** 在立即触发后的一个布尔量指示是否进入防抖路径而非立即路径 */
let debounceInterrupt: boolean;

/** 错误结果对象 */
export const errRes = {
    data: {
        httpStatusCode: '500',
        code: '500',
        data: '',
        message: 'Internal error occurred, please contact administrators!',
        type: 'error',
        avail: false
    }
}

/**
 * 开发中提示
 */
export const underConstruction = () => {
    ElMessage.warning('Under construction');
    console.warn('该组件为非主要功能，仍在开发调试中');
}

/**
 * 手写防抖函数
 * @param fn 函数
 * @param delay 延迟
 * @returns 函数
 */
export function debounce(fn: Function | undefined | null, delay: number | undefined, immediate: boolean | undefined) {

    if (typeof immediate !== 'boolean') {
        immediate = false;
    }
    if (typeof delay !== 'number' || !delay) {
        delay = 1500;
    }
    if (typeof fn !== 'function') {
        console.error('No Function detected!!');
        return;
    }
    return (function (this: any, ...args: any[]) {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceInterrupt = true;
            debounceTimer = null;
            immediate = false;
        }
        if (immediate && !debounceTimer && !debounceInterrupt) {
            // 立即路径
            fn.apply(this, args);
            immediate = false;
            debounceInterrupt = true;
        }
        else {
            // 防抖路径
            debounceTimer = setTimeout(() => {
                fn.apply(this, args);
                debounceTimer = null;
                immediate = true;
                debounceInterrupt = false;
            }, delay);
        }
    })()
}

/**
 * 给接口链接加时间戳防止缓存机制导致302等问题
 * @param url 地址
 * @returns 带时间戳的地址
 */
export function timestamp(url: String) {
    const getTimestamp = new Date().getTime();
    url = url + '?timestamp=' + getTimestamp;
    return url;
}

/**
 * 配合Element UI的ElMessage组件，格式化结果
 * 
 * @param res Promise Async Await拿到的结果
 * @returns 格式化后的结果
 */
export function formalizeRes(res: any) {
    if (typeof res !== 'object' || !res.data) {
        return;
    }
    const code = String(res.data.code);
    const data = res.data.data;
    const msg = String(res.data.message);
    const _res = {
        httpStatusCode: '200',
        code: code,
        data: data,
        msg: msg,
        type: 'info',
        avail: false
    }
    switch (code) {
        default: {
            _res.type = 'info';
            break;
        };
        case '0':
        case '200': {
            _res.type = 'success';
            _res.avail = true;
            break;
        }
        case '400':
        case '401':
        case '402': {
            _res.type = 'error';
            _res.avail = false;
        }
    }
    return _res;
}