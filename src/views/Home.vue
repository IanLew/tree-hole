<template>
  <div class="home">
    <van-list
      v-model:loading="dataState.loading"
      :finished="dataState.finished"
      :finished-text="dataState.list.length > 0 && dataState.finished ? '—— 我们是有底线的 ——' : ''"
      @load="getDataList">
      <div v-for="item in dataState.list" :key="item" class="message">
        <section class="main">
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
              <p class="group">分组测试</p>
            </div>
          </div>
          <div class="content">
            <div class="text">测试文本内容</div>
            <van-image
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              lazy-load
              fit="contain"
              class="simple-img">
              <template v-slot:loading lazy-load>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <div class="multi">
              <van-image
                v-for="i in 9"
                :key="i"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                lazy-load
                fit="cover"
                class="multi-img">
                <template v-slot:loading lazy-load>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
          </div>
        </section>
        <section class="addition">
          <van-button type="default" size="mini" icon="share-o" @click="() => (showShare = true)">分享</van-button>
          <van-button type="default" size="mini" icon="chat-o">评论</van-button>
          <van-button type="default" size="mini" icon="thumb-circle-o">点赞</van-button>
        </section>
      </div>
    </van-list>
    <van-empty v-if="dataState.finished && dataState.list.length === 0" description="暂无数据" />
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="shareOpts"
      @select="onSelectShare" />
    <bottom-menu />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Toast } from 'vant'
import BottomMenu from '../components/BottomMenu.vue'

export default defineComponent({
  name: 'home',
  components: {
    BottomMenu
  },
  setup() {
    const shareOpts = [
      { name: '微信', icon: 'wechat' },
      { name: '复制链接', icon: 'link' }
    ]
    const showShare = ref(false)

    function onSelectShare() {
      Toast('功能建设中...')
    }

    const dataState = reactive({
      list: [],
      loading: false,
      finished: false
    })

    function getDataList() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          dataState.list.push(dataState.list.length + 1)
        }

        // 加载状态结束
        dataState.loading = false

        // 数据全部加载完成
        if (dataState.list.length >= 40) {
          dataState.finished = true
        }
      }, 1000)
    }

    return {
      shareOpts,
      showShare,
      dataState,
      onSelectShare,
      getDataList
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  min-height: 100vh;
}
.test {
  font-size: 75px;
}
.message {
  background-color: #fff;
  padding: 12px 16px;
  &+.message {
    border-top: 6px solid #eee;
  }
  .main {
    &>div {
      &+div {
        margin-top: 10px;
      }
    }
  }
  &>section {
    &+section {
      margin-top: 10px;
    }
  }
}
.user {
  display: flex;
  align-items: center;
  .avatar {
    width: 38px;
    height: 38px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .user-info {
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    &>p {
      margin: 0;
      .ellipsis();
      &+p {
        margin-top: 4px;
      }
    }
    .nickname {
      color: #444;
    }
    .group {
      color: #999;
    }
  }
}
.content {
  &>* {
    &+* {
      margin-top: 10px;
    }
  }
  .cnt-text {
    font-size: 16px;
  }
  .van-image {
    display: block;
  }
  :deep(.simple-img) {
    .van-image__img {
      max-height: 200px;
      object-position: 0 0;
    }
  }
  .multi {
    display: grid;
    grid-template-columns: repeat(3, 112px);
    grid-template-rows: repeat(3, 112px);
    grid-gap: 7px 7px;
  }
}
.addition {
  display: flex;
  justify-content: space-between;
  .van-button {
    border: none;
    font-size: 14px;
    &:active::before {
      opacity: 0;
    }
  }
}
</style>
