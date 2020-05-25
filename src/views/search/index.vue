<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
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
    <search-result v-if="isResultShow"/>
    <!-- /搜索结果 -->

    <!-- 搜索提示 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />
    <!-- /搜索提示 -->

    <!-- 搜索记录 -->
    <search-history v-else/>
    <!-- /搜索记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的显示
    }
  },

  methods: {
    onSearch (val) {
      // 敲回车或进行搜索时触发
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
