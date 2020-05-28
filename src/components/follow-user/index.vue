<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="isFollowed"
    @click="onFollow"
    :loading="loading"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      this.loading = true // 展示按钮的 loading 状态
      try {
        if (this.isFollowed) {
          // 那就取消关注
          await deleteFollow(this.userId)
        } else {
          // 那就添加关注
          await addFollow(this.userId)
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('updateFollowed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
