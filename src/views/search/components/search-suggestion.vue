<template>
  <div class="serach-suggestion">
    <van-cell
      v-for="(text, index) in suggustions"
      :key="index"
      :title="text"
      icon="search"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggustions: [] // 搜索提示、建议列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数，handler 函数是固定的，不是瞎写的
      // handler (val) {
      //   this.loadSearchSuggestion(val)
      // },
      // 防抖：持续触发不执行，不触发的一段时间后才执行
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggustions = data.data.options
      } catch (error) {
        console.log(error)
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
