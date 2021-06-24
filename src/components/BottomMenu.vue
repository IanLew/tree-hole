<template>
  <van-tabbar v-model="activeMenu" route>
    <van-tabbar-item icon="home-o" :to="{name: 'home'}">树洞</van-tabbar-item>
    <van-tabbar-item icon="add-o" @click="() => (showCreate = true)">创建</van-tabbar-item>
    <van-tabbar-item icon="user-o" :to="{name: 'my'}">我的</van-tabbar-item>
  </van-tabbar>
  <van-action-sheet v-model:show="showCreate" title="创建树洞">
    <van-form @submit="onSubmit" class="create-message">
      <van-field
        v-model="messageForm.type"
        label="类型"
        placeholder="请选择类型"
        readonly
        @click="() => (showCreateType = true)" />
      <van-field
        v-model="messageForm.content"
        rows="3"
        autosize
        label="内容"
        type="textarea"
        placeholder="请输入内容" />
      <van-cell :border="false">
        <van-uploader
          v-model="messageForm.images"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          :max-size="1 * 1024 * 1024"
          :max-count="9"
          :beforeRead="onBeforeRead"
          @oversize="onOversize" />
      </van-cell>
      <div style="padding: 4.267vw;">
        <van-button
          round
          block
          type="primary"
          native-type="submit">提交</van-button>
      </div>
    </van-form>
  </van-action-sheet>
  <van-popup
    v-model:show="showCreateType"
    :safe-area-inset-bottom="true"
    round
    position="bottom">
    <van-picker
      title="选择创建类型"
      :columns="typeCols"
      @cancel="() => (showCreateType = false)"
      @confirm="(value) => (messageForm.type = value, showCreateType = false)" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Toast } from 'vant'

export default defineComponent({
  name: 'bottom-menu',
  setup() {
    const activeMenu = ref(0)
    const showCreate = ref(false)
    const showCreateType = ref(false)
    const typeCols = ['树洞']
    const messageForm = reactive({
      type: '',
      content: '',
      images: []
    })

    function onOversize() {
      Toast('上传文件不能超过1M')
    }

    function onBeforeRead(file) {
      let files = file
      if (!Array.isArray(file)) {
        files = [file]
      }
      for (const v of files) {
        const suffix = v.name.replace(/.*\.(\w+$)/g, '$1')
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(suffix)

        if (!isImage) {
          Toast(`不支持${suffix}格式`)
          return false
        }
      }

      return true
    }

    function onSubmit() {}

    return {
      activeMenu,
      showCreate,
      showCreateType,
      typeCols,
      messageForm,
      onOversize,
      onBeforeRead,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.create-message {
  min-height: 260px;
}
</style>
