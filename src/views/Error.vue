<template>
  <van-empty :description="message">
    <van-button v-if="buttonText" type="primary" @click="navigationTo">{{ buttonText }}</van-button>
  </van-empty>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'error',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    // 错误信息
    const message: any = ref('页面发生错误')
    if (route.params.pathMatch) {
      message.value = '页面不存在'
    } else if (route.query.message) {
      message.value = route.query.message
    }

    // 按钮文本
    const buttonText = ref('')
    if (route.query.back) {
      buttonText.value = '返回'
    } else if (route.query.code === '401') {
      buttonText.value = '退出登录'
    }

    /**
     * 跳转链接
     */
    function navigationTo() {
      if (route.query.back) {
        router.go(-1)
      } else if (route.query.code === '401') {
        store.commit('user', null)
        router.replace({
          name: 'login'
        })
      }
    }

    return {
      message,
      buttonText,
      navigationTo
    }
  }
})
</script>

<style lang="less" scoped>
</style>
