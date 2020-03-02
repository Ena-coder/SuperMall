<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img :src="item" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" @load="imgLoad">
      <!-- @load="imgLoad"解决滚动问题 -->
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  components:{},
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      counter:0,
      imagesLength:0
    }
  },
  computed:{},
  methods:{
    imgLoad(){
      // 当所有图片加载完，才发送一次事件
      if(++this.counter === this.imagesLength){
        // 如果没有做判断，这个组件向父组件发送事件的次数由图片数量决定
        this.$emit('imageLoad')
      }
    }
  },
  watch:{//监听某个属性的变化
    detailInfo(){
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  },
  created(){},
}
</script>
<style scoped>
.goods-info{
  padding: 20px 0px;
  border-bottom: 2px solid #f2f5f8;
}
.info-desc{
  padding: 0px 15px;
}
.info-desc .start,.info-desc .end{
  width: 90px;
  height: 1px;
  background: #a3a3a5;
  position: relative;
}
.info-desc .start{
  float: left;
}
.info-desc .end{
  float: right;
}
.info-desc .start::before,.info-desc .end::after{
  content:'';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after{
  right: 0;
}
.info-desc .desc{
  padding: 15px 0px;
  font-size: 14px;
  text-align: center;
}
.info-key {
  margin: 10px 0px 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list img{
  width: 100%;
}
</style>