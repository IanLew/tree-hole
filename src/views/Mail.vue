<template>
  <div class="mail">
    <van-tabs v-model="active" color="#1989fa" title-active-color="#1989fa">
      <van-tab title="提醒">
        <div class="tab-menu flex-c">
          <router-link class="flex-fill flex-c tab-menu-item" to="/">
            <div class="ico red flex-c"><svg-icon iconClass="remind_msg" className="icon"></svg-icon></div>
            <div class="text">官方通知</div>
          </router-link>
          <router-link class="flex-fill flex-c tab-menu-item" to="/">
            <div class="ico blue flex-c"><svg-icon iconClass="at_msg" className="icon"></svg-icon></div>
            <div class="text">收到的@</div>
          </router-link>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="remind-items">
          <div v-for="item in list" :key="item">
            <router-link class="item" to="/">
              <van-image lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="image">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
                <template v-slot:error>加载失败</template>
              </van-image>
              <div class="cnt van-hairline--bottom">
                <div class="title van-ellipsis">标题</div>
                <div class="text">内容</div>
              </div>
              <div class="detail flex-h-b">
                <div class="date">2018-10-20</div>
                <div class="go flex-v-c"><span>查看详情</span><svg-icon iconClass="arrow_r" className="arrow-r"></svg-icon></div>
              </div>
            </router-link>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="私信">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="at-items">
          <div v-for="item in list" :key="item">
            <div class="item flex-v-c">
              <van-image round lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
                <template v-slot:error>加载失败</template>
              </van-image>
              <div class="flex-fill van-hairline--bottom flex-v-b msg">
                <div class="msg-top flex-v-c">
                  <div class="title flex-fill van-ellipsis">标题</div>
                  <div class="date">02/10</div>
                </div>
                <div class="msg-text van-ellipsis">[图片]</div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <newsroom/>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import footerMenu from '@/components/FooterMenu'
import newsroom from '@/components/Newsroom'
export default {
  name: 'mail',
  components: {
    newsroom,
    'footer-menu': footerMenu
  },
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tab {
  font-size: 15px;
}
.tab-menu {
  border-bottom: 10px solid #ebedf0;
  padding: 20px 0;
  .tab-menu-item {
    flex-direction: column;
  }
  .ico {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 5px;
    &.red {
      background-color: #f0542d;
    }
    &.blue {
      background-color: #3a9cff;
    }
    .icon {
      width: 20px;
      height: 20px;
      color: #fff;
    }
  }
}
.remind-items {
  padding: 10px;
  .item {
    border: #eee solid 1px;
    border-radius: .4rem;
    display: block;
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 0;
  }
  .image {
    height: 150px;
  }
  .cnt {
    padding: 10px;
    font-size: 16px;
    line-height: 22px;
    .title {
      color: #000;
    }
  }
  .detail {
    padding: 15px 10px;
    .date {
      font-size: 12px;
    }
    .go {
      font-size: 14px;
      color: #1989fa;
    }
    .arrow-r {
      width: 10px;
      height: 10px;
    }
  }
}
.at-items {
  .item {
    height: 90px;
    padding-left: 10px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
  .msg {
    height: 100%;
    padding: 20px 10px 20px 0;
    margin-left: 15px;
    .title {
      color: #000;
      font-size: 16px;
    }
    .date {
      margin-left: 10px;
    }
  }
}
</style>