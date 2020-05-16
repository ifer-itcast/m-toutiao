module.exports = {
  plugins: {
    // 利用 autoprefixer 插件加样式前缀，vue-cli 已经内置了
    // px to rem
    'postcss-pxtorem': {
      // 设计稿宽度的十分之一，750 / 10 = 75，但是 Vant 建议设置成 37.5，因为 Vant 是基于 375 写的
      // 【所以我们在使用 750 设计稿的时候都需要除以 2】
      // 上面比较麻烦！期望，如果是 Vant 的样式就按照 37.5 转换，自己的样式，就按照 75 来转换！
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.includes('vant') ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
