<template>
  <img :src="img" class="img">
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.img {
  min-width: 100%;
}
</style>
