<template>
  <a-config-provider :locale="zhCN" :getPopupContainer="getPopupContainer">
    <router-view :key="$route.fullPath" />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default defineComponent({
  name: 'App',
  data() {
    return {
      zhCN
    }
  },
  methods: {
    getPopupContainer(el, dialogContext) {
      return dialogContext ? dialogContext.getDialogWrap() : document.body
    }
  }
})
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}
#app {
  height: inherit;
}
</style>