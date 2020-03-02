<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <!-- 在html中属性名例如:top-images一定要不能使用驼峰写法，但是方法名例如@titleClick则使用驼峰写法 -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shops"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="detailParamInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="detailCommentInfo"></detail-comment-info>
      <goods-list :goods="recommends" ref="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message='message' :is-show='isShow'></toast> -->
  </div>
</template>

<script>
// 公共组件
import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'
import GoodsList from 'components/content/goods/GoodsList'
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
// 方法
import {getDetail,Goods,Shop,GoodParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {mapActions} from 'vuex'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailCommentInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  props:{},
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // message:'',
      // isShow:false
    }
  },
  computed:{},
  mixins:[itemListenerMixin,backTopMixin],
  methods:{
    ...mapActions(['addCart']),
  
    imageLoad(){
      // 刷新
      // 1.通过ref拿到需要刷新的Scroll组件标签
      this.$refs.scroll.refresh()
      /* 
      // 第三次获取：值正确，但有性能问题
      // 当所有图片加载完才获取就能保证数据一定正确。但出现了影响性能的问题，因为多次刷新，所以也会多次执行下面代码
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
        console.log(this.themeTopYs); */
        
      // 第四次获取：值正确，但有性能问题
        this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    // 监听滚动位置
    contentScroll(position){
      // 1.获取Y值
      const positionY = -position.y
      let length = this.themeTopYs.length  
      // hack方法：[0, 3207, 3673, 3941, 1.7976931348623157e+308]
      for(let i = 0; i < length-1; i++){
        if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.index = this.currentIndex;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 普通方法：
      // for(let i = 0; i < length; i++){
      // 2.positionY和主题offsettop值进行对别[0, 3207, 3673, 3941]
      //   // console.log(0+i);//打印出来的是字符串
      // //   // 将字符串数字转化成数字类型方法：
      // //   // 法一：*1；法二：parseInt()
      // //   // if(positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1]){
      // //   //   console.log(i);//0...1...2...
      // //   //   this.index = i;
      // //   // }//拿不到3，因为当positionY在推荐区域内时，positionY < this.themeTopYs[parseInt(i)+1]的值为undefined
        
      //   //分两种情况：
      //   if((this.currentIndex !== i) && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i])){
      //     this.currentIndex = i
          
      //     this.index = this.currentIndex;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
       // 2.判断backTop是否显示
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      
    // 2.将商品添加到购物车里（1.promis2.mapActions）
    // this.$store.cartList.push(product)可以但不可行，修改state任何东西都要通过mutation
    // this.$store.commit('addCart',product)
    //vuex重构
    // this.$store.dispatch('addCart',product).then(res => console.log(res))
    this.addCart(product).then(res => {
      // this.isShow = true
      // this.message = res
      // setTimeout(() => {
      //   this.isShow = false
      // },1000)
      
      this.$toast.show(res)
    })
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 把获取到的数据分离：
      const data = res.result;
      // 1.获取顶部的图片轮播图
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 3.创建店铺信息的对象
      this.shops = new Shop(data.shopInfo)
      // 4.展示商品具体图片
      this.detailInfo = data.detailInfo
      // 5.获取参数信息
      this.paramInfo = new GoodParam(data.itemParams.info,data.itemParams.rule)
      // 6.取出评论信息
      if(data.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      /* 
        // 第一次获取：值为undefined
        //因为this.$refs.detailParamInfo.$el压根没有渲染
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
        console.log(this.themeTopYs);
      // 第二次获取：值不对
      // 虽然能100%获取到值，但这里的值已然有可能不对，因为这个函数根据最新的数据，对应的DOM已经被渲染出来，但是图片还没有加载完
      this.$nextTick(() => {
      // 当组件渲染完才获取元素，当渲染完会执行nextTick(),在该函数内执行下面代码就能保证$el有值不是undefined
        this.themeTopYs.push(0);
        // console.log(this.$refs.detailParamInfo.$el);
        //上述语句执行结果：<!---->
        this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
        console.log(this.themeTopYs);
      }) */
    }),
    // 3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
    // 图片防抖
    this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
        this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
    },500)
  },
  mounted(){
  // this.themeTopYs.push(0);
  // console.log(this.$refs.detailParamInfo.$el);
  //上述语句执行结果：<!---->在这里无法获取，去updated！
  // this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
  // this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
  // this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);

  //   // 1.图片加载完成事件监听
  //   const refresh = debounce(this.$refs.scroll.refresh,200)
  //   this.itemImgListener = () => {
  //     refresh()
  //   }
  //   this.$bus.$on('itemImageLoad',this.itemImgListener)
  // },
  // destroyed(){
  //   this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  updated(){//保证一定有值
    // this.themeTopYs = []
    // this.themeTopYs.push(0);
    // // console.log(this.$refs.detailParamInfo.$el);
    // //上述语句执行结果：<!---->
    // this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop);
    
    // console.log(this.themeTopYs);
  }
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 58px);
}
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>