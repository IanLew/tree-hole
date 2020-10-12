<template>
  <div class="main">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in menus"
        :to="item.to"
        :icon="item.icon"
        :key="index"
      >{{ item.name }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'Main',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
    }
  },
  setup () {
    const { ctx } = getCurrentInstance();
    const route = ctx.$router.currentRoute.value;
    
    const menus = [
      { to: {name: 'Home' }, icon: 'home-o', name: '首页' },
      { to: {name: 'Circle' }, icon: 'circle', name: '树洞' },
      { to: {name: 'Mine' }, icon: 'contact', name: '我的' }
    ];

    let active = menus.findIndex(v => v.to.name === route.name);
    active = active >= 0 ? active : 0

    return {
      menus,
      active
    };
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main {
  & > .wrapper {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>