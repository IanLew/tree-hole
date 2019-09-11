<template>
  <div class="mood">
    <van-nav-bar title="标题" left-arrow @click-left="onBack"/>
    <h1>This is an mood page</h1>
  </div>
</template>

<script>
export default {
  name: 'Mood',
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