import * as opt from '@/utils/optimize';
import axios from 'axios';

const anaAxios = axios.create();

anaAxios.defaults.timeout = 20000;
anaAxios.defaults.headers.post["Content-Type"] = "multipart/form-data;charset=utf-8";
anaAxios.defaults.baseURL = '/apis'