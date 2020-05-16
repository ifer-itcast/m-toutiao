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
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
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
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true, message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true, message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },

  methods: {
    async onSubmit (values) {
      // 1. 获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 默认 2000 毫秒，为 0 则持续展示
      })
      // 2. 表单验证
      // 2.1 给 vant-field 组件配置 rules 验证规则
      // 2.2 表单提交的时候会自动触发表单验证，验证通过会触发 submit 事件，验证失败则不会触发 submit 事件
      // 3. 提交数据，请求登录
      try {
        const res = await login(user)
        console.log(res)
        // 任何一个 toast 被调用，都会把之前的 toast 给关闭
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
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
