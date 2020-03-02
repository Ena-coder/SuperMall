<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  components:{},
  props:{
    // message:{
    //   type:String,
    //   default(){
    //     return ''
    //   }
    // },
    // isShow:{
    //   type:Boolean,
    //   default(){
    //     return true
    //   }
    // }
  },
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  computed:{},
  methods:{
    show(message,duration=1500){
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
      },duration)
    }
  },
  created(){},
}
</script>
<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  
  padding: 20px 10px ;

  background-color: rgba(0, 0, 0, .75);
  text-align: center;
  color: aliceblue;
  border-radius: 5px;
}
</style>