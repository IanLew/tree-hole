<template>
  <div class="wrapper mine">
    <div class="user flex-vc">
      <van-image :src="userInfo.avatar" round class="avatar"></van-image>
      <div class="info flex-fill">
        <div class="nickname ellipsis">{{ userInfo.nickname || `Tourist${userInfo.userid}` }}</div>
        <div class="account ellipsis">树洞号：{{ userInfo.userid }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from 'vue';
import { Image } from 'vant';
import { getUserInfo } from '@/apis';

export default {
  name: 'Mine',
  data () {
    return {
    }
  },
  components: {
    [Image.name]: Image
  },
  setup () {
    const { ctx } = getCurrentInstance();
    
    let userInfo = ref({});

    const state = reactive({
      userInfo
    });

    getUserInfo({
      userid: ctx.$store.getters.userid
    }).then(res => {
      state.userInfo = res;
    }).catch(() => {})

    return {
      userInfo
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
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
  .info {
    margin-left: 15px;
    .nickname {
      font-size: 20px;
    }
    .account {
      color: gray;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>