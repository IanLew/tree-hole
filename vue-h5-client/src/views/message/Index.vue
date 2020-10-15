<template>
  <div class="message">
    <van-nav-bar 
      title="消息"
      right-text="发布" 
      left-arrow
      :fixed="true" 
      :z-index="10"
      @click-left="$router.back" 
      @click-right="$router.push({ name: 'SendMessage' })"
    />
    <van-empty description="暂无消息，可以前往发布" />
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import { NavBar, Empty, List } from 'vant';
import { getMessageData } from '@/apis';

export default {
  name: 'Message',
  components: {
    [NavBar.name]: NavBar,
    [Empty.name]: Empty,
    [List.name]: List
  },
  data () {
    return {
    }
  },
  setup () {
    const { ctx } = getCurrentInstance();

    const isLoading = ref(true);

    getMessageData({
      userid: ctx.$store.getters.user.userid
    }).then(res => {
      isLoading.value = false;
      console.log(res)
    }).catch(() => {
      isLoading.value = false;
    });

    return {
      isLoading
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding-top: 46px;
}
</style>