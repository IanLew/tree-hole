<template>
  <div class="centre">
    <header class="header">
      <van-image lazy-load src="https://dwz.cn/0eZ23t1I" class="bg">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <div class="infos">
        <van-image round lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
        <div class="name van-ellipsis">昵称</div>
        <div class="sign van-ellipsis">签名</div>
        <div class="other">
          <span>0获赞</span>
          <span>0关注</span>
        </div>
      </div>
    </header>
    <van-notice-bar mode="closeable">通知内容</van-notice-bar>
    <div class="items">
      <router-link class="item flex-v-c" to="/">
        <svg-icon iconClass="history" className="icon red"></svg-icon>
        <div class="r flex-fill flex-v-c van-hairline--bottom">
          <span class="flex-fill van-ellipsis">浏览记录</span>
          <svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon>
        </div>
      </router-link>
      <router-link class="item flex-v-c" to="/">
        <svg-icon iconClass="eval" className="icon orange"></svg-icon>
        <div class="r flex-fill flex-v-c van-hairline--bottom">
          <span class="flex-fill van-ellipsis">评论记录</span>
          <svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon>
        </div>
      </router-link>
      <router-link class="item flex-v-c" to="/">
        <svg-icon iconClass="think" className="icon green"></svg-icon>
        <div class="r flex-fill flex-v-c van-hairline--bottom">
          <span class="flex-fill van-ellipsis">动态记录</span>
          <svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon>
        </div>
      </router-link>
      <router-link class="item flex-v-c" to="/">
        <svg-icon iconClass="like" className="icon blue"></svg-icon>
        <div class="r flex-fill flex-v-c van-hairline--bottom">
          <span class="flex-fill van-ellipsis">点赞记录</span>
          <svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon>
        </div>
      </router-link>
      <router-link class="item flex-v-c" to="/">
        <svg-icon iconClass="prison" className="icon black"></svg-icon>
        <div class="r flex-fill flex-v-c van-hairline--bottom">
          <span class="flex-fill van-ellipsis">小黑屋</span>
          <svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon>
        </div>
      </router-link>
    </div>
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

<style lang="scss" scoped>
.header {
  background-color: #174a7d;
  height: 200px;
  position: relative;
  padding: 40px 10px 0;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .infos {
    text-align: center;
    position: relative;
    z-index: 2;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border: #fff solid 1px;
  }
  .name, .sign, .other {
    color: #fff;
    margin-top: 5px;
  }
  .name {
    font-size: 16px;
  }
  .sign, .other {
    font-size: 12px;
  }
  .other span {
    margin-right: 15px;
  }
}
.items {
  padding-left: 10px;
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    &.red {
      color: #f0542d;
    }
    &.blue {
      color: #3a9cff;
    }
    &.orange {
      color: #fdad00;
    }
    &.green {
      color: #07a453;
    }
    &.black {
      color: #171717;
    }
  }
  .item {
    height: 50px;
  }
  .arrow-r {
    width: 10px;
    height: 10px;
    color: #a7a7a7
  }
  .r {
    height: 100%;
    padding-right: 10px;
    & > span {
      color: #000;
    }
  }
}
.van-notice-bar {
  padding: 0 10px;
}
</style>