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
        <a-menu-item v-for="item in menus" :key="item.id" @click="$router.push({ path: item.url })">
          <component :is="item.icon"></component>
          <span>{{ item.name }}</span>
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
                <a-breadcrumb :routes="breadcrumbs">
                  <template #itemRender="{ route, routes }">
                    <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.name }}</span>
                    <router-link v-else :to="route.path">{{ route.name }}</router-link>
                  </template>
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
        <router-view :key="$route.fullPath" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'home',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const userinfo = store.getters.userinfo  // 用户信息
    const menus = store.getters.menus  // 有权限的菜单
    const routeOpts = router.options.routes[0].children  // 路由数据
    const breadcrumbs = ref([])  // 面包屑
    const isCollapsed = ref<boolean>(false)  // 收缩侧边栏
    // 选中侧边栏菜单
    const selectedKeys = ref<number[]>([])
    if (menus.length > 0) {
      let path = ''
      const pathNames = route.path.replace(/^\//, '').split('/')
      for(const [k, v] of pathNames.entries()) {
        path = `${path}/${v}`
        if (k === 0) {
          const menu = menus.find((m: any) => m.url === path)
          if (menu) {
            selectedKeys.value = [menu.id]
            breadcrumbs.value.push({
              path,
              name: menu.name
            })
          } else {
            break
          }
        } else {
          const menu = routeOpts.find((m: any) => m.path === path)
          if (menu) {
            breadcrumbs.value.push({
              path,
              name: menu.meta.title
            })
          }
        }
      }
    }

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
      breadcrumbs,
      menus,
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
:deep(.ant-layout-header) {
  .ant-row {
    .ant-row {
      .ant-col {
        & > span {
          & + span {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
.ant-layout-content {
  padding: 16px;
}
</style>
