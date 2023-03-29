import * as opt from '@/utils/optimize';
import axios from 'axios';
import { useMainStore } from '@/stores/user';
import pinia from '@/stores/';

/** Pinia存储 */
const store = useMainStore(pinia);
const anaAxios = axios.create();

anaAxios.defaults.timeout = 20000;
anaAxios.defaults.headers.post["Content-Type"] = "multipart/form-data;charset=utf-8";
anaAxios.defaults.baseURL = '/apis';

export async function textAnalyzeApi(text: String) {
    const url = opt.timestamp('');
    if (!text || !store.loginStatus)
        return opt.errRes;
    let _res;
    await anaAxios({
        method: 'POST',
        url: url + '',
        data: {

        }
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
        _res = opt.errRes;
    });
    return _res;
}

export async function fileAnalyzeApi(data: FormData) {
    const url = opt.timestamp('');
    if (!data || !store.loginStatus)
        return opt.errRes;
    let _res;
    await anaAxios({
        method: 'POST',
        url: url + '',
        data: data
    }).then(res => {
        _res = res;
    }).catch(err => {
        console.error(err);
        _res = opt.errRes;
    });
    return _res;
}