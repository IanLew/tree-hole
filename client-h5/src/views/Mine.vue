<template>
  <div class="wrapper mine">
    <div class="user flex-vc" @click="gotoProfile">
      <van-image :src="userInfo.avatar" fit="cover" round class="avatar">
        <template v-slot:loading>
          <van-loading type="spinner" size="15" />
        </template>
      </van-image>
      <div class="info flex-fill">
        <div class="nickname ellipsis">{{ isLoaded ? userInfo.userid ? userInfo.nickname : '点击登录' : '数据加载中...' }}</div>
        <div class="account ellipsis">树洞号：{{ userInfo.userid || '**********' }}</div>
      </div>
    </div>
    <van-cell-group class="cutline">
      <van-cell title="消息" icon="chat-o" is-link />
      <van-cell title="设置" icon="setting-o" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getCurrentInstance, ref, reactive } from 'vue';
import { Image, Cell, CellGroup, Loading } from 'vant';
import { getUserInfo } from '@/apis';

export default {
  name: 'Mine',
  data () {
    return {
    }
  },
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Loading.name]: Loading
  },
  setup () {
    const { ctx } = getCurrentInstance();

    const userInfo = ref({});
    const isLoaded = ref(false);

    const state = reactive({
      userInfo,
      isLoaded
    });

    const defaultAvatar = require('@/assets/logo.png');

    if (ctx.$store.getters.user) {
      getUserInfo({
        userid: ctx.$store.getters.user.userid
      }, {
        silent: true
      }).then(res => {
        res.nickname = res.nickname || `Tourist${res.userid}`;
        res.avatar = res.avatar.replace(/^(.+:\/\/).+(:.+)$/g, `$1${location.hostname}$2`);
        state.userInfo = res;
        state.isLoaded = true;
      }).catch(() => {
        state.userInfo.avatar = defaultAvatar;
        state.isLoaded = true;
      });
    } else {
      state.userInfo.avatar = defaultAvatar;
      state.isLoaded = true;
    }
    
    return {
      userInfo,
      isLoaded,
      gotoProfile () {
        if (this.isLoaded) {
          ctx.$router.push({
            name: userInfo.value.userid ? 'Profile' : 'Login'
          });
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 20px 16px;
  .avatar {
    width: 65px;
    height: 65px;
    flex-shrink: 0;
  }
  .info {
    margin-left: 15px;
    .nickname {
      font-size: 18px;
    }
    .account {
      color: gray;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
.cutline {
  border-top: 10px solid $cutline-color;
}
</style>