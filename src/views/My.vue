<template>
  <header class="header">
    <div class="notice">
      <van-button type="primary" size="normal" :to="{name: 'myNotice'}">
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
          :src="userinfo.avatar || ' '"
          round
          fit="cover"
          class="avatar">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="user-info">
          <template v-if="userinfo.id">
            <p class="nickname">{{ userinfo.nickname || userinfo.account }}</p>
            <p class="manifesto">{{ userinfo.manifesto || '这个娃儿啥也没留下' }}</p>
          </template>
          <p v-else class="nickname">请登录</p>
        </div>
        <van-button
          :to="{name: 'myProfile'}"
          round
          plain
          hairline
          type="default"
          size="small">编辑资料</van-button>
      </div>
    </div>
  </header>
  <van-tabs v-model="activeTab" color="#1989fa" sticky>
    <van-tab title="树洞">
      <van-list
        v-model:loading="dataState.loading"
        :finished="dataState.finished"
        :finished-text="dataState.list.length > 0 && dataState.finished ? '—— 我们是有底线的 ——' : ''"
        @load="getDataList">
        <router-link
          v-for="item in dataState.list"
          :key="item.id"
          :to="{name: 'letterDetail', query: { id: item.id }}"
          class="msgdata">
          <section class="main">
            <div class="user">
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
              <div class="user-info">
                <p class="nickname">
                  <span>{{ item.cuser.nickname || item.cuser.account }}</span>
                  <span>{{ item._updatedAt }}</span>
                </p>
                <p v-if="item.cuser.manifesto" class="group">{{ item.cuser.manifesto }}</p>
              </div>
            </div>
            <div class="content">
              <div class="text">{{ item.content }}</div>
              <template v-if="item.images.length > 0">
                <van-image
                  v-if="item.images.length === 1"
                  :src="item.images[0] || ' '"
                  lazy-load
                  fit="contain"
                  class="simple-img">
                  <template v-slot:loading lazy-load>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
                <div class="multi">
                  <van-image
                    v-for="(v, i) in item.images"
                    :key="i"
                    :src="v || ' '"
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
              @click.prevent="() => (showShare = true)">分享{{ item.shareTotal > 0 ? `(${item.shareTotal})` : '' }}</van-button>
            <van-button type="default" size="mini" icon="chat-o">回复{{ item.replyTotal > 0 ? `(${item.replyTotal})` : '' }}</van-button>
            <van-button type="default" size="mini" icon="good-job-o">赞同{{ item.mannerTotal > 0 ? `(${item.mannerTotal})` : '' }}</van-button>
          </section>
        </router-link>
      </van-list>
      <van-empty v-if="dataState.finished && dataState.list.length === 0" description="暂无数据" />
    </van-tab>
    <van-tab title="回复">
      <van-list
        v-model:loading="replyState.loading"
        :finished="replyState.finished"
        :finished-text="replyState.list.length > 0 && replyState.finished ? '—— 我们是有底线的 ——' : ''"
        @load="getReplyList">
        <router-link
          v-for="item in replyState.list"
          :key="item"
          :to="{name: 'letterDetail', query: { id: item.id }}"
          class="reply">
          <div class="from">
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
          <div class="to">{{ item.replyContent }}</div>
        </router-link>
      </van-list>
      <van-empty v-if="replyState.finished && replyState.list.length === 0" description="暂无数据" />
    </van-tab>
  </van-tabs>
  <bottom-menu />
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import BottomMenu from '../components/BottomMenu.vue'
import { apiLetterMylist } from '../apis'

export default defineComponent({
  name: 'my',
  components: {
    BottomMenu
  },
  setup() {
    const activeTab = ref(0)
    const store = useStore()
    const userinfo = store.getters.userinfo

    const dataState = reactive({
      list: [],
      loading: false,
      finished: false,
      pageNo: 1,
      pageSize: 10
    })

    function getDataList() {
      dataState.loading = true
      apiLetterMylist({
        pageNo: dataState.pageNo,
        pageSize: dataState.pageSize,
        fields: {
          user: userinfo.id,
          type: 1
        }
      }).then((res: any) => {
        dataState.loading = false
        if (res && res.list.length > 0) {
          dataState.pageNo++
          dataState.list.push(...res.list.map((v: any) => {
            v._updatedAt = dayjs(v.updatedAt).format('YYYY/MM/DD')
            return v
          }))
        }
        dataState.finished = res.pages === 0 || res.pageNo === res.pages
      }).catch(() => {
        dataState.loading = false
        dataState.finished = true
      })
    }

    const replyState = reactive({
      list: [],
      loading: false,
      finished: false,
      pageNo: 1,
      pageSize: 10
    })

    function getReplyList() {
      replyState.loading = true
      apiLetterMylist({
        pageNo: replyState.pageNo,
        pageSize: replyState.pageSize,
        fields: {
          user: userinfo.id,
          type: 0
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

    return {
      userinfo,
      activeTab,
      dataState,
      replyState,
      getReplyList,
      getDataList
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  background: url(https://img9.51tietu.net/pic/2019-091210/yvkfwdsgtzlyvkfwdsgtzl.jpg) no-repeat;
  background-size: cover;
  height: 160px;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &>div {
    position: relative;
    z-index: 2;
  }
  .notice {
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
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 48px;
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
        margin: 0;
        .ellipsis();
        &+p {
          margin-top: 2px;
        }
      }
      .nickname {
        color: #fff;
        font-size: 16px;
      }
      .manifesto {
        color: rgba(255, 255, 255, .8);
        font-size: 14px;
      }
    }
    .van-button--plain {
      background-color: rgba(0, 0, 0, .4);
      color: #fff;
    }
  }
  .datas {
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    margin-top: 8px;
    .data {
      color: rgba(255, 255, 255, .9);
      &+.data {
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
}
.van-list {
  padding-bottom: 50px;
}
.msgdata {
  background-color: #fff;
  display: block;
  padding: 12px 16px;
  &+.msgdata {
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
.reply {
  display: block;
  padding: 12px;
  &+.reply {
    border-top: 1px solid #eee;
  }
  .from {
    border-radius: 5px;
    background-color: #eee;
    display: flex;
    align-items: center;
    padding: 8px;
  }
  .to {
    color: #222;
    font-size: 14px;
    margin-top: 10px;
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
    color: #888;
    margin-top: 6px;
    .ellipsis();
  }
}
</style>
