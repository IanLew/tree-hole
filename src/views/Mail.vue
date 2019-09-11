<template>
  <div class="mail">
    <h1>This is an mail page</h1>
    <newsroom/>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import footerMenu from '@/components/FooterMenu'
import newsroom from '@/components/Newsroom'
export default {
  name: 'mail',
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