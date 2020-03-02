<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
// 子组件
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  name:'ShopCart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // 两种语法：1.数组形式、2.对象形式
    // ...mapGetters([
    //   'cartLength',
    //   'cartList'
    // ])
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>