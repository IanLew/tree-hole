<template>
  <div class="login">
    <div class="login-box">
      <h1>后台管理系统</h1>
      <a-form :model="loginForm">
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
          <a-checkbox v-model:checked="isRecordPwd">记住密码</a-checkbox>
        </a-form-item>
        <a-form-item class="btns">
          <a-button
            type="primary"
            size="large"
            style="width: 100%;"
            @click="login"
            @pressEnter="login">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'login',
  setup() {
    const router = useRouter()

    const isRecordPwd = ref(false)
    const loginForm = reactive({
			account: null,
			password: null
		})

    // 登录
    function login() {
      router.push({ name: 'home' })
    }

    return {
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
