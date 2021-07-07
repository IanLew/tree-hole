<template>
  <van-tabbar v-model="activeMenu" route>
    <van-tabbar-item icon="home-o" :to="{name: 'home'}">树洞</van-tabbar-item>
    <van-tabbar-item icon="add-o" @click="() => (showCreate = true)">创建</van-tabbar-item>
    <van-tabbar-item icon="user-o" :to="{name: 'my'}">我的</van-tabbar-item>
  </van-tabbar>
  <van-action-sheet v-model:show="showCreate" title="创建树洞">
    <van-form @submit="onSubmit" class="create-message">
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
          :rules="[{ required: true, message: '请输入内容' }]" />
        <van-field name="images" :border="false">
          <template #input>
            <van-uploader
              v-model="messageForm.images"
              accept=".jpg,.jpeg,.png,.gif"
              multiple
              :max-size="1 * 1024 * 1024"
              :max-count="9"
              :beforeRead="onBeforeRead"
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
import { apiCreateLetter } from '../apis'

export default defineComponent({
  name: 'bottom-menu',
  setup() {
    const store = useStore()
    const userinfo: any = store.getters.userinfo

    const loading = ref(false)
    const activeMenu = ref(0)
    const showCreate = ref(false)
    const showCreateType = ref(false)
    const typeCols = [{
      label: '树洞',
      value: 1
    }]
    const messageForm = reactive({
      category: typeCols[0].label,
      content: '',
      images: []
    })

    function onOversize() {
      Notify({
        type: 'danger',
        message: '上传文件不能超过1M'
      })
    }

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

    function onSubmit(value: any) {
      loading.value = true
      const category = typeCols.find(v => v.label === value.category)
      apiCreateLetter({
        category: category.value,
        content: value.content,
        images: value.images.length > 0 ? toRaw(value.images).join('|') : null,
        sender: userinfo.id
      }).then(() => {
        loading.value = false
        Notify({
          type: 'success',
          message: '提交成功'
        })
      }).catch(() => {
        loading.value = false
      })
    }

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
