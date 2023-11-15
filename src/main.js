// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useIntersectionObserver } from '@vueuse/core'

// 测试接口函数
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res=>{
//     console.log(res);
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令
app.directive('img-lazy', {
    mounted(el, binding) {
        // el代表指令绑定的元素
        // binding一个对象,包含如binding.value（指令等于后面绑定的值）等属性
        // console.log(el, binding);
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                // console.log(isIntersecting);
                if(isIntersecting){
                    // 代表图片进入视口区
                    el.src = binding.value
                }
            },
        )
    }
})
