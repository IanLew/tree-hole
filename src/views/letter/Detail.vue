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
          :src="letter.cuser.avatar || ' '"
          round
          lazy-load
          fit="cover"
          class="avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="user-info">
          <p class="nickname">
            <span>{{ letter.cuser.nickname || letter.cuser.account }}</span>
            <span>{{ letter._updatedAt }}</span>
          </p>
          <p v-if="letter.cuser.manifesto" class="group">{{ letter.cuser.manifesto }}</p>
        </div>
      </div>
      <div class="content">
        <div class="text">{{ letter.content }}</div>
        <template v-if="letter.images.length > 0">
          <van-image
            v-if="letter.images.length === 1"
            :src="letter.images[0] || ' '"
            lazy-load
            fit="contain"
            class="simple-img">
            <template v-slot:loading lazy-load>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div v-else class="multi">
            <van-image
              v-for="(v, i) in letter.images"
              :key="i"
              :src="v"
              lazy-load
              fit="cover"
              class="multi-img">
              <template v-slot:loading lazy-load>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </template>
      </div>
    </section>
    <section class="addition">
      <van-button
        type="default"
        size="mini"
        icon="share-o"
        @click.prevent="() => (showShare = true)">分享{{ letter.shareTotal > 0 ? `(${letter.shareTotal})` : '' }}</van-button>
      <van-button type="default" size="mini" icon="chat-o">回复{{ letter.replyTotal > 0 ? `(${letter.replyTotal})` : '' }}</van-button>
      <van-button type="default" size="mini" icon="good-job-o">赞同{{ letter.mannerTotal > 0 ? `(${letter.mannerTotal})` : '' }}</van-button>
    </section>
  </div>
  <div class="dialogue" :style="{paddingBottom: userinfo.id && userinfo.id === letter.receiver ? '' : '0px'}">
    <div class="title">
      <h4>
        <van-icon name="chat-o" /> 回复</h4>
    </div>
    <van-list
      v-model:loading="replyState.loading"
      :finished="replyState.finished"
      :finished-text="replyState.list.length > 0 && replyState.finished ? '—— 我们是有底线的 ——' : ''"
      @load="getReplyList">
      <div v-for="item in replyState.list" :key="item" class="reply">
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
        <div class="content">
          <div class="info">
            <div class="nickname">{{ item.cuser.nickname || item.cuser.account }}</div>
            <div class="date">{{ item._updatedAt }}</div>
          </div>
          <div class="message">{{ item.content }}</div>
        </div>
      </div>
    </van-list>
    <van-empty v-if="replyState.finished && replyState.list.length === 0" description="暂无数据" />
  </div>
  <div v-if="userinfo.id && userinfo.id === letter.receiver" class="send-rep">
    <van-field v-model.trim="replyContent" placeholder="请输入回复内容" />
    <van-button type="primary" @click="onSubmit">回复</van-button>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Notify } from 'vant'
import { apiLetterDetail, apiLetterList, apiCreateLetter } from '../../apis'

export default defineComponent({
  name: 'message-detail',
  setup() {
    const route = useRoute()
    const store = useStore()
    const userinfo = store.getters.userinfo

    // 信笺信息
    const letter: any = ref({
      cuser: {},
      images: []
    })
    const loading = ref(true)  // 加载状态

    // 获取信笺详情
    apiLetterDetail(Number(route.query.id)).then((res: any) => {
      loading.value = false
      res._updatedAt = dayjs(res.updatedAt).format('YYYY/MM/DD')
      letter.value = res
    }).catch(() => {
      loading.value = false
    })

    // 回复相关
    const replyState = reactive({
      list: [],  // 回复列表
      loading: false,  // 加载状态
      finished: false,  // 完成加载状态
      pageNo: 1,  // 当前页
      pageSize: 10  // 分页限制
    })

    /**
     * 获取回复列表
     */
    function getReplyList() {
      replyState.loading = true
      apiLetterList({
        pageNo: replyState.pageNo,
        pageSize: replyState.pageSize,
        fields: {
          replyId: Number(route.query.id)
        }
      }).then((res: any) => {
        replyState.loading = false
        if (res && res.list.length > 0) {
          replyState.pageNo++
          replyState.list.push(...res.list.map((v: any) => {
            v._updatedAt = dayjs(v.updatedAt).format('YYYY/MM/DD')
            return v
          }))
        }
        replyState.finished = res.pages === 0 || res.pageNo === res.pages
      }).catch(() => {
        replyState.loading = false
        replyState.finished = true
      })
    }

    const replyContent = ref(null)  // 回复内容

    /**
     * 提交回复
     */
    function onSubmit() {
      if (replyContent.value) {
        loading.value = true
        apiCreateLetter({
          replyId: Number(route.query.id),
          category: letter.value.category,
          content: replyContent.value,
          sender: userinfo.id,
          receiver: letter.value.sender
        }).then(() => {
          replyContent.value = ''
          replyState.pageNo = 1
          replyState.list = []
          getReplyList()
          loading.value = false
          Notify({
            type: 'success',
            message: '提交成功'
          })
        }).catch(() => {
          loading.value = false
        })
      } else {
        Notify({
          type: 'danger',
          message: '请输入回复内容'
        })
      }
    }

    return {
      userinfo,
      letter,
      replyState,
      replyContent,
      getReplyList,
      onSubmit
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
        display: flex;
        justify-content: space-between;
        span {
          .ellipsis();
          & + span {
            flex-shrink: 0;
            margin-left: 10px;
          }
        }
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
      .clearfix();
      .multi-img {
        width: 110px;
        height: 110px;
        float: left;
        margin-left: 6px;
        &:nth-child(n+4) {
          margin-top: 6px;
        }
        &:nth-child(3n+1) {
          margin-left: 0;
        }
      }
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
    &>h4 {
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
