<template>
  <div class="wrapper">
    <!-- 1.无论是否设置click:true,botton都能点击 -->
      <button @click="btnClick">按钮</button>
    <!-- 2.必须设置click:true,div才能点击 -->
      <!-- <div @click="divClick">呵呵呵</div> -->
    <ul class="content">
      
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Category',
  created(){
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3,
      pullUpLoad:true,
      click:false
    })
    this.scroll.on('scroll',(position) =>{
      console.log(position);
    })
    this.scroll.on('pullingUp',() =>{
      console.log('上拉加载更多');
      setTimeout(() => {
        this.scroll.finishPullUp()
      },2000)
    })
  },
  methods:{
    btnClick(){
      console.log('click');
      
    }
  }
}
</script>
<style scoped>
.wrapper{
  height: 150px;
  background-color: aqua;
  overflow: hidden;
  /* overflow: scroll */
}
</style>