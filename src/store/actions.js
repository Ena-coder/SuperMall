import{
  ADD_COUNTER ,
  ADD_TO_CART
} from './mutation-types'
export default{
  // context:{state,commit}
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if(oldProduct){
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('该商品数量+1')
      }else{
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('该商品已添加到购物车')
      }
    })
  }
}