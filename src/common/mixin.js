
import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
    }
  },
  mounted(){
    // 1.图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 这个不能放在created里的原因：在created中this.$refs和document.querySelector拿到的东西都是空的
    
    // 对我们监听的事件做一个保存
    this.itemImgListener = () => {
      //现在加载多少张图片就会刷新多少次，如果使用了防抖函数(debounce)就只需要刷新1次，避免频繁刷新
      // 封装一个函数，里面有一个计时器，让下面的程序等待一会，如果超时才执行
      // this.$refs.scroll.refresh()
      // console.log('-----');
      refresh()
    }
    
    // 3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // 4.测试混入
    console.log('我是混入中的内容');
  }
  
}
export const backTopMixin = {
  data(){
    return{
      isShowBackTop:false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listenShowBackTop(position){
      // 1.判断backTop是否显示
      if(position.y < -800){
        // 让箭头显示
        this.isShowBackTop = true
      }else{
        // 让箭头隐藏
        this.isShowBackTop = false
      }
    },
  }
}