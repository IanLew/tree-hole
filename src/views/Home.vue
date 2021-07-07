<template>
  <div class="home">
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
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="shareOpts"
      @select="onSelectShare" />
    <bottom-menu />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref, reactive } from 'vue'
import { Toast } from 'vant'
import BottomMenu from '../components/BottomMenu.vue'
import { apiLetterList } from '../apis'

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
      finished: false,
      pageNo: 1,
      pageSize: 10
    })

    function getDataList() {
      dataState.loading = true
      apiLetterList({
        pageNo: dataState.pageNo,
        pageSize: dataState.pageSize,
        fields: {}
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
  box-sizing: border-box;
  padding-bottom: 50px;
  min-height: 100vh;
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
</style>
