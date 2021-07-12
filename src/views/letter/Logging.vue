<template>
  <a-table 
    rowKey="id" 
    :dataSource="dataSource" 
    :pagination="pagination"
    :loading="loading"
    @change="onTableChange">
    <a-table-column title="#" data-index="id" align="center" />
    <a-table-column title="动作" data-index="action" align="center">
      <template #category="{ record }">
        <a-tag v-if="record.action === 0" color="#f50" style="margin-right: 0">否定</a-tag>
        <a-tag v-else-if="record.action === 1" color="#87d068" style="margin-right: 0">赞同</a-tag>
        <a-tag v-else color="#2db7f5" style="margin-right: 0">分享</a-tag>
      </template>
    </a-table-column>
    <a-table-column title="用户" data-index="cuser" align="center" />
  </a-table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { apiGetLetterlogs } from '../../apis'

export default defineComponent({
  name: 'letter-logging',
  setup() {
    const route = useRoute()

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
      apiGetLetterlogs({
        ...toRaw(pagination),
        fields: {
          letterId: Number(route.query.id)
        }
      }).then((res: any) => {
        loading.value = false
        dataSource.value = res.list.map((v: any) => {
          v.cuser = v.cuser.nickname || v.cuser.account
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

<style scoped>
</style>
