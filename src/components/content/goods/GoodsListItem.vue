<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy='goodsItem.show.img' alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  components:{},
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  methods:{
    imageLoad(){
      // 向总线发送itemImageLoad事件，Home.vue从总线接收
      // this.$bus.$emit('itemImageLoad')
      // // 现想要实现效果：Home.vue和Detail.vue都需要响应itemImageLoa事件
      // // 实现方案一，发送事件时通过路由判断：
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImgLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImgLoad')
      // }
      // 实现方案二：当进入详情页面时，首页不需要监听这个时间，也就是同一时间之有一个地方需要监听事件
      // ①在Home.vue中，一旦发现离开界面就deactivated()
      // ①在Detail.vue中，一旦发现离开界面就destroyed()
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  created(){},
}
</script>
<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
}
/* 收藏之前的小图标 */
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.png') 0 0/14px 14px;
}
</style>