
<template>
    <swiper>
      <swiper-item v-for="item in banners">
        <!-- 从banners取出数据插入预留的插槽中 -->
        <a :href="item.link">
          <img :src="item.image" @load="imageload">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
// 因为有个index.js文件导出了两个vue文件
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper, 
    SwiperItem,
  },
  // 组件是从Home.vue中移过来的，banners数据就需要从中传入
  props:{
    banners:{
      type:Array,
      default(){  //默认值必须是个函数
        return []
      }
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    imageload(){
      // console.log('----');//出现4次
      // 一共有4张图片，没有必要发送4次，只需要发送1次就可以了
      if(!this.isLoad){
        this.$emit('swiperImageload')
        this.isLoad = true
      }
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>