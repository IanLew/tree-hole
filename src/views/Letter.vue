<template>
  <a-table 
    rowKey="id" 
    :dataSource="dataSource" 
    :pagination="pagination"
    :loading="loading"
    @change="onTableChange">
    <a-table-column title="#" data-index="id" align="center" />
    <a-table-column title="发送者" data-index="cuser" align="center" />
    <a-table-column title="内容" data-index="content" align="center" />
    <a-table-column title="分享数" data-index="shareTotal" align="center" />
    <a-table-column title="赞同数" data-index="mannerTotal" align="center" />
    <a-table-column title="回复数" data-index="replyTotal" align="center" />
    <a-table-column title="操作" data-index="operate" align="center">
      <template #default="{ record }">
        <a-button type="link" @click="$router.push({ name: 'letterDetail', query: { id: record.id } })">详情</a-button>
        <a-button type="link" @click="$router.push({ name: 'letterLogging', query: { id: record.id } })">数据</a-button>
      </template>
    </a-table-column>
  </a-table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'
import { apiGetLetterList } from '../apis'

export default defineComponent({
  name: 'letter',
  setup() {
    const loading = ref(false)  // 加载状态
    const dataSource = ref([])  // 资源列表
    // 分页
    const pagination = reactive({
      pageNo: 1,  // 当前页
      pageSize: 10,  // 分页限制
      total: 0  // 总数
    })

    /**
     * 获取列表
     */
    function getList() {
      loading.value = true
      apiGetLetterList(pagination).then((res: any) => {
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
     * 表格变化
     */
    function onTableChange(page: any) {
      pagination.pageNo = page.pageNo
      pagination.pageSize = page.pageSize
      getList()
    }

    getList()

    return {
      loading,
      dataSource,
      pagination,
      getList,
      onTableChange
    }
  }
})
</script>

<style lang="less" scoped>
</style>
