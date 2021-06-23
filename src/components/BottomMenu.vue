<template>
  <van-tabbar v-model="activeMenu" route>
    <van-tabbar-item icon="home-o" :to="{name: 'home'}">树洞</van-tabbar-item>
    <van-tabbar-item icon="add-o" @click="() => (showCreate = true)">创建</van-tabbar-item>
    <van-tabbar-item icon="user-o" :to="{name: 'my'}">我的</van-tabbar-item>
  </van-tabbar>
  <van-action-sheet v-model:show="showCreate" title="创建消息">
    <div class="create-message">
      <van-field
      label="类型"
      model-value=""
      placeholder="请选择类型"
      readonly
      @click="() => (showCreateType = true)" />
    </div>
  </van-action-sheet>
  <van-popup
    v-model:show="showCreateType"
    :safe-area-inset-bottom="true"
    round
    position="bottom">
    <van-picker
      title="选择创建类型"
      :columns="typeCols"
      @cancel="() => (showCreateType = false)"
      @confirm="() => (showCreateType = false)" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'bottom-menu',
  setup() {
    const activeMenu = ref(0)
    const showCreate = ref(false)
    const showCreateType = ref(false)
    const typeCols = ['树洞', '纸飞机']

    return {
      activeMenu,
      showCreate,
      showCreateType,
      typeCols
    }
  }
})
</script>

<style lang="less" scoped>
.create-message {
  min-height: 260px;
}
</style>
