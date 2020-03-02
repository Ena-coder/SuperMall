<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  components:{},
  props:{
    recommends:{
      type:Array,
      default(){
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
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0px 15px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  height: 65px;
  width: 65px;
  margin-bottom: 5px;
}
</style>