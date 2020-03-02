<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectedAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  props:{},
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price* item.count
      },0 ).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectedAll(){
      // 考虑到购物车内没有商品全选按钮也会点亮的bug（原因是!undefined为true）
      if(this.cartList.length !== 0){
        // 法一:遍历所有加入购物车的所有没选中的项的数量，数量不为0则返回false，为0则返回true
        // return !(this.cartList.filter(item => !item.checked).length)
        // 法二:只要找到一个没选中的项就返false，否则返回true
        return !this.cartList.find(item => !item.checked) 
      }else{
        return false
      }
    }
  },
  methods:{
    calClick(){
      if(!this.isSelectedAll){
        // console.log(this.$toast);
        
        this.$toast.show('请选择购买的商品',1000)
      }
    },
    checkClick(){
      if(this.isSelectedAll){//全部选中
        this.cartList.forEach(item => {
          item.checked = false
        });
      }else{//部分或全部不选中
        this.cartList.forEach(item => {
          item.checked = true
        });
      }
      // 不能做简化
      // this.cartList.forEach(item => {
      //     item.checked = !this.isSelectedAll
      //   })
    }
  },
  created(){},
}
</script>
<style scoped>
.bottom-bar{
  display: flex;
  position: relative;

  height: 40px;
  line-height: 40px;
  
  background: #eee;
  font-size: 14px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.check-content{
  display: flex;
  align-items: center;
  width: 100px;
}
.price{
  flex: 1;
}
.calculate{
  width: 120px;
  text-align: center;
  line-height: 40px;
  color: aliceblue;
  background: var(--color-tint)
}
</style>