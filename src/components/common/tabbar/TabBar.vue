<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>
<style scoped>
  #tab-bar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    /* box-shadow: 右移 下移 模糊程度 颜色及透明度; */
    box-shadow: 0px -1px 5px rgba(100, 100, 100, .2);
  }
</style>