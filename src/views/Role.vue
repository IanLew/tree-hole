<template>
  <a-form layout="inline">
    <a-form-item>
      <a-button type="primary" :loading="loading" @click="$router.push({ name: 'roleDetail' })">新增</a-button>
    </a-form-item>
  </a-form>
  <a-table 
    rowKey="id" 
    :dataSource="dataSource" 
    :pagination="pagination"
    :loading="loading"
    style="marginTop: 16px"
    @change="onTableChange">
    <a-table-column title="#" data-index="id" align="center" />
    <a-table-column title="头像" data-index="avatar" align="center">
      <template #default="{ record }">
        <a-avatar :src="record.avatar">
          <template #icon>
            <user-outlined />
          </template>
        </a-avatar>
      </template>
    </a-table-column>
    <a-table-column title="账号" data-index="account" align="center">
      <template #default="{ record }">{{ record.account || '-' }}</template>
    </a-table-column>
    <a-table-column title="昵称" data-index="nickname" align="center">
      <template #default="{ record }">{{ record.nickname || '-' }}</template>
    </a-table-column>
    <a-table-column title="性别" data-index="sex" align="center">
      <template #default="{ record }">{{ record.sex === 0 ? '女' : record.sex ? '男' : '保密' }}</template>
    </a-table-column>
    <a-table-column title="生日" data-index="birthday" align="center">
      <template #default="{ record }">{{ record.birthday || '-' }}</template>
    </a-table-column>
    <a-table-column title="签名" data-index="manifesto" align="center">
      <template #default="{ record }">{{ record.manifesto || '-' }}</template>
    </a-table-column>
    <a-table-column title="操作" data-index="operate" align="center">
      <template #default="{ record }">
        <a-button type="link" @click="$router.push({ name: 'roleDetail', query: { id: record.id } })">编辑</a-button>
      </template>
    </a-table-column>
  </a-table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'
import { apiGetBusers } from '../apis'

export default defineComponent({
  name: 'role',
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
      apiGetBusers(pagination).then((res: any) => {
        loading.value = false
        dataSource.value = res.list
        pagination.total = res.total
      }).catch(() => {
        loading.value = false
      })
    }

    /**
     * 表格变化
     */
    function onTableChange(page) {
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
