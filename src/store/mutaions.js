import{
  ADD_COUNTER ,
  ADD_TO_CART
} from './mutation-types'
export default{
  // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事情比较单一，更容易跟踪变化情况
    [ADD_COUNTER](state,payload){
      payload.count++
    },//这样操作就可跟踪，当项目大时，就方便调试
    [ADD_TO_CART](state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }

    // addCart(state,payload){
    //   // 同一款商品不能重复添加，只能增加数量
    //   // 判断当前商品是否已经存在的2种方法
    //   // 方法1：
      
    //   // let oldProduct = null
    //   // for(let item of state.cartList){
    //   //   if(payload.iid !== item.iid){
    //   //     oldProduct = item
    //   //   }
    //   // }
    //   // 方法2：
    //   // 数组中的find函数能够找到传入的当前选中的项是否已经选过，如果已经选过则返回此项
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)

    //   // 2.判断oldProduct
    //   if(oldProduct){
    //     oldProduct.count += 1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
}