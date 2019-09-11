<template>
  <div class="home" v-wechat-title="$route.meta.title" img-set=" ">
    <h1>This is an home page</h1>
    <newsroom/>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import footerMenu from '@/components/FooterMenu'
import newsroom from '@/components/Newsroom'
export default {
  name: 'home',
  components: {
    newsroom,
    'footer-menu': footerMenu
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scope>
</style>