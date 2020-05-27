<template>
  <div class="serach-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- <span @click="searchHistories = []">全部删除</span> -->
        <span @click="$emit('clear-search-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  // prop
  // 普通数据（数字、字符串、布尔值）绝对不能修改，即便改了也不会传给父组件
  // 引用类型（对象，数组），可以修改，例如 push，但不能直接重新赋值
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },

  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
