<template>
  <header class="header">
    <div class="message">
      <van-button type="primary" size="normal" :to="{name: 'message'}">
        <template #icon>
          <van-badge dot>
            <van-icon name="bell" />
          </van-badge>
        </template>
      </van-button>
    </div>
    <div class="info">
      <div class="user">
        <van-image
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          round
          lazy-load
          fit="cover"
          class="avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="user-info">
          <p class="nickname">测试昵称</p>
          <p class="manifesto">这个娃儿啥也没留下</p>
        </div>
      </div>
    </div>
    <div class="datas">
      <div class="data">
        <span class="n">1000</span>
        <span class="t">分享</span>
      </div>
      <div class="data">
        <span class="n">1000</span>
        <span class="t">评论</span>
      </div>
      <div class="data">
        <span class="n">1000</span>
        <span class="t">点赞</span>
      </div>
    </div>
  </header>
  <van-empty description="" />
  <bottom-menu />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BottomMenu from '../components/BottomMenu.vue'

export default defineComponent({
  name: 'my',
  components: {
    BottomMenu
  },
  setup() {}
})
</script>

<style lang="less" scoped>
.header {
  background: url(https://img9.51tietu.net/pic/2019-091210/yvkfwdsgtzlyvkfwdsgtzl.jpg) no-repeat;
  background-size: cover;
  height: 215px;
  position: relative;
}
.message {
  text-align: right;
  .van-button {
    background-color: transparent;
    border: none;
    &:active::before {
      opacity: 0;
    }
  }
}
.info {
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  margin-top: 80px;
  z-index: 2;
  .user {
    display: flex;
    align-items: center;
  }
  .avatar {
    background-color: #fff;
    border: 1px solid #fff;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .user-info {
    flex: 1;
    overflow: hidden;
    &>p {
      text-shadow: 0 0 5px #000;
      margin: 0;
      .ellipsis();
      &+p {
        margin-top: 5px;
      }
    }
    .nickname {
      color: #fff;
      font-size: 16px;
    }
    .manifesto {
      color: #afafaf;
      font-size: 14px;
    }
  }
}
.datas {
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  margin-top: 8px;
  .data {
    color: #f0f0f0;
    text-shadow: 0 0 5px #000;
    & + .data {
      margin-left: 8px;
    }
    .t {
      font-size: 12px;
    }
    .n {
      font-size: 16px;
    }
  }
}
</style>
