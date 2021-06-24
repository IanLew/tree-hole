<template>
  <van-sticky>
    <van-nav-bar
      title="消息列表"
      left-text="返回"
      left-arrow
      @click-left="() => $router.go(-1)" />
  </van-sticky>
  <van-list
    v-model:loading="noticeState.loading"
    :finished="noticeState.finished"
    :finished-text="noticeState.list.length > 0 && noticeState.finished ? '—— 我们是有底线的 ——' : ''"
    @load="getnoticeList">
    <div v-for="item in noticeState.list" :key="item" class="notice">
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
      <div class="info">
        <p class="nickname">测试昵称</p>
        <p class="behavior">
          <van-icon name="good-job-o" />
          <span>+1</span>
        </p>
        <p class="date">2021/06/23</p>
      </div>
      <div class="message">
        <span>测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</span>
      </div>
    </div>
  </van-list>
  <van-empty v-if="noticeState.finished && noticeState.list.length === 0" description="暂无数据" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'notice',
  setup() {
    const noticeState = reactive({
      list: [],
      loading: false,
      finished: false
    })

    function getnoticeList() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          noticeState.list.push(noticeState.list.length + 1)
        }

        // 加载状态结束
        noticeState.loading = false

        // 数据全部加载完成
        if (noticeState.list.length >= 40) {
          noticeState.finished = true
        }
      }, 1000)
    }

    return {
      noticeState,
      getnoticeList
    }
  }
})
</script>

<style lang="less" scoped>
.van-list {
  min-height: 100vh;
}
.notice {
  display: flex;
  padding: 16px;
  &+.notice {
    border-top: 1px solid #eee;
  }
  .avatar {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  .info {
    color: #888;
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    &>p {
      margin: 0;
      &+p {
        margin-top: 5px;
      }
    }
    .nickname {
      .ellipsis();
    }
  }
  .message {
    border-radius: 5px;
    background-color: #eee;
    width: 50px;
    height: 50px;
    padding: 6px;
    flex-shrink: 0;
    margin-left: 10px;
    &>span {
      color: #888;
      font-size: 12px;
      .ellipsis(3);
    }
  }
}
</style>
