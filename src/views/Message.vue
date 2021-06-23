<template>
  <van-nav-bar
    title="消息列表"
    left-text="返回"
    left-arrow
    @click-left="() => $router.go(-1)" />
  <van-tabs color="#1989fa" sticky>
    <van-tab title="提醒" :disabled="remindState.loading || letterState.loading">
      <van-list
        v-model:loading="remindState.loading"
        :finished="remindState.finished"
        :finished-text="remindState.list.length > 0 && remindState.finished ? '—— 我们是有底线的 ——' : ''"
        @load="getRemindList">
        <div v-for="item in remindState.list" :key="item" class="remind">
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
              <van-icon name="thumb-circle-o" />
              <span>+1</span>
            </p>
            <p class="date">2021/06/23</p>
          </div>
          <div class="message">
            <span>测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</span>
          </div>
        </div>
      </van-list>
      <van-empty v-if="remindState.finished && remindState.list.length === 0" description="暂无数据" />
    </van-tab>
    <van-tab title="私信" :disabled="remindState.loading || letterState.loading">
      <van-list
        v-model:loading="letterState.loading"
        :finished="letterState.finished"
        :finished-text="letterState.list.length > 0 && letterState.finished ? '—— 我们是有底线的 ——' : ''"
        @load="getLetterList">
        <div v-for="item in remindState.list" :key="item" class="letter">
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
              <div class="nick">测试昵称</div>
              <div class="date">2021/06/23</div>
            </div>
            <div class="message">测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</div>
          </div>
        </div>
      </van-list>
      <van-empty v-if="letterState.finished && letterState.list.length === 0" description="暂无数据" />
    </van-tab>
  </van-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'message',
  setup() {
    const remindState = reactive({
      list: [],
      loading: false,
      finished: false
    })

    function getRemindList() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          remindState.list.push(remindState.list.length + 1)
        }

        // 加载状态结束
        remindState.loading = false

        // 数据全部加载完成
        if (remindState.list.length >= 40) {
          remindState.finished = true
        }
      }, 1000)
    }

    const letterState = reactive({
      list: [],
      loading: false,
      finished: false
    })

    function getLetterList() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          letterState.list.push(letterState.list.length + 1)
        }

        // 加载状态结束
        letterState.loading = false

        // 数据全部加载完成
        if (letterState.list.length >= 40) {
          letterState.finished = true
        }
      }, 1000)
    }

    return {
      remindState,
      letterState,
      getRemindList,
      getLetterList
    }
  }
})
</script>

<style lang="less" scoped>
.van-list {
  min-height: 100vh;
}
.remind {
  display: flex;
  padding: 16px;
  &+.remind {
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
.letter {
  display: flex;
  align-items: center;
  padding: 12px;
  &+.letter {
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
    flex: 1;
    .ellipsis();
  }
  .date {
    color: #acacac;
    margin-left: 10px;
  }
  .message {
    color: #888;
    margin-top: 6px;
    .ellipsis();
  }
}
</style>
