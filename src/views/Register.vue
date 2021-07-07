<template>
  <van-nav-bar
    title="注册"
    left-text="返回"
    left-arrow
    :border="false"
    @click-left="() => $router.go(-1)" />
  <van-form ref="registerRef" @submit="register">
    <van-cell-group inset :border="false">
      <van-field
        v-model="registerForm.account"
        name="account"
        label="账号"
        placeholder="请输入邮箱作为账号"
        :rules="[
          { required: true, message: '请输入账号' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入有效的邮箱' }
        ]"
        @input="(e) => (registerForm.account = e.target.value.replace(/[^a-zA-Z0-9_\-\.@]+/g, ''))" />
      <van-field
        v-model="registerForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        maxlength="26"
        :rules="[
          { required: true, message: '请输入密码' },
          { validator: validatePassword }
        ]" />
      <van-field
        v-model="registerForm.reEnter"
        type="password"
        name="reEnter"
        label="重复密码"
        placeholder="密码"
        maxlength="26"
        :rules="[
          { required: true, message: '请再次输入密码' },
          { validator: validateReEnter }
        ]" />
    </van-cell-group>
    <div style="margin: 13.333vw 4.267vw 0;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="loading">注册</van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { Notify } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MD5 } from 'crypto-js'
import { apiRegister } from '../apis'

export default defineComponent({
  name: 'register',
  setup() {
    const router = useRouter()

    const loading = ref(false)
    const registerRef = ref()
    const registerForm = reactive({
      account: '',
      password: '',
      reEnter: ''
    })

    function validatePassword(value: any) {
      if (value) {
        if (value.length < 6) {
          return '密码过于简单'
        } else if (value === registerForm.reEnter) {
          return true
        } else {
          registerRef.value.validate('reEnter')
        }
      } else {
        return '请输入密码'
      }
    }

    function validateReEnter(value: any) {
      if (value) {
        if (value === registerForm.password) {
          return true
        } else {
          return '两次输入的密码不一致'
        }
      } else {
        return '请再次输入密码'
      }
    }

    function register(value: any) {
      loading.value = true
      apiRegister({
        account: value.account,
        password: MD5(value.password).toString(),
        identity: 1
      }).then(() => {
        loading.value = false
        Notify({
          type: 'success',
          message: '注册成功'
        })
        router.go(-1)
      }).catch(() => {
        loading.value = false
      })
    }

    return {
      loading,
      registerRef,
      registerForm,
      validatePassword,
      validateReEnter,
      register
    }
  }
})
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 50px;
}
</style>
