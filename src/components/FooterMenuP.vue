<template>
  <van-tabbar v-model="active" @change="onCreate">
    <van-tabbar-item icon="home-o" :to="{path:'/'}" replace>森林</van-tabbar-item>
    <van-tabbar-item icon="circle" :to="{path:'/chat',query: {in:1}}" replace>树洞</van-tabbar-item>
    <van-tabbar-item icon="add-o"></van-tabbar-item>
    <van-tabbar-item icon="newspaper-o" info="5" :to="{path:'/mail',query:{in:3}}" replace>信箱</van-tabbar-item>
    <van-tabbar-item icon="hotel-o" :to="{path:'/centre',query:{in:4}}" replace>小屋</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getParamsByReg } from '@/utils/url'
export default {
  name: 'FooterMenu',
  data() {
    return {
      active: 0,
      lastActive: 0
    }
  },
  mounted() {
    this.active = getParamsByReg().in || this.$route.query.in || 0
    this.lastActive = this.active
    
    this.$store.commit('footerMenu', true)
  },
  beforeDestroy() {
    this.$store.commit('footerMenu', false)
  },
  methods: {
    onCreate(active) {
      if(active == 2) {
        this.active = this.lastActive
        if(this.$store.state.userInfo) {
          this.$store.commit('newsroom', true)
        } else {
          this.$store.commit('newsroom', true)
        }
      } else {
        this.lastActive = this.active
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create {
  height: 100%;
  .flex-c {
    flex-direction: column;
  }
  .icon {
    width: 25px;
    height: 25px;
    margin-bottom: 10px;
  }
  .text {
    font-size: 14px;
  }
}
</style>
