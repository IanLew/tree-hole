<template>
  <div class="test">测试</div>
  <van-tabbar v-model="activeMenu">
    <van-tabbar-item icon="home-o">树洞</van-tabbar-item>
    <van-tabbar-item icon="chat-o" badge="99+">消息</van-tabbar-item>
    <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    const activeMenu = ref(0)

    return {
      activeMenu
    }
  }
})
</script>

<style lang="less" scoped>
.test {
  font-size: 75px;
}
</style>
