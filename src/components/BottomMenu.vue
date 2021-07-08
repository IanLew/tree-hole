<template>
  <van-tabbar v-model="activeMenu" route>
    <van-tabbar-item icon="home-o" :to="{name: 'home'}">树洞</van-tabbar-item>
    <van-tabbar-item icon="add-o" @click="() => (showCreate = true)">创建</van-tabbar-item>
    <van-tabbar-item icon="user-o" :to="{name: 'my'}">我的</van-tabbar-item>
  </van-tabbar>
  <van-action-sheet v-model:show="showCreate" title="创建树洞" @close="onCloseCreate">
    <van-form ref="createRef" class="create-message" @submit="onSubmit">
      <van-cell-group inset :border="false">
        <van-field
          v-model="messageForm.category"
          label="类型"
          name="category"
          placeholder="请选择类型"
          readonly
          :rules="[{ required: true, message: '请选择类型' }]"
          @click="() => (showCreateType = true)" />
        <van-field
          v-model.trim="messageForm.content"
          rows="3"
          autosize
          label="内容"
          name="content"
          type="textarea"
          placeholder="请输入内容"
          maxlength="1024"
          :rules="[{ required: true, message: '请输入内容' }]" />
        <van-field name="images" :border="false">
          <template #input>
            <van-uploader
              v-model="messageForm.images"
              accept=".jpg,.jpeg,.png,.gif"
              :max-size="1 * 1024 * 1024"
              :max-count="9"
              :before-read="onBeforeRead"
              :after-read="onAfterRead"
              @oversize="onOversize" />
          </template>
        </van-field>
      </van-cell-group>
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
      :columns-field-names="{ text: 'label' }"
      @cancel="() => (showCreateType = false)"
      @confirm="(value) => (messageForm.type = value, showCreateType = false)" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import { Notify } from 'vant'
import { apiCreateLetter, apiUploadImage } from '../apis'

export default defineComponent({
  name: 'bottom-menu',
  setup() {
    const store = useStore()
    const userinfo: any = store.getters.userinfo  // 用户信息

    const loading = ref(false)  // 加载状态
    const activeMenu = ref(0)  // 当前激活menu
    const showCreate = ref(false)  // 显示创建
    const showCreateType = ref(false)  // 显示创建类型
    const createRef = ref()  // 创建表单ref
    // 信笺类型
    const typeCols = [{
      label: '树洞',
      value: 1
    }]
    // 信笺表单
    const messageForm = reactive({
      category: typeCols[0].label,
      content: '',
      images: []
    })

    /**
     * 上传图片超过1M
     */
    function onOversize() {
      Notify({
        type: 'danger',
        message: '上传文件不能超过1M'
      })
    }

    /**
     * 图片上传前检查
     */
    function onBeforeRead(file: any) {
      let files = file
      if (!Array.isArray(file)) {
        files = [file]
      }
      for (const v of files) {
        const suffix = v.name.replace(/.*\.(\w+$)/g, '$1')
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(suffix)

        if (!isImage) {
          Notify({
            type: 'danger',
            message: `不支持${suffix}格式`
          })
          return false
        }
      }
      return true
    }

    /**
     * 上传图片
     */
    function onAfterRead(file: any) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('image', file.file)
      apiUploadImage(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        messageForm.images[messageForm.images.length - 1] = { url: res }
        file.status = 'done'
        file.message = '上传成功'
      }).catch(() => {
        file.status = 'failed'
        file.message = '上传失败'
      })
    }

    /**
     * 提交信笺
     */
    function onSubmit(value: any) {
      loading.value = true
      const category = typeCols.find(v => v.label === value.category)
      let images = null
      if (value.images.length > 0) {
        images = value.images.map((v: any) => (v.url))
      }
      apiCreateLetter({
        category,
        content: value.content,
        images,
        sender: userinfo.value.id
      }).then(() => {
        loading.value = false
        showCreate.value = false
        Notify({
          type: 'success',
          message: '提交成功'
        })
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 关闭创建时清除校验和数据
     */
    function onCloseCreate() {
      createRef.value.resetValidation()
      messageForm.category = typeCols[0].label
      messageForm.content = ''
      messageForm.images = []
    }

    return {
      activeMenu,
      createRef,
      showCreate,
      showCreateType,
      typeCols,
      messageForm,
      onOversize,
      onBeforeRead,
      onAfterRead,
      onSubmit,
      onCloseCreate
    }
  }
})
</script>

<style lang="less" scoped>
.create-message {
  min-height: 260px;
}
</style>
