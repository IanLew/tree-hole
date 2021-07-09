<template>
  <div class="login">
    <div class="login-box">
      <h1>后台管理系统</h1>
      <a-form>
        <a-form-item>
          <a-input
            v-model:value="loginForm.account" 
            auto-complete="off"
            placeholder="请输入账号"
            size="large"
            :maxlength="36">
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-bottom: 10px;">
          <a-input
            v-model:value="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="请输入登陆密码"
            size="large">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="isRecordPwd" disabled>记住密码</a-checkbox>
        </a-form-item>
        <a-form-item class="btns">
          <a-button
            type="primary"
            size="large"
            style="width: 100%;"
            :loading="loading"
            @click="login"
            @pressEnter="login">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { message, Form } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { MD5 } from 'crypto-js'
import { apiLogin } from '../apis'

export default defineComponent({
  name: 'login',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const isRecordPwd = ref(true)  // 记住密码（未实现）
    const loading = ref(false)  // 加载状态
    // 登录表单
    const loginForm = reactive({
			account: null,
			password: null
		})
    // 表单校验
    const rulesRef = reactive({
      account: [{ required: true, message: '请输入账号' }],
      password: [{ required: true, message: '请输入密码' }]
    })
    const { validate } = Form.useForm(loginForm, rulesRef)

    /**
     * 登录
     */
    function login() {
      validate().then(() => {
        loading.value = true
        apiLogin({
          account: loginForm.account,
          password: MD5(loginForm.password).toString()
        }).then((res) => {
          store.commit('user', res)
          loading.value = false
          message.success('登录成功')
          if (route.query.back) {
            router.go(-1)
          } else {
            router.replace({
              name: 'home'
            })
          }
        }).catch(() => {
          loading.value = false
        })
      }).catch(() => {})
    }

    return {
      loading,
      isRecordPwd,
      loginForm,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  height: inherit;
  background: url(http://inews.gtimg.com/newsapp_bt/0/5937865280/1000/0) no-repeat;
  background-size: cover;
  position: relative;
  &::before {
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(10px);
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &-box {
    background-color: #fff;
    width: 450px;
    height: 360px;
    position: absolute;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  h1 {
    color: @color-primary;
    font-size: 30px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .ant-form-horizontal {
    padding-left: 24px;
    padding-right: 24px;
  }
  .anticon {
    color: rgba(0, 0, 0, .3);
    font-size: 16px;
  }
}
</style>
