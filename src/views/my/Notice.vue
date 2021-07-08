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
    @load="getNoticeList">
    <div v-for="item in noticeState.list" :key="item" class="notice">
      <van-image
        :src="item.cuser.avatar || ' '"
        round
        lazy-load
        fit="cover"
        class="avatar">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="info">
        <p class="nickname">{{ item.cuser.nickname || item.cuser.account }}</p>
        <p class="behavior">
          <template v-if="item.action === 2">
            <van-icon name="share-o" />
            <span>+1</span>
          </template>
          <template v-else>
            <van-icon name="good-job-o" />
            <span>+1</span>
          </template>
        </p>
        <p class="date">{{ item._updatedAt }}</p>
      </div>
      <div class="message">
        <span>{{ item.letter.content }}</span>
      </div>
    </div>
  </van-list>
  <van-empty v-if="noticeState.finished && noticeState.list.length === 0" description="暂无数据" />
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { apiLetterlogList } from '../../apis'

export default defineComponent({
  name: 'my-notice',
  setup() {
    const store = useStore()
    const userinfo = store.getters.userinfo

    // 消息相关
    const noticeState = reactive({
      list: [],  // 消息列表
      loading: false,  // 加载状态
      finished: false,  // 完成加载状态
      pageNo: 1,  // 当前页
      pageSize: 10  // 分页限制
    })

    /**
     * 获取消息列表
     */
    function getNoticeList() {
      noticeState.loading = true
      apiLetterlogList({
        pageNo: noticeState.pageNo,
        pageSize: noticeState.pageSize,
        fields: {
          user: userinfo.id
        }
      }).then((res: any) => {
        noticeState.loading = false
        if (res && res.list.length > 0) {
          noticeState.pageNo++
          noticeState.list.push(...res.list.map((v: any) => {
            v._updatedAt = dayjs(v.updatedAt).format('YYYY/MM/DD')
            return v
          }))
        }
        noticeState.finished = res.pages === 0 || res.pageNo === res.pages
      }).catch(() => {
        noticeState.loading = false
        noticeState.finished = true
      })
    }

    return {
      noticeState,
      getNoticeList
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
