<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    />
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        left-icon="smile-o"
        v-model="user.mobile"
        name="手机号"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',

  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },

  methods: {
    async onSubmit (values) {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 3. 提交数据，请求登录
      try {
        const res = await login(user)
        console.log(res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍后重试', err)
        }
      }
      // 4. 根据响应结果做相应的操作
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .iconfont{
    font-size: 37px;
  }
  .send-sms-btn{
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
