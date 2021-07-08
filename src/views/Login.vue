<template>
  <van-nav-bar
    title="登录"
    left-text="返回"
    right-text="注册"
    left-arrow
    :border="false"
    @click-left="() => $router.go(-1)"
    @click-right="$router.push({ name: 'register' })" />
  <van-form @submit="login">
    <van-cell-group inset :border="false">
      <van-field
        v-model="loginForm.account"
        name="account"
        label="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
        @input="(e) => (loginForm.account = e.target.value.replace(/\s*/g, ''))" />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]" />
      <van-field name="checkbox" :border="false">
        <template #input>
          <van-checkbox v-model="isRecord" shape="square" :disabled="true">记住密码</van-checkbox>
        </template>
        <template #button>
          <van-button size="small" class="retrieve" :to="{ name: 'retrieve' }">忘记密码?</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 13.333vw 4.267vw 0;">
      <van-button
        round
        block
        type="primary"
        native-type="submit" 
        :loading="loading">登录</van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { Notify } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { MD5 } from 'crypto-js'
import { apiLogin } from '../apis'

export default defineComponent({
  name: 'login',
  setup() {
    const router = useRouter()
    const store = useStore()

    const isRecord = ref(true)  // 是否记录密码（未实现）
    const loading = ref(false)  // 加载状态
    // 登录表单
    const loginForm = reactive({
      account: '',
      password: ''
    })

    /**
     * 登录
     */
    function login(v: any) {
      loading.value = true
      apiLogin({
        account: v.account,
        password: MD5(v.password).toString()
      }).then((res) => {
        store.commit('user', res)
        loading.value = false
        Notify({
          type: 'success',
          message: '登录成功'
        })

        router.go(-1)
      }).catch(() => {
        loading.value = false
      })
    }

    return {
      loading,
      isRecord,
      loginForm,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 50px;
}
.van-checkbox {
  --van-checkbox-size: 15px;
}
.retrieve {
  border: none;
  --van-button-small-font-size: 14px;
}
</style>
