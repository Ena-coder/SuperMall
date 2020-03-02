<template>
  <div class="goods">
    <!-- 根据数组多少遍历GoodsListItem组件 -->
    <goods-list-item v-for="item in goods" :goods-item="item" class="goods-item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  methods:{},
  created(){}
}
</script>
<style scoped>
.goods{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2%;
}
</style>