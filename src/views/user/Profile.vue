<template>
  <van-sticky>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      left-arrow
      @click-left="() => $router.go(-1)" />
  </van-sticky>
  <van-form @submit="onSubmit" class="profile">
    <van-cell title="头像">
      <van-uploader
        v-model="profileForm.avatar"
        accept=".jpg,.jpeg,.png"
        :max-size="1 * 1024 * 1024"
        :beforeRead="onBeforeRead"
        @oversize="onOversize" />
    </van-cell>
    <van-field
      v-model="profileForm.sex"
      label="性别"
      placeholder="请选择性别"
      readonly
      @click="() => (showSex = true)" />
    <van-field
      v-model="profileForm.birthday"
      label="生日"
      placeholder="请选择生日"
      readonly
      @click="() => (showBirthday = true)" />
    <van-field v-model="profileForm.nickname" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="profileForm.manifesto" label="签名" placeholder="请输入签名" />
    <div style="padding: 13.333vw 4.267vw 0;">
      <van-button
        round
        block
        type="primary"
        native-type="submit">提交</van-button>
    </div>
  </van-form>
  <van-popup
    v-model:show="showSex"
    :safe-area-inset-bottom="true"
    round
    position="bottom">
    <van-picker
      title="选择性别"
      :columns="sexCols"
      @cancel="() => (showSex = false)"
      @confirm="(value) => (profileForm.sex = value, showSex = false)" />
  </van-popup>
  <van-popup
    v-model:show="showBirthday"
    :safe-area-inset-bottom="true"
    round
    position="bottom"
    @open="formatBirthday()">
    <van-datetime-picker
      v-model="birthday"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @cancel="() => (showBirthday = false)"
      @confirm="(value) => (formatBirthday(value), showBirthday = false)" />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Toast } from 'vant'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'user-profile',
  setup() {
    const showSex = ref(false)
    const sexCols = ['女', '男', '保密']
    const showBirthday = ref(false)
    const minDate = new Date(1900, 1, 1)
    const maxDate = new Date()
    const birthday = ref(maxDate)
    const profileForm = reactive({
      avatar: [],
      sex: '',
      nickname: '',
      manifesto: '',
      birthday: ''
    })

    function onSubmit() {}

    function onOversize() {
      Toast('上传文件不能超过1M')
    }

    function onBeforeRead(file: any) {
      let files = file
      if (!Array.isArray(file)) {
        files = [file]
      }
      for (const v of files) {
        const suffix = v.name.replace(/.*\.(\w+$)/g, '$1')
        const isImage = ['jpg', 'jpeg', 'png'].includes(suffix)

        if (!isImage) {
          Toast(`不支持${suffix}格式`)
          return false
        }
      }

      return true
    }

    function formatter(type: string, val: string) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    }

    function formatBirthday(value: any) {
      if (value) {
        profileForm.birthday = dayjs(value).format('YYYY-MM-DD')
      } else {
        if (profileForm.birthday) {
          birthday.value = new Date(profileForm.birthday.replace(/-/, '/'))
        }
      }
    }

    return {
      minDate,
      maxDate,
      birthday,
      showBirthday,
      showSex,
      sexCols,
      profileForm,
      onSubmit,
      onOversize,
      onBeforeRead,
      formatter,
      formatBirthday
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.van-cell__title) {
  color: var(--van-field-label-color);
}
:deep(.van-field__control) {
  text-align: right;
}
</style>
