<template>
  <div id="app" v-wechat-title="$route.meta.title" img-set=" " :class="{'footer-menu-spacing': changeSpacing}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    changeSpacing() {
      return this.$store.state.footerMenuSpacing
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';
#app {
  height: 100%;
}
.footer-menu-spacing {
  padding-bottom: 50px;
}
</style>
