<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 数组或对象的默认值，要通过 function 给
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoad()
  },
  methods: {
    // 评论测试：http://localhost:8080/#/article/137825
    // 获取文章的评论，和获取评论的回复是同一个接口，唯一的区别是请求参数不一样（type 和 source）
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, // 评论类型 a-对文章的评论，c-对评论的评论
          source: this.source.toString(), // 文章 id 或评论 id
          offset: this.offset, // 获取下一页数据的标记
          limit: this.limit// 每次获取数据数量
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)
        // 3. 将 loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 4.1 有就更新页码并获取数据
          this.offset = data.data.last_id
        } else {
          // 4.2 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
