<template>
    <nav-bar>
      <div slot="left" class="back" @click="backClick"> 
        <img src="~assets/img/common/back.png">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active: index == currentIndex}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'',
  components:{
    NavBar
  },
  props:{},
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  computed:{},
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit("titleClick",index)
    },
    backClick(){
      this.$router.back()
    }
  },
  created(){},
}
</script>
<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text)
}
.back{
  text-align: center;
  height: 44px;
  position: relative;
}
.back img{
  width: 20px;
  height: 20px;
  position: absolute;
  top:50%;
  margin-top: -10px;
}
</style>