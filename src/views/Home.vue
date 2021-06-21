<template>
  <a-layout class="home">
    <a-layout-sider v-model:collapsed="isCollapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="">
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-row type="flex" justify="center">
              <a-col>
                <menu-unfold-outlined v-if="isCollapsed" class="collapsed-trigger" @click="() => (isCollapsed = !isCollapsed)" />
                <menu-fold-outlined v-else class="collapsed-trigger" @click="() => (isCollapsed = !isCollapsed)" />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    const isCollapsed = ref(false)

    return {
      isCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  height: inherit;
}
.logo {
  height: 60px;
  margin: 16px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.ant-layout-header {
  background: #fff;
  padding: 0;
}
.ant-row-space-between {
  & > .ant-col > .ant-row > .ant-col {
    padding-left: 16px;
    padding-right: 16px;
  }
}
.collapsed-trigger {
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: @color-primary;
  }
}
</style>