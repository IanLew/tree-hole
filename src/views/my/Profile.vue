<template>
  <van-sticky>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      left-arrow
      @click-left="() => $router.go(-1)" />
  </van-sticky>
  <van-form class="profile" @submit="onSubmit">
    <van-cell-group inset :border="false">
      <van-field name="avatar" label="头像">
        <template #input>
          <van-uploader
            v-model="profileForm.avatar"
            accept=".jpg,.jpeg,.png"
            :max-size="1 * 1024 * 1024"
            :beforeRead="onBeforeRead"
            :max-count="1"
            :after-read="onAfterRead"
            @oversize="onOversize" />
        </template>
      </van-field>
      <van-field
        v-model="profileForm.sex"
        name="sex"
        label="性别"
        placeholder="请选择性别"
        readonly
        @click="() => (showSex = true)" />
      <van-field
        v-model="profileForm.birthday"
        name="birthday"
        label="生日"
        placeholder="请选择生日"
        readonly
        @click="() => (showBirthday = true)" />
      <van-field
        v-model="profileForm.nickname"
        name="nickname"
        label="昵称"
        placeholder="请输入昵称" />
      <van-field
        v-model="profileForm.manifesto"
        name="manifesto"
        label="签名"
        placeholder="请输入签名" />
    </van-cell-group>
    <div style="margin: 13.333vw 4.267vw 0;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="loading">提交</van-button>
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
import { Notify } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import { apiUpdateProfile, apiUploadImage } from '../../apis'

export default defineComponent({
  name: 'my-profile',
  setup() {
    const store = useStore()

    const showSex = ref(false)
    const sexCols = ['女', '男', '保密']
    const showBirthday = ref(false)
    const minDate = new Date(1900, 1, 1)
    const maxDate = new Date()
    const birthday = ref(maxDate)
    const loading = ref(false)

    const userinfo: any = store.getters.userinfo
    const profileForm = reactive({
      avatar: userinfo.avatar ? [{ url: userinfo.avatar }] : [],
      sex: userinfo.sex && userinfo.sex !== 0 ? sexCols[userinfo.sex] : null,
      nickname: userinfo.nickname,
      manifesto: userinfo.manifesto,
      birthday: userinfo.birthday
    })

    function onSubmit(value: any) {
      let params: any = {
        account: userinfo.account
      }
      if (value.avatar.length > 0) {
        params.avatar = value.avatar[0].url
      }
      for (let [k, v] of Object.entries(value)) {
        if (v && k !== 'avatar') {
          if (k === 'sex') {
            params[k] = sexCols.findIndex(m => m === v)
          } else {
            params[k] = v
          }
        }
      }
      loading.value = true
      apiUpdateProfile(params).then((res) => {
        store.commit('user', Object.assign(store.state.user, {
          userinfo: res
        }))
        const user: any = res || {}
        user.avatar = user.avatar ? [{ url: user.avatar }] : []
        user.sex = user.sex && user.sex !== 0 ? sexCols[user.sex] : null
        Object.assign(profileForm, user)
        loading.value = false
        Notify({
          type: 'success',
          message: '信息提交成功'
        })
      }).catch(() => {
        loading.value = false
      })
    }

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
        if (!['jpg', 'jpeg', 'png'].includes(suffix)) {
          Notify({
            type: 'danger',
            message: `不支持${suffix}格式`
          })
          return false
        }
      }

      return true
    }

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
        profileForm.avatar[0] = { url: res }
        file.status = 'done'
        file.message = '上传成功'
      }).catch(() => {
        file.status = 'failed'
        file.message = '上传失败'
      })
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
      loading,
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
      onAfterRead,
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
:deep(.van-field__control--custom) {
  justify-content: flex-end;
}
</style>
