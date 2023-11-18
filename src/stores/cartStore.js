import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1.定义state - cartList
    const cartList = ref([])
    // 2.定义action - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        }
        else {
            // 本地购物车逻辑
            // 添加购物车操作
            // 已添加过 - count +1
            // 没添加过 - push
            // 思路：通过匹过来的skuId能不能在cartList中找到，找到了就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到
                item.count++
            }
            else {
                // 没找到
                cartList.value.push(goods)
            }
        }
    }
    const delCart = async (skuId) => {
        if (isLogin.value) {
            // 调用接口实现接口购物车的删除功能
            await delCartAPI([skuId])
            updateNewList()
        }
        else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    // 获取最新购物车列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        // 覆盖掉本地购物车列表
        cartList.value = res.result
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改哪项 然后修改其selected值
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        // 把cartlist的每一项selected都设置为当前的全选状态
        cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性
    // 1.总数量
    const allCount = computed(() => cartList.value.reduce((value, item) => value + item.count, 0))
    // 2.总价格
    const allPrice = computed(() => cartList.value.reduce((value, item) => value + item.count * item.price, 0))

    // 3.已选择数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((value, item) => value + item.count, 0))
    // 4.已选择商品合计
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((value, item) => value + item.count * item.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every(item => item.selected))
    return {
        cartList,
        addCart,
        delCart,
        allCheck,
        singleCheck,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll
    }
}, {
    persist: true,
})