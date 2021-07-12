<template>
  <a-row>
    <a-col :span="8">
      <a-form :label-col="{ span: 3 }">
        <a-form-item label="图标" name="icon" v-bind="validateInfos.icon">
          <a-input v-model:value="formState.icon" placeholder="请输入图标" />
        </a-form-item>
        <a-form-item label="名称" name="name" v-bind="validateInfos.name">
          <a-input v-model:value="formState.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="类型" name="category" v-bind="validateInfos.category">
          <a-select v-model:value="formState.category" placeholder="请选择类型">
            <a-select-option v-for="(item, index) in category" :key="index" :value="index">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="路由" name="url" v-bind="validateInfos.url">
          <a-input v-model:value="formState.url" placeholder="请输入路由地址" />
        </a-form-item>
        <a-form-item label="层级" name="floor">
          <a-input v-model:value="formState.floor" disabled placeholder="请输入层级" />
        </a-form-item>
        <a-form-item label="排序" name="order">
          <a-input v-model:value="formState.order" disabled placeholder="请输入排序" />
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
import { ref, reactive, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { apiGetBresource, apiCreateBresource, apiUpdateBresource } from '../../apis'

export default defineComponent({
  name: 'system-detail',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const loading = ref(false)  // 加载状态
    const category = ['按钮', '菜单', '其他']  // 分类
    // 表单
    const formState = reactive({
      icon: null,
      name: null,
      category: null,
      url: null,
      floor: null,
      order: null
    })
    // 表单校验
    const rulesRef = reactive({
      icon: [{ required: true, message: '请输入图标' }],
      name: [{ required: true, message: '请输入名称' }],
      category: [{ required: true, message: '请选择类型' }],
      url: [{ required: true, message: '请输入路由地址' }]
    })
    const { validate, validateInfos } = Form.useForm(formState, rulesRef)

    /**
     * 获取用户信息
     */
    function getUserProfile() {
      loading.value = true
      apiGetBresource({
        params: {
          id: route.query.id
        }
      }).then(res => {
        loading.value = false
        Object.assign(formState, res)
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
          apiUpdateBresource(formState).then(() => {
            loading.value = false
            message.success('创建成功')
            router.go(-1)
          }).catch(() => {
            loading.value = false
          })
        } else {
          apiCreateBresource(formState).then(() => {
            loading.value = false
            message.success('修改成功')
            router.go(-1)
          }).catch(() => {
            loading.value = false
          })
        }
      }).catch(() => {})
    }

    getUserProfile()

    return {
      loading,
      category,
      validateInfos,
      formState,
      submit
    }
  }
})
</script>

<style lang="less" scoped>
.ant-layout-content {
  & > .ant-row {
    background-color: #fff;
    padding: 24px;
    min-height: 100%;
  }
}
</style>
