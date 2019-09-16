<template>
  <div class="letter" :style="{height:letterHeight}">
    <van-nav-bar left-arrow right-text="投递" @click-left="onBack" @click-right="onPublish" />
    <div class="editor">
      <textarea placeholder="写下你想说的话..."></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Letter',
  data() {
    return {
      letterHeight: 'auto'
    }
  },
  mounted() {
    this.letterHeight = `${document.body.clientHeight}px`
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    onPublish() {

    }
  }
}
</script>

<style lang="scss" scoped>
.letter {
  background-color: #dddcdc;
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
</style>