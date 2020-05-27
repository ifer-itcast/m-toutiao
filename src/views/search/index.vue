<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 搜索提示 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /搜索提示 -->

    <!-- 搜索记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    />
    <!-- /搜索记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {},
  watch: {
    // searchHistories: {
    //   handler () {}
    // }
    // 上面的简写
    searchHistories (val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val) // val 是监视到的最新数据
    }
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录
    }
  },

  methods: {
    onSearch (val) {
      // 敲回车或者点击搜索联想列表时触发
      this.searchText = val // 更新文本框内容
      this.isResultShow = true // 渲染搜索结果

      // 要求：不要有重复历史记录，最新的排在最前面
      const flag = this.searchHistories.includes(val)
      if (!flag) {
        this.searchHistories.unshift(val) // 存储搜索历史记录
      }
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
