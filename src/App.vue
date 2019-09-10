<template>
  <div id="app" v-wechat-title="$route.meta.title" img-set=" ">
    <router-view/>
    <van-tabbar v-model="active" @change="create">
      <van-tabbar-item icon="home-o" :to="{path: '/'}" replace>森林</van-tabbar-item>
      <van-tabbar-item icon="circle" :to="{path: '/chat', query: { in: 1 }}" replace>树洞</van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" info="5" :to="{path: '/mail', query: { in: 3 }}" replace>信箱</van-tabbar-item>
      <van-tabbar-item icon="hotel-o" :to="{path: '/centre', query: { in: 4 }}" replace>小屋</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import parseURL from '@/utils/parseURL'
export default {
  name: 'app',
  data() {
    return {
      active: 0
    }
  },
  mounted() {
    this.active = parseURL().in || this.$route.query.in || 0

    this.create(this.active)
  },
  methods: {
    create(active) {
      if(active == 2) {
        if(this.$store.state.userInfo) {
          this.$router.replace({path: '/create', query: { in: 2 }})
        } else {
          this.$router.replace({path: '/login', query: { in: 2 }})
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';
#app {
  height: 100%;
  padding-bottom: 50px;
}
</style>
