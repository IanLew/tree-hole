<template>
  <div class="glass" :style="{height:glassHeight}">
    <van-nav-bar left-arrow right-text="封存" @click-left="onBack" @click-right="onPublish" />
    <div class="editor">
      <textarea placeholder="放入你的记忆..."></textarea>
    </div>
    <div class="upload">
      <van-uploader v-model="fileList" multiple :max-count="9" />
    </div>
    <div class="date flex-v-c" @click="onDate">
      <svg-icon iconClass="timer" className="icon"></svg-icon>
      <span>{{selectTime||'请选择打开日期'}}</span>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :formatter="formatter" @confirm="onOk" @cancel="onCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Glass',
  data() {
    return {
      glassHeight: 'auto',
      fileList: [],
      showTime: false,
      currentDate: new Date(),
      minDate: new Date(),
      selectTime: null
    }
  },
  mounted() {
    this.glassHeight = `${document.body.clientHeight}px`
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    onPublish() {

    },
    onDate() {
      this.showTime = true
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if(type === 'day') {
        return `${value}日`
      }
      return value;
    },
    onOk(v) {
      this.selectTime = `${v.getFullYear()}年${v.getMonth() + 1}月${v.getDate()}日`
      this.showTime = false
    },
    onCancel() {
      this.showTime = false
    }
  }
}
</script>

<style lang="scss" scoped>
.glass {
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
.upload {
  background-color: #fff;
  padding-left: 15px;
}
.date {
  border-top: 5px solid #eee;
  background-color: #fff;
  padding: 10px 15px;
  color: #949494;
  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>