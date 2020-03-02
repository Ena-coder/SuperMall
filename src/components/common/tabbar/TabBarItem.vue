<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- 用div外层包裹确保样式不被替换 -->
      <div v-if="isActive">
        <!-- 判断展示那张图片 -->
        <slot name="item-icon-active"></slot>
      </div>
      <div v-else>
      <slot name="item-icon"></slot>
      </div>
      <!-- 为防止插槽元素被实际元素完全替换导致class丢失，用div外层包裹，并把class写在外层div上 -->
      <div :style="activeStyle">
        <!-- 动态决定是否添加active类 -->
        <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
      path:String,
      activeColor:{
        type:String,
        default:'#1296db'
      }
  },
  data(){
    return{
      // isActive:false,非动态决定，不可取
    }
  },
  computed:{
    // 技巧：计算属性动态决定true和false
    isActive(){
      // 当前活跃的路由路径与父组件传来的路径属性的值进行比较，A.indexOf(B)比较：如果A不包含B则返回-1
      return this.$route.path.indexOf(this.path) !== -1//如果不包含则为false，包含则为true
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    color: #bfbfbf;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>