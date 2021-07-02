<template>
  <van-sticky>
    <van-nav-bar
      title="树洞"
      left-text="返回"
      left-arrow
      @click-left="() => $router.go(-1)" />
  </van-sticky>
  <div class="msgdata">
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
      <van-button type="default" size="mini" icon="share-o">0</van-button>
      <van-button type="default" size="mini" icon="chat-o">0</van-button>
      <van-button type="default" size="mini" icon="good-job-o">0</van-button>
    </section>
  </div>
  <div class="dialogue">
    <div class="title">
      <h4><van-icon name="chat-o" /> 回复</h4>
    </div>
    <van-list
      v-model:loading="replyState.loading"
      :finished="replyState.finished"
      :finished-text="replyState.list.length > 0 && replyState.finished ? '—— 我们是有底线的 ——' : ''"
      @load="getReplyList">
      <div v-for="item in replyState.list" :key="item" class="reply">
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
        <div class="content">
          <div class="info">
            <div class="nickname">测试昵称</div>
            <div class="date">2021/06/23</div>
          </div>
          <div class="message">测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</div>
        </div>
      </div>
    </van-list>
    <van-empty v-if="replyState.finished && replyState.list.length === 0" description="暂无数据" />
  </div>
  <div class="send-rep">
    <van-field v-model="replyContent" placeholder="请输入回复内容" />
    <van-button type="primary">回复</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'message-detail',
  setup() {
    const replyState = reactive({
      list: [],
      loading: false,
      finished: false
    })

    function getReplyList() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          replyState.list.push(replyState.list.length + 1)
        }

        // 加载状态结束
        replyState.loading = false

        // 数据全部加载完成
        if (replyState.list.length >= 40) {
          replyState.finished = true
        }
      }, 1000)
    }

    const replyContent = ref()

    return {
      replyState,
      replyContent,
      getReplyList
    }
  }
})
</script>

<style lang="less" scoped>
.msgdata {
  background-color: #fff;
  display: block;
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
        color: #666;
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
    .text {
      color: #222;
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
      grid-template-columns: repeat(3, 110px);
      grid-template-rows: repeat(3, 110px);
      grid-gap: 6px 6px;
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
}
.dialogue {
  border-top: 6px solid #eee;
  padding-bottom: 45px;
  .title {
    border-bottom: 1px solid #eee;
    & > h4 {
      color: #222;
      font-size: 16px;
      margin: 12px 16px;
      .van-icon {
        color: @color-primary;
        font-size: 18px;
        vertical-align: -1px;
      }
    }
  }
  .reply {
    display: flex;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-left: 16px;
    margin-right: 16px;
    &+.reply {
      border-top: 1px solid #eee;
    }
    .avatar {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .content {
      font-size: 14px;
      flex: 1;
      overflow: hidden;
    }
    .info {
      display: flex;
      justify-content: space-between;
    }
    .nickname {
      color: #666;
      flex: 1;
      .ellipsis();
    }
    .date {
      color: #acacac;
      margin-left: 10px;
    }
    .message {
      color: #222;
      margin-top: 6px;
    }
  }
}
.send-rep {
  background-color: #fff;
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  .van-button {
    flex-shrink: 0;
  }
}
</style>
