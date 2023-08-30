<template>
  <el-card class="box-card">
    <ElButton type="primary" size="default" icon="plus" @click="addTrademark" v-has="'aaaaa'">
      添加品牌
    </ElButton>

    <el-table v-model:data="trademarkArr" border style="margin-top: 5px">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名" align="center">
        <template #="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{ row }">
          <img
            :src="row.logoUrl"
            alt="加载失败"
            style="width: 40px; height: 40px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <ElButton
            type="primary"
            size="small"
            icon="Edit"
            @click="() => updateTrademark(row)"
          ></ElButton>

          <el-popconfirm
            :title="`是否删除${row.tmName}？`"
            icon="Delete"
            @confirm="deleteTrademark(row.id)"
          >
            <template #reference>
              <ElButton type="primary" size="small" icon="Delete"></ElButton>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <ElPagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      background
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="getHasTrademark()"
      @current-change="getHasTrademark"
      style="margin-top: 10px"
    ></ElPagination>
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="trademarkParams.id ? '修改' : '添加'"
  >
    <ElForm
      label-width="120px"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <ElFormItem label="品牌名称：" prop="tmName">
        <ElInput
          placeholder="请输入品牌名称"
          v-model="trademarkParams.tmName"
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="品牌LOGO：" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton type="primary" @click="cancel">取消</ElButton>
      <ElButton type="primary" @click="confirm">确定</ElButton>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElPagination,
} from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { reqHasTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import {
  Records,
  Trademark,
  TrademarkResponseData,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { reqAddOrUpdateTrademark } from '@/api/product/trademark/index'

let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
const getHasTrademark = async (page = 1) => {
  pageNo.value = page
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

let dialogVisible = ref(false)
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称请大于两位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传图片'))
  }
}

const rules = {
  tmName: [
    {
      required: true,
      message: '请输入品牌名称',
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    { required: true, message: '请上传品牌图片', validator: validatorLogoUrl },
  ],
}
const addTrademark = () => {
  dialogVisible.value = true
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}
const updateTrademark = (row: Trademark) => {
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  dialogVisible.value = true
  Object.assign(trademarkParams, row)
}

const deleteTrademark = async (id: number) => {
  let result: any = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const cancel = () => {
  dialogVisible.value = false
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
}

let formRef = ref()
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gift'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '请上传小于4M的文件',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '请上传jpeg|png|gift的文件',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

onMounted(() => {
  getHasTrademark()
})
</script>
<script lang="ts">
export default {
  name: 'Trademark',
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
