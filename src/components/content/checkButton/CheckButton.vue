<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.png" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  components:{},
  props:{
    isChecked:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  methods:{},
  created(){},
}
</script>
<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #999;
}
.check-button img{
  width: 14px;
  height: 14px;
}
.check {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>