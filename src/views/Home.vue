<template>
  <div class="home" v-wechat-title="$route.meta.title" img-set=" ">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" />
    <van-tabs v-model="active" color="#1989fa" title-active-color="#1989fa">
      <van-tab title="关注">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(0)" class="items">
          <div v-for="item in list" :key="item">
            <div class="item">
              <router-link class="item-link" to="/">
                <div class="item-top flex-v-c">
                  <van-image round lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                  <div class="nick flex-fill van-ellipsis">用户昵称</div>
                  <van-button round color="#1989fa" plain class="focus">关注</van-button>
                </div>
                <div class="text">发表内容发表内容发表内容发表内容发表内容发表内容发表内容发表内容发表内容</div>
                <div class="images">
                  <van-image lazy-load radius=".2em" src="https://img.yzcdn.cn/vant/cat.jpeg" class="image only">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                </div>
              </router-link>
              <div class="tools flex-v-c">
                <div class="share flex-fill flex-v-c">
                  <svg-icon iconClass="share" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">分享</div>
                </div>
                <router-link class="comment flex-fill flex-v-c" to="/">
                  <svg-icon iconClass="comment" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">评论</div>
                </router-link>
                <div class="thumbs flex-fill flex-v-c">
                  <svg-icon iconClass="thumbs" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">点赞</div>
                </div>
                <router-link class="inform" to="/">
                  <svg-icon iconClass="inform" className="tool-icon"></svg-icon>
                </router-link>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="发现">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(0)" class="items">
          <div v-for="item in list" :key="item">
            <div class="item">
              <router-link class="item-link" to="/">
                <div class="item-top flex-v-c">
                  <van-image round lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                  <div class="nick flex-fill van-ellipsis">用户昵称</div>
                  <van-button round color="#1989fa" plain class="focus">关注</van-button>
                </div>
                <div class="text">发表内容发表内容发表内容发表内容发表内容发表内容发表内容发表内容发表内容</div>
                <div class="images">
                  <van-image lazy-load radius=".2em" src="https://img.yzcdn.cn/vant/cat.jpeg" class="image more">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                  <van-image lazy-load radius=".2em" src="https://img.yzcdn.cn/vant/cat.jpeg" class="image more">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                  <van-image lazy-load radius=".2em" src="https://img.yzcdn.cn/vant/cat.jpeg" class="image more">
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>加载失败</template>
                  </van-image>
                </div>
              </router-link>
              <div class="tools flex-v-c">
                <div class="share flex-fill flex-v-c">
                  <svg-icon iconClass="share" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">分享</div>
                </div>
                <router-link class="comment flex-fill flex-v-c" to="/">
                  <svg-icon iconClass="comment" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">评论</div>
                </router-link>
                <div class="thumbs flex-fill flex-v-c">
                  <svg-icon iconClass="thumbs" className="tool-icon"></svg-icon>
                  <div class="num flex-fill">点赞</div>
                </div>
                <router-link class="inform" to="/">
                  <svg-icon iconClass="inform" className="tool-icon"></svg-icon>
                </router-link>
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
  name: 'home',
  components: {
    newsroom,
    'footer-menu': footerMenu
  },
  data() {
    return {
      keyword: '',
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

<style lang="scss" scope>
.search {
  width: 25px;
  height: 25px;
}
.items {
  .item {
    border-bottom: 10px solid #ebedf0;
    padding: 0 10px;
    .item-top {
      padding: 10px 0;
    }
    .item-link {
      display: block;
    }
    .avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }
    .nick {
      color: #7b7b7b;
      padding: 0 10px;
    }
    .focus {
      height: 27px;
      line-height: 25px;
      padding: 0 13px;
      flex-shrink: 0;
    }
    .text {
      color: #222;
      font-size: 15px;
      line-height: 22px;
    }
    .images {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .image {
        margin-left: 5px;
        &:nth-child(3n+1) {
          margin-left: 0;
        }
        &:nth-child(n+4) {
          margin-top: 5px;
        }
        &.only {
          width: 100%;
          height: 220px;
        }
        &.more {
          width: 115px;
          height: 70px;
        }
      }
    }
    .tools {
      padding: 10px 5px;
      .tool-icon {
        width: 22px;
        height: 22px;
        color: #555;
      }
      .num {
        text-align: center;
        padding: 0 5px;
      }
    }
  }
}
</style>