<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
    class="tab-control-item" 
    :class="{active:index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    titles:{
      type:Array,
      default(){//当返回类型是对象或数组时，default必须是函数
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    // 发生点击时：
    // 1.样式发生变化
    // 2.发送信息告诉外部组件传入数据
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)//发送点击事件和下标
    }
  }
}
</script>
<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: var(--color-high-text)
}
.active span{
  padding: 5px;
  border-bottom: 2px solid #ff5777;
}
</style>