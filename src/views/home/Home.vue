<template>
  <div id="home">
    <!-- Home.vue是一个大管家，只是把子组件标签放在这里，子组件具体如何封装都放在home的childComps文件里 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
    :titles="['流行','新款','精选']" 
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control"
    v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"  
            @scroll="contentScroll"
            :pull-up-load='true' 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageload='swiperImageload'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl"></tab-control>
      <goods-list :goods="showList"></goods-list>
    </scroll>
    <!-- @backClick="backClick" -->
    <!-- 组件是不能像原生标签一样直接监听点击，如果想要直接监听点击.native——监听组件根元素的原生事件 -->
    <!-- <back-top @click="backClick"></back-top> -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
// 方法
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name:'Home',
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed:{
    showList(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  activated(){//进入时
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    // 进来时滚动到以保存的位置后，刷新一次
    this.$refs.scroll.refresh()
  },
  deactivated(){//离开时
  // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件的监听
    // this.$bus.$off('itemImageLoad')//不能只传一个事件，因为这样会让所有页面都取消监听这个事件
    // this.$bus.$off('函数名'，函数体)
    this.$bus.$off('itemImageLoad',this.itemImgListener)
    
  },
  // 什么时候发送网络请求？当组件已创建好就发送
  created(){//在created里只写主要逻辑，具体逻辑在methods里定义
  
    // 1.请求多个数据——异步操作
    this.getHomeMultidata()
    // console.log(this.result);//返回null，因为这时异步操作，this.result还未获取就打印了
    // 2.请求商品数据——组件一创建完成就执行getHomeGoods方法三次，每次都是请求不同的页面的第1页数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // this.$bus.$on('itemImageLoad',() => {
    //   this.$refs.scroll.refresh()
    // })
  },
  mixins:[itemListenerMixin,backTopMixin],
  mounted(){
    // // 1.图片加载完成事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,200)
    // // 这个不能放在created里的原因：在created中this.$refs和document.querySelector拿到的东西都是空的
    
    // // 对我们监听的事件做一个保存
    // this.itemImgListener = () => {
    //   //现在加载多少张图片就会刷新多少次，如果使用了防抖函数(debounce)就只需要刷新1次，避免频繁刷新
    //   // 封装一个函数，里面有一个计时器，让下面的程序等待一会，如果超时才执行
    //   // this.$refs.scroll.refresh()
    //   // console.log('-----');
    //   refresh()
    // }
    
    // // 3.监听item中图片加载完成
    
    // this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  methods:{
    /* 
     *网络请求相关代码
     */
    // 对方法进行有一层封装
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        // 函数执行：获取数据，函数执行完：数据被释放，所以在这个函数执行完前将数据保存起来
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        // res => 拿到pop的前30条数据 page = 1，所以如果要监听加载更多，就可以直接使用这个方法取得第2页
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    /* 
     *事件监听相关代码
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    contentScroll(position){
      // 1.判断backTop是否显示
      this.listenShowBackTop(position)
      // 2.决定tab-control是否吸顶(position：fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 怎么做到给对应类型加载更多呢？
    loadMore(){
      this.getHomeGoods(this.currentType)
      // 当图片加载完，刷新可滚动区域
      // this.$refs.scroll.scroll.refresh()
    },
    // func是超时后执行的程序,delay是计时器的时间
    swiperImageload(){
    // 获取tabControl的offsetTop
    // this.$refs.tabControl没有offsetTop属性，元素才有，那怎样那元素呢？
    // console.log(this.$refs.tabControl.offsetTop);//undefined
    // 所有组件都有一个属性$el:这个属性用于获取组件中的元素
    // console.log(this.$refs.tabControl);//VueComponent
    // console.log(this.$refs.tabControl.$el);//<div class='tab-control'>...</div>
    // console.log(this.$refs.tabControl.$el.offsetTop);//51,这个高度是错误的，因为页面中的图片还没有加载完，所以计算出来的高度比实际要小
    // 那就要先监听图片加载完，在计算。如何监听图片加载完？
    // 分析：在tabControl之上的图片中影响力最大的是轮播图，所以要监听轮播图加载完
    // console.log(this.$refs.tabControl.$el.offsetTop);//596
    
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // 监听滚动,动态改变tab-control的样式
    }
  }
  
}

</script>
<style scoped>
  /* padding-top: 44px; */
  /* 100vh是100%视图高度view-height */
#home{
  position: relative;
  height: 100vh;
}
  /* 原生滚动时使用 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100; */
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
  /* 正常情况下是position: sticky;当滚动达到的某个值时，会自动变成position: fix; */
/* .tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content{
  position: absolute;
  top:44px;
  bottom:49px;
  overflow: hidden;
}
/* .content{
  100%是相对于父级元素home的高度-（home-nav导航44px + main-tab-bar49px）
  height: calc(100% - 49px);
  overflow: hidden;
} */
.tab-control{
  position: relative;
  z-index: 9;
  margin-top: -.5px;
}
</style>