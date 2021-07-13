<template>
  <a-row>
    <a-col :span="8">
      <a-form :label-col="{ span: 3 }">
        <a-form-item label="账号" name="account" v-bind="validateInfos.account">
          <a-input v-model:value="formState.account" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item label="密码" name="password" v-bind="validateInfos.password">
          <a-input v-model:value="formState.name" type="password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="昵称" name="nickname">
          <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item label="头像" name="avatar">
          <a-upload
            v-model:file-list="fileList"
            action=""
            name="image"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :custom-request="customRequest">
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="性别" name="sex">
          <a-radio-group v-model:value="formState.sex">
            <a-radio-button v-for="(item, index) in sexCols" :value="index" :key="index">{{ item }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="生日" name="birthday">
          <a-date-picker v-model:value="formState.birthday" />
        </a-form-item>
        <a-form-item label="签名" name="manifesto">
          <a-input v-model:value="formState.floor" disabled placeholder="请输入签名" />
        </a-form-item>
        <a-form-item label="权限" name="authority">
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            :tree-data="treeData"
            checkable>
          </a-tree>
        </a-form-item>
        <a-form-item style="text-align: center">
          <a-space>
            <a-button :loading="loading" type="primary" @click="submit">保存</a-button>
            <a-button :loading="loading" @click="$router.go(-1)">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Form } from 'ant-design-vue'
import { ref, reactive, toRaw, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { MD5 } from 'crypto-js'
import { apiUploadImage, apiGetBresource, apiGetBuser, apiCreateBusers, apiUpdateBusers } from '../../apis'

export default defineComponent({
  name: 'role-detail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const loading = ref(false) // 加载状态
    const fileList = ref([]) // 头像上传
    const sexCols = ['女', '男', '保密']  // 性别
    const expandedKeys = ref([])  // 展开权限树节点
    const selectedKeys = ref([])  // 设置选中权限树节点
    const checkedKeys = ref([])  // 选中权限树节点
    const treeData = ref([])  // 权限树
    // 表单
    const formState = reactive({
      account: null,
      password: null,
      nickname: null,
      avatar: null,
      sex: null,
      manifesto: null,
      authority: null
    })
    // 表单校验
    const rulesRef = reactive({
      icon: [{ required: true, message: '请输入账号' }],
      name: [{ required: true, message: '请输入密码' }]
    })
    const { validate, validateInfos } = Form.useForm(formState, rulesRef)

    /**
     * 获取权限资源树
     */
    function getResourceTree() {
      return new Promise((resolve) => {
        loading.value = true
        apiGetBresource().then((res: any) => {
          loading.value = false
          treeData.value = res.map((v: any) => {
            expandedKeys.value.push(v.id)
            return {
              title: v.name,
              key: v.id
            }
          })
          resolve(treeData)
        }).catch(() => {
          loading.value = false
        })
      })
    }

    /**
     * 获取用户信息
     */
    function getUserProfile() {
      loading.value = true
      apiGetBuser(route.query.id).then((res: any) => {
        getResourceTree().then(() => {
          selectedKeys.value = res.authority
          checkedKeys.value = res.authority
          Object.assign(formState, res)
        })
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 头像上传前校验
     */
    function beforeUpload(file: any) {
      const suffix = file.name.replace(/.*\.(\w+$)/g, '$1')
      const isImage = ['jpg', 'jpeg', 'png'].includes(suffix)
      if (!isImage) {
        message.error(`不支持${suffix}格式`)
      }
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        message.error('上传文件不能超过1M')
      }
      return isImage && isLt1M
    }

    /**
     * 上传头像
     */
    function customRequest(file: any) {
      loading.value = true
      const formData = new FormData()
      formData.append('image', file.file)
      apiUploadImage(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        loading.value = false
        fileList.value[0] = res
        formState.avatar = res
        message.success('头像上传成功')
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 提交
     */
    function submit() {
      validate().then(() => {
        loading.value = true
        if (route.query.id) {
          apiCreateBusers(Object.assign({}, toRaw(formState), {
            password: formState.password ? MD5(formState.password).toString() : null,
            authority: toRaw(checkedKeys)
          })).then(() => {
            loading.value = false
            message.success('创建成功')
            router.go(-1)
          }).catch(() => {
            loading.value = false
          })
        } else {
          apiUpdateBusers(Object.assign({}, toRaw(formState), {
            password: formState.password ? MD5(formState.password).toString() : null,
            authority: toRaw(checkedKeys)
          })).then(() => {
            loading.value = false
            if (store.getters.userinfo.id === Number(route.query.id)) {
              const op: any = store.getters.menus.map((v: any) => v.id)
              const np: any = toRaw(checkedKeys)
              if (JSON.stringify(op.sort()) === JSON.stringify(np.sort())) {
                message.success('修改成功')
                router.go(-1)
              } else {
                message.warning('权限变更，请重新登录')
			          store.commit('user', null)
                router.push({
                  name: 'login',
                  query: {
                    back: 1
                  }
                })
              }
            } else {
              message.success('修改成功')
              router.go(-1)
            }
          }).catch(() => {
            loading.value = false
          })
        }
      }).catch(() => {})
    }

    if (route.query.id) {
      getUserProfile()
    } else {
      getResourceTree()
    }

    return {
      loading,
      fileList,
      sexCols,
      treeData,
      expandedKeys,
      selectedKeys,
      checkedKeys,
      validateInfos,
      formState,
      beforeUpload,
      customRequest,
      submit
    }
  }
})
</script>

<style lang="less" scoped>
.avatar-uploader>.ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card {
  i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
.ant-layout-content {
  & > .ant-row {
    background-color: #fff;
    padding: 24px;
    min-height: 100%;
  }
}
</style>
