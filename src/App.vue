<template>
  <div id="app" v-wechat-title="$route.meta.title" img-set=" ">
    <router-view/>
    <van-tabbar v-model="active" @change="onCreate">
      <van-tabbar-item icon="home-o" :to="{path:'/'}" replace>森林</van-tabbar-item>
      <van-tabbar-item icon="circle" :to="{path:'/chat',query: {in:1}}" replace>树洞</van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" info="5" :to="{path:'/mail',query:{in:3}}" replace>信箱</van-tabbar-item>
      <van-tabbar-item icon="hotel-o" :to="{path:'/centre',query:{in:4}}" replace>小屋</van-tabbar-item>
    </van-tabbar>
    <van-popup v-model="showCreate" position="bottom" @close="onCreateClose" :overlay="true" :overlay-style="{backgroundColor:'rgba(0,0,0,.3)'}" :style="{height:'30%'}">
      <div class="create flex-c">
        <router-link class="flex-fill flex-c" to="/">
          <!-- <svg class="ico" aria-hidden="true">
            <use :xlink:href="iconName"/>
          </svg> -->
          <div class="info">种树苗</div>
        </router-link>
        <router-link class="flex-fill flex-c" to="/">
          <i class="ico"></i>
          <div class="info">纸飞机</div>
        </router-link>
        <router-link class="flex-fill flex-c" to="/">
          <i class="ico"></i>
          <div class="info">时间囊</div>
        </router-link>
      </div>
    </van-popup>
  </div>
</template>

<script>
import parseURL from '@/utils/parseURL'
export default {
  name: 'app',
  data() {
    return {
      active: 0,
      lastActive: 0,
      showCreate: false
    }
  },
  mounted() {
    this.active = parseURL().in || this.$route.query.in || 0
    this.lastActive = this.active
  },
  methods: {
    onCreate(active) {
      if(active == 2) {
        if(this.$store.state.userInfo) {
          this.showCreate = true
        } else {
          this.showCreate = true
        }
      } else {
        this.lastActive = active
      }
    },
    onCreateClose() {
      this.active = this.lastActive
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';
#app {
  height: 100%;
  padding-bottom: 50px;
}
.create {
  height: 100%;

  .info {
    font-size: 14px;
  }
}
</style>
