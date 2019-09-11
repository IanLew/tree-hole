<template>
  <van-tabbar v-model="$store.state.footerMenuIndex" @change="onCreate">
    <van-tabbar-item icon="home-o" to="/" replace>森林</van-tabbar-item>
    <van-tabbar-item icon="circle" to="/chat" replace>回声</van-tabbar-item>
    <van-tabbar-item icon="add-o"></van-tabbar-item>
    <van-tabbar-item icon="newspaper-o" info="" to="/mail" replace>信箱</van-tabbar-item>
    <van-tabbar-item icon="hotel-o" to="/centre" replace>小屋</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getParamsByReg, getPathIndex } from '@/utils/url'
export default {
  name: 'FooterMenu',
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('activeFooterMenu', getPathIndex())
    this.$store.commit('fixFooterMenu', true)
  },
  beforeDestroy() {
    this.$store.commit('fixFooterMenu', false)
  },
  methods: {
    onCreate(active) {
      if(active == 2) {
        if(this.$store.state.userInfo) {
          this.$store.commit('newsroom', true)
        } else {
          this.$store.commit('newsroom', true)
        }
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
