// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        // 懒加载逻辑
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el代表指令绑定的元素
                // binding一个对象,包含如binding.value（指令等于后面绑定的值）等属性
                // console.log(el, binding);
                const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // console.log(isIntersecting);
                        if (isIntersecting) {
                            // 代表图片进入视口区 
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
    }
}