<template>
  <div class="letter">
    <van-nav-bar title="标题" left-arrow @click-left="onBack"/>
    <h1>This is an letter page</h1>
  </div>
</template>

<script>
export default {
  name: 'Letter',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scope>
</style>