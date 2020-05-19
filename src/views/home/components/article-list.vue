<template>
  <div>
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: '',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态，是否加载中，显示 loading...
      finished: false, // 为 true 的时候就加载完了不再提示加载更多了
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功'
    }
  },

  methods: {
    async onLoad () {
      // 初始化或滚动到底部的时候会触发 onLoad
      // console.log('onLoad') // 为什么这里会输出 3 次，原因是：初始化的时候触发+不满一屏时触发+提前加载了下一屏
      try {
        // 1. 获取请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          timestamp: this.timestamp || Date.now(), // 简单来说就是请求数据的页码
          // 请求第 1 页数据，应是当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1 代表包含，0 不包含
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('xxx')
        // }
        const { results } = data.data
        // 2. 把请求结果放到 list 数组中
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为 false，loading 关闭以后才能触发下一次的加载更多
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 空，将 finished 设置为 true
          this.finished = true
        }
      } catch (err) {
        // this.$toast('请求失败了')
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      // 下拉刷新的时候触发该函数
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          timestamp: Date.now(), // 下拉刷新每次获取最新数据，所以传递最新时间戳
          with_top: 1
        })
        const { results } = data.data
        // 2. 将数据追加到列表的顶部
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // console.log(err)
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
