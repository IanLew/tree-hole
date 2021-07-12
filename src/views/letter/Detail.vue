<template>
  <a-row>
    <a-col :span="12">col-12</a-col>
    <a-col :span="12">col-12</a-col>
  </a-row>
  <a-form layout="inline">
    <a-form-item>
      <a-button type="primary" :loading="loading" @click="replyLetter">回复</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { apiGetLetterDetail, apiGetLetterList, apiCreateLetters } from '../../apis'

export default defineComponent({
  name: 'letter-detail',
  setup() {
    const route = useRoute()

    const loading = ref(false)  // 加载状态
    const letter = ref({})  // 信笺详情
    const dataSource = ref([])  // 回复列表
    // 分页
    const pagination = reactive({
      pageNo: 1,  // 当前页
      pageSize: 1,  // 分页限制
      total: 0  // 总数
    })

    /**
     * 获取信笺详情
     */
    function getLetterDetail() {
      loading.value = true
      apiGetLetterDetail(route.query.id).then(res => {
        loading.value = false
        letter.value = res
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 获取回复列表
     */
    function getReplyList() {
      loading.value = true
      apiGetLetterList({
        ...toRaw(pagination),
        fields: {
          replyId: Number(route.query.id)
        }
      }).then((res: any) => {
        loading.value = false
        dataSource.value = res.list.map((v: any) => {
          v.cuser = v.cuser.nickname || v.cuser.account
          v.content = v.content.substr(0, 50)
          return v
        })
        pagination.total = res.total
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 回复信笺
     */
    function replyLetter() {
      loading.value = true
      apiCreateLetters({}).then(() => {
        message.success('回复成功')
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }

    getLetterDetail()
    getReplyList()

    return {
      loading,
      replyLetter
    }
  }
})
</script>

<style scoped>
</style>
