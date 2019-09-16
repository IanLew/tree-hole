<template>
  <div class="mood" :style="{height:moodHeight}" :class="{secret: isSecret}">
    <van-nav-bar left-arrow right-text="发表" @click-left="onBack" @click-right="onPublish" />
    <van-tabs v-model="active" color="#1989fa" title-active-color="#1989fa" @change="onChange">
      <van-tab title="动态">
        <div class="editor">
          <textarea placeholder="分享你的心情..."></textarea>
        </div>
        <div class="upload">
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </div>
      </van-tab>
      <van-tab title="秘密">
        <div class="editor">
          <textarea placeholder="分享你的秘密..."></textarea>
        </div>
        <div class="upload">
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Mood',
  data() {
    return {
      moodHeight: 'auto',
      isSecret: false,
      active: 0,
      fileList: []
    }
  },
  mounted() {
    this.moodHeight = `${document.body.clientHeight}px`
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    onPublish() {

    },
    onChange(active) {
      this.isSecret = active
    }
  }
}
</script>

<style lang="scss" scoped>
.mood {
  height: 100%;
}
.editor {
  background-color: #fff;
  width: 100%;
  height: 200px;
  padding: 20px 15px;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    background-color: transparent;
    display: block;
  }
}
.upload {
  background-color: #fff;
  padding-left: 15px;
}
.secret {
  background-color: #dddcdc;
}
</style>