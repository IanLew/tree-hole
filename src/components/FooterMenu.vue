<template>
  <van-tabbar v-model="$store.state.footerMenuIndex" :border="false" @change="onCreate">
    <van-tabbar-item to="/" replace>
      <span>森林</span>
      <svg-icon slot="icon" iconClass="forest_info" className="icon"></svg-icon>
    </van-tabbar-item>
    <van-tabbar-item to="/chat" replace>
      <span>回声</span>
      <svg-icon slot="icon" iconClass="tree_hole" className="icon"></svg-icon>
    </van-tabbar-item>
    <van-tabbar-item>
      <svg-icon slot="icon" slot-scope="props" :iconClass="props.active ? 'send_letter' : 'send_letter'" className="icon2"></svg-icon>
    </van-tabbar-item>
    <van-tabbar-item info="" to="/mail" replace>
      <span>信箱</span>
      <svg-icon slot="icon" iconClass="message_box" className="icon"></svg-icon>
    </van-tabbar-item>
    <van-tabbar-item to="/centre" replace>
      <span>小屋</span>
      <svg-icon slot="icon" iconClass="mine_setting" className="icon"></svg-icon>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getParamsByReg, getPathIndex } from '@/utils/url'
export default {
  name: 'FooterMenu',
  data() {
    return {
      icon: {
        normal: 'forest_message',
        active: 'forest_message'
      }
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
.icon {
  width: 18px;
  height: 18px;
}
.icon2 {
  width: 26px;
  height: 26px;
}
</style>
