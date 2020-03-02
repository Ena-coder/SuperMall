<template>
<!-- @click="backClick" -->
  <div class="back-top">
    <img src="~assets/img/common/back-top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  methods:{
    // backClick(){
    //   console.log('click');
    //   this.$emit('backClick')
    // }
  },
  created(){},
}
</script>
<style scoped>
.back-top{
  background-color: #fff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  position: fixed;
  bottom: 100px;
  right: 30px;
}
.back-top img{
  height: 30px;
  width: 30px;
}
</style>