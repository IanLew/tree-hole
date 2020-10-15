<template>
  <div class="send-message">
    <van-nav-bar 
      title="发布" 
      left-arrow
      :fixed="true" 
      :z-index="10"
      @click-left="$router.back" 
    />
    <van-list
      v-model:loading="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="getList"
    >
    </van-list>
  </div>
</template>

<script>
import { ref } from 'vue';
import { NavBar, Empty, List } from 'vant';

export default {
  name: 'SendMessage',
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
    const isLoading = ref(false);
    const isFinished = ref(false);

    return {
      isLoading,
      isFinished,
      getList () {}
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.send-message {
  padding-top: 46px;
}
</style>