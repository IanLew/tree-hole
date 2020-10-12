<template>
  <div class="error">
    <van-empty image="network" :description="$route.query.message || '页面错误'">
      <van-button 
        v-if="$route.query.code"
        round 
        type="danger" 
        class="bottom-button" 
        @click="$router.back"
      >返回页面</van-button>
    </van-empty>
  </div>
</template>

<script>
import { Empty, Button } from 'vant';

export default {
  name: 'Error',
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.bottom-button {
  width: 120px;
  height: 40px;
}
</style>