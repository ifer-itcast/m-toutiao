<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view/>
    <!-- /子路由出口 -->
    <!-- 标签导航栏 -->
    <!-- 开启 route 模式，v-modle 绑定的 active 就没用了，因为是依赖 route 进行激活的 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style scoped lang='less'>
.layout-container {
  .layout-tabbar {
    .iconfont {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
