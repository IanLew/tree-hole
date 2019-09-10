<template>
  <div id="app" v-wechat-title="$route.meta.title" img-set=" ">
    <router-view/>
    <van-tabbar v-model="active" @change="onCreate">
      <van-tabbar-item icon="home-o" :to="{path: '/', query: { tabbar: 0 }}" replace>森林</van-tabbar-item>
      <van-tabbar-item icon="circle" :to="{path: '/chat', query: { tabbar: 1 }}" replace>树洞</van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" info="5" :to="{path: '/mail', query: { tabbar: 3 }}" replace>信箱</van-tabbar-item>
      <van-tabbar-item icon="hotel-o" :to="{path: '/centre', query: { tabbar: 4 }}" replace>小屋</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      active: 0
    }
  },
  mounted() {
    this.active = this.$route.query.tabbar || this.$store.state.footerTabbarIndex
  },
  methods: {
    onCreate(active) {
      this.$store.commit('footerTabbar')
      if(active == 2) {
        if(this.$store.state.userInfo) {
          this.$router.replace({path: '/create', query: { tabbar: 2 }})
        } else {
          this.$router.replace({path: '/login', query: { tabbar: 2 }})
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
