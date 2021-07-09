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
                <a-avatar src="">
                  <template #icon>
                    <user-outlined />
                  </template>
                </a-avatar>
                <span>{{ userinfo.nickname || userinfo.account }}</span>
                <!-- <a-dropdown trigger="hover">
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
                      <a-menu-item @click="logout">
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
                    <span>{{ userinfo.nickname || userinfo.account }}</span>
                  </div>
                </a-dropdown> -->
              </a-col>
              <a-col @click="logout">
                <export-outlined />
                <span>退出登录</span>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'home',
  setup() {
    const router = useRouter()
    const store = useStore()
    const userinfo = store.getters.userinfo

    const isCollapsed = ref(false)  // 收缩侧边栏
    const selectedKeys = ref([])  // 选中侧边栏菜单

    /**
     * 退出登录
     */
    function logout() {
      store.commit('user', null)
      router.push({
        name: 'login',
        query: {
          back: 1
        }
      })
    }

    return {
      isCollapsed,
      selectedKeys,
      userinfo,
      logout
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
// .user {
//   &>span {
//     display: inline-block;
//     vertical-align: middle;
//   }
//   .ant-avatar+span {
//     max-width: 80px;
//     margin-left: 5px;
//     .ellipsis();
//   }
// }
:deep(.ant-layout-header) {
  .ant-row {
    .ant-row {
      .ant-col {
        span {
          & + span {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
