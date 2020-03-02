<template>
<!--  ref绑定在子组件上，那么this.$refs.refname获取到的是一个组件对象
      ref绑定在普通元素上，那么this.$refs.refname获取到的是一个普通元素
 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  components:{},
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  computed:{},
  methods:{
    // time=300是默认值，如果没有传入该参数就默认赋值300
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('-------');//只出现一次
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  created(){},
  mounted(){//一旦东西被挂在，创建一个滚动窗口
  // 通过document.querySelector(".wrapper")拿到的标签可能不是想要的，因为如果在多个组件中都有class='wrapper'的标签，document.querySelector(".wrapper")拿到的就是第一个有class='wrapper'标签，按这个道理，它会拿到app.vue里面的有class='wrapper'的标签，但是我们需要的是Home.vue里面的有class='wrapper'的标签
    // this.scroll = new BScroll(document.querySelector(".wrapper"),{})
    // 在vue里如果明确的想要拿到一个标签，绑定一个ref属性
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
    })
    // console.log(this.scroll);
    
    // 2.监听滚动位置
    if(this.probeType == 2 || this.probeType == 3){
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    }
    // 3.监听滚到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
    // 3.监听上拉加载更多
    // this.scroll.on('pullingUp',()=>{
    //   // console.log('上拉加载更多');
    //   // setTimeout(()=> {
    //   //   this.scroll.finishPullUp()
    //   // },2000)
    //   // 不是在当前响应，而是去调用的页面响应
    //   this.$emit('pullingUp')
    // })
  }
}

// 在style中加scoped属性，意味着这里的style只会在这个作用域中起作用
</script>
<style scoped>
</style>