<template>
  <div class="letter">
    <a-row>
      <a-col :span="12">
        <span>类型：</span>
        <a-tag v-if="letter.category === 0" color="#87d068" style="margin-right: 0">树洞</a-tag>
        <a-tag v-else color="#2db7f5" style="margin-right: 0">其他</a-tag>
      </a-col>
      <a-col :span="12">
        <span>指定回复者：</span>
        <a-avatar :src="userinfo.avatar">
          <template #icon>
            <user-outlined />
          </template>
        </a-avatar>
        <span>{{ replyUser.nickname || replyUser.account }}</span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <span>分享数：</span>
        <span>{{ letter.shareTotal }}</span>
      </a-col>
      <a-col :span="8">
        <span>赞同数：</span>
        <span>{{ letter.mannerTotal }}</span>
      </a-col>
      <a-col :span="8">
        <span>回复数：</span>
        <span>{{ letter.replyTotal }}</span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <span>内容：</span>
        <span>{{ letter.content }}</span>
      </a-col>
    </a-row>
    <a-row v-if="letter.images && letter.images.length > 1">
      <a-col :span="24">
        <span>图片：</span>
        <a-image-preview-group>
          <a-image 
            v-for="(item, index) in letter.images" 
            :key="index" 
            :width="400"
            :height="300" 
            :src="item"
            :placeholder="true"
            :fallback="FAILED_IMAGE" />
        </a-image-preview-group>
      </a-col>
    </a-row>
  </div>
  <a-form v-if="userinfo.identity === 0" layout="inline" :label-col="{ span: 3 }">
    <a-form-item label="类型" name="category">
      <a-textarea v-model:value="replyContent" placeholder="请输入回复内容" auto-size />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" :loading="loading" @click="replyLetter">回复</a-button>
    </a-form-item>
  </a-form>
  <a-table 
    rowKey="id" 
    :dataSource="dataSource" 
    :pagination="pagination"
    :loading="loading"
    @change="onTableChange">
    <a-table-column title="#" data-index="id" align="center" />
    <a-table-column title="发送者" data-index="cuser" align="center" />
    <a-table-column title="内容" data-index="content" align="center" />
  </a-table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { apiGetCuser, apiGetLetterDetail, apiGetLetterList, apiCreateLetters } from '../../apis'

const FAILED_IMAGE = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI2MTU0NzYwMTM1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU4NTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzk1LjEzNiAzMjAuMjU2YTI5LjIyNjY2NyAyOS4yMjY2NjcgMCAwIDAtMjAuNDM3MzMzLTkuMzg2NjY3bC0yMjIuMzc4NjY3LTguNzQ2NjY2LTE2Ljg1MzMzMyAzNy4xMiAyMy4xNjggNjkuODg4LTQxLjg1NiA3OS40ODggMTcuMDY2NjY2IDY0IDQyLjI0IDU0Ljk1NDY2NiA2MS4xODQtNTYuNTc2YTE0LjcyIDE0LjcyIDAgMCAxIDIwLjczNiAwLjg1MzMzNGw3OC43MiA4NS4xNjI2NjZhMTQuODQ4IDE0Ljg0OCAwIDAgMSAyLjU2IDE2LjEyOCAxNC43NjI2NjcgMTQuNzYyNjY3IDAgMCAxLTEzLjkwOTMzMyA4LjUzMzMzNGwtMjE1LjY4LTguNDQ4LTEwLjc1MiAzMC44OTA2NjYgMTEuNjQ4IDI3LjkwNCAyNDcuOTc4NjY3IDkuNmEyOS4zNTQ2NjcgMjkuMzU0NjY3IDAgMCAwIDMwLjQ2NC0yOC4yNDUzMzNMODAyLjg1ODY2NyAzNDEuMzMzMzMzYTI5LjAxMzMzMyAyOS4wMTMzMzMgMCAwIDAtNy43MjI2NjctMjEuMDc3MzMzeiBtLTE1OS4zNiAxNjEuNDA4YTQ0LjA3NDY2NyA0NC4wNzQ2NjcgMCAxIDEgMy40NTYtODguMDIxMzMzIDQ0LjA3NDY2NyA0NC4wNzQ2NjcgMCAwIDEtMy40NTYgODguMDIxMzMzeiBtLTE1OS44NzIgMjAyLjk2NTMzM2w3LjQ2NjY2Ny0zMi40MjY2NjYtMTc1LjE0NjY2NyAxMi4wNzQ2NjZhMTQuNjc3MzMzIDE0LjY3NzMzMyAwIDAgMS0xMi4xMTczMzMtMjQuMzJsMTI5Ljc5Mi0xNDkuMDM0NjY2YTE0LjY3NzMzMyAxNC42NzczMzMgMCAwIDEgMjEuNjMyLTAuNTEybDQzLjQzNDY2NiA0NS4zMTItMTguNjg4LTQ4LjI5ODY2NyAzMi45Mzg2NjctODMuMzcwNjY3LTMwLjM3ODY2Ny02Ni43MzA2NjYgMTIuNjcyLTM4LjY1Ni0yMzguODQ4IDE2LjQ2OTMzM2EyOS4zMTIgMjkuMzEyIDAgMCAwLTI3LjIyMTMzMyAzMS4zNmwyNC4yMzQ2NjcgMzUxLjU3MzMzM2EyOS4wMTMzMzMgMjkuMDEzMzMzIDAgMCAwIDkuOTQxMzMzIDIwLjA1MzMzNGM1Ljg4OCA1LjA3NzMzMyAxMy41NjggNy42OCAyMS4zMzMzMzMgNy4xNjhsMjEzLjI0OC0xNC43Mi0xNC4yOTMzMzMtMjUuOTQxMzM0eiIgZmlsbD0iI0NDQ0RDRiIgcC1pZD0iNTg2MSI+PC9wYXRoPjwvc3ZnPg=='

export default defineComponent({
  name: 'letter-detail',
  setup() {
    const route = useRoute()

    const loading = ref(false)  // 加载状态
    const letter: any = ref({})  // 信笺详情
    const replyUser: any = ref({})  // 回复者信息
    const dataSource: any = ref([])  // 回复列表
    const replyContent = ref(null)  // 回复内容
    // 分页
    const pagination = reactive({
      pageNo: 1,  // 当前页
      pageSize: 10,  // 分页限制
      total: 0  // 总数
    })

    /**
     * 获取信笺详情
     */
    function getLetterDetail() {
      loading.value = true
      apiGetLetterDetail(route.query.id).then((res: any) => {
        letter.value = res
        apiGetCuser(res.receiver).then(user => {
          loading.value = false
          replyUser.value = user
        }).catch(() => {
          loading.value = false
        })
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
      if (replyContent.value) {
        loading.value = true
        apiCreateLetters({
          replyId: letter.value.id,
          category: letter.value.category,
          content: replyContent.value,
          sender: letter.value.receiver,
          receiver: letter.value.sender
        }).then(() => {
          loading.value = false
          message.success('回复成功')
          getReplyList()
        }).catch(() => {
          loading.value = false
        })
      } else {
        message.error('请输入回复内容')
      }
    }

    getLetterDetail()
    getReplyList()

    return {
      FAILED_IMAGE,
      loading,
      replyUser,
      replyContent,
      replyLetter
    }
  }
})
</script>

<style lang="less" scoped>
</style>
