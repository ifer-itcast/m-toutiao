<template>
  <!-- :class="{collected: value}" -->
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :color="value ? '#ffa500': '#777'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },

  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，那就取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没有收藏，那就添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        // this.value 的改变不是立即的，所以下面使用了 !this.value
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
.collected {
    color: #ffa500
}
</style>
