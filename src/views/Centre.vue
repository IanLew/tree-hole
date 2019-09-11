<template>
  <div class="centre">
    <h1>This is an centre page</h1>
    <footer-menu></footer-menu>
    <newsroom/>
  </div>
</template>

<script>
import footerMenu from '@/components/FooterMenu'
import newsroom from '@/components/Newsroom'
export default {
  name: 'Centre',
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