<template>
  <div class="create">
    <van-popup v-model="show" position="bottom" :overlay="true" :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}" :style="{height:'40%'}"/>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>