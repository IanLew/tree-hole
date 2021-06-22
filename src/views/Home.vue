<template>
  <a-layout class="home">
    <a-layout-sider
      v-model:collapsed="isCollapsed"
      :trigger="null"
      width="160"
      collapsible>
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <inbox-outlined />
          <span>Option 3</span>
        </a-menu-item>
      </a-menu>
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
              <a-col>
                <a-breadcrumb>
                  <a-breadcrumb-item>Home</a-breadcrumb-item>
                  <a-breadcrumb-item>Option 1</a-breadcrumb-item>
                </a-breadcrumb>
              </a-col>
            </a-row>
          </a-col>
          <a-col>
            <a-row type="flex" justify="center">
              <a-col>
                <a-dropdown trigger="hover">
                  <template #overlay>
                    <a-menu model="inline" class="setting-menu">
                      <a-menu-item>
                        <user-outlined />
                        <span>个人信息</span>
                      </a-menu-item>
                      <a-menu-item>
                        <setting-outlined />
                        <span>系统设置</span>
                      </a-menu-item>
                      <a-menu-item>
                        <export-outlined />
                        <span>退出登录</span>
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <div class="user">
                    <a-avatar src="">
                      <template #icon>
                        <user-outlined />
                      </template>
                    </a-avatar>
                    <span>administrator</span>
                  </div>
                </a-dropdown>
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
    const selectedKeys = ref([])

    return {
      isCollapsed,
      selectedKeys
    }
  }
})
</script>

<style lang="less" scoped>
// 最新版菜单收缩后会显示图标
:global(.ant-tooltip .anticon) {
  display: none;
}
.home {
  height: inherit;
}
.logo {
  height: 32px;
  margin: 16px;
  &>img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.ant-layout-header {
  background: #fff;
  padding: 0;
}
.setting-menu {
  text-align: center;
}
.ant-row-space-between {
  &>.ant-col>.ant-row>.ant-col {
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
  }
}
.collapsed-trigger {
  font-size: 20px;
  &:hover {
    color: @color-primary;
  }
}
.collapsed-trigger,
.ant-breadcrumb {
  display: inline-block;
  vertical-align: middle;
}
.user {
  &>span {
    display: inline-block;
    vertical-align: middle;
  }
  .ant-avatar+span {
    max-width: 80px;
    margin-left: 5px;
    .ellipsis();
  }
}
</style>
