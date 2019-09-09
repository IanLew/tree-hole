<template>
  <div id="app" v-wechat-title="$route.meta.title" img-set=" ">
    <router-view/>
    <van-tabbar v-model="active" @change="onCreate">
      <van-tabbar-item icon="home-o" to="/" replace>森林</van-tabbar-item>
      <van-tabbar-item icon="circle" to="/chat" replace>树洞</van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" info="5" to="/mail">信箱</van-tabbar-item>
      <van-tabbar-item icon="hotel-o" to="/centre">小屋</van-tabbar-item>
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
  methods: {
    onCreate(active) {
      if(active == 2) {
        if(this.$store.state.userInfo) {
          this.$router.replace('create')
        } else {
          this.$router.replace('login')
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
