<template>
  <div class="create">
    <van-popup v-model="showPop" closeable close-icon="close" position="bottom" :style="{ height: '20%' }"></van-popup>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      showPop: true
    }
  }
}
</script>

<style lang="scss" scope>
</style>