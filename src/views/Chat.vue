<template>
  <div class="chat">
    <h1>This is an chat page</h1>
    <newsroom/>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import footerMenu from '@/components/FooterMenu'
import newsroom from '@/components/Newsroom'
export default {
  name: 'chat',
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

<style lang="scss" scoped>
</style>