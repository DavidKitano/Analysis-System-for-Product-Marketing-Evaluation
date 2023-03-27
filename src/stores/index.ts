import { defineStore } from 'pinia'

/*
    主容器 参数1：容器唯一ID 参数二：选项对象
*/
export const useMainStore = defineStore('main', {
    /**
     * 类似于组件的data，全局状态
     * 1、必须是函数：避免在服务端渲染交叉请求导致数据状态污染
     * 2、必须是箭头函数：为了TS类型推导
     */
    state: () => {
        return {
            username: ''
        };
    },

    /**
     * computed，计算属性，缓存
     */
    getters: {},

    /**
     * methods，业务逻辑，修改state
     */
    actions: {}
})