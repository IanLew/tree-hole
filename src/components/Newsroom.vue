<template>
  <van-popup v-model="$store.state.newroomSwitch" position="bottom" @close="onRoomClose" :overlay="true" :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}" :style="{height:'20%'}">
    <div class="create flex-c">
      <router-link class="flex-fill flex-c" to="/">
        <svg-icon iconClass="write_letter" className="icon"></svg-icon>
        <div class="text">种树苗</div>
      </router-link>
      <router-link class="flex-fill flex-c" to="/">
        <svg-icon iconClass="paper_plane" className="icon"></svg-icon>
        <div class="text">纸飞机</div>
      </router-link>
      <router-link class="flex-fill flex-c" to="/">
        <svg-icon iconClass="time_capsule" className="icon"></svg-icon>
        <div class="text">时间囊</div>
      </router-link>
    </div>
  </van-popup>
</template>

<script>
import { getPathIndex } from '@/utils/url'
export default {
  name: 'Newsroom',
  data() {
    return {
    }
  },
  beforeDestroy() {
    this.$store.commit('newsroom', false)
  },
  methods: {
    onRoomClose() {
      this.$store.commit('activeFooterMenu', getPathIndex())
      this.$store.commit('newsroom', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create {
  height: 100%;
  .flex-c {
    flex-direction: column;
  }
  .icon {
    width: 25px;
    height: 25px;
    margin-bottom: 10px;
  }
  .text {
    font-size: 14px;
  }
}
</style>
