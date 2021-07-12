<template>
  <a-form layout="inline">
    <a-form-item>
      <a-button type="primary" :loading="loading" @click="$router.push({ name: 'systemDetail' })">新增</a-button>
    </a-form-item>
  </a-form>
  <a-table 
    rowKey="id" 
    :dataSource="dataSource" 
    :columns="columns"
    :pagination="false"
    :loading="loading"
    style="margin-top: 16px">
    <template #icon="{ record }">
      <component v-if="record.icon" :is="record.icon"></component>
      <span v-else>-</span>
    </template>
    <template #category="{ record }">
      <a-tag v-if="record.category === 0" color="#87d068" style="margin-right: 0">按钮</a-tag>
      <a-tag v-else-if="record.category === 1" color="#2db7f5" style="margin-right: 0">菜单</a-tag>
      <a-tag v-else color="#f50" style="margin-right: 0">其他</a-tag>
    </template>
    <template #url="{ record }">{{ record.url || '-' }}</template>
    <template #operate="{ record }">
      <a-button type="link" @click="$router.push({ name: 'systemDetail', query: { id: record.id } })">编辑</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { apiGetBresource } from '../apis'

export default defineComponent({
  name: 'system',
  setup() {
    const loading = ref(false)  // 加载状态
    const dataSource = ref([])  // 资源列表
    // 表结构
    const columns = [
      { title: '#', dataIndex: 'id', align: 'center' },
      { title: '图标', dataIndex: 'icon', align: 'center', slots: { customRender: 'icon' } },
      { title: '名称', dataIndex: 'name', align: 'center' },
      { title: '分类', dataIndex: 'category', align: 'center', slots: { customRender: 'category' } },
      { title: '路由', dataIndex: 'url', align: 'center', slots: { customRender: 'url' } },
      { title: '操作', dataIndex: 'operate', align: 'center', slots: { customRender: 'operate' } }
    ]

    /**
     * 获取列表
     */
    function getList() {
      loading.value = true
      apiGetBresource().then((res: any) => {
        dataSource.value = res
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }

    getList()

    return {
      loading,
      dataSource,
      columns,
      getList
    }
  }
})
</script>

<style lang="less" scoped>
</style>
