import httpInstance from '@/utils/http'

// 封装获取banner接口
export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}

export function findNewAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export function findHotAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}