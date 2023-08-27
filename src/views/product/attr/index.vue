<template>
  <Category :flag="flag"></Category>
  <el-card style="margin-top: 10px">
    <div v-show="flag">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
      >
        添加
      </el-button>
      <el-table border style="margin-top: 10px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>

        <el-table-column
          label="属性名称"
          prop="attrName"
          align="center"
          width="150px"
        ></el-table-column>

        <el-table-column label="属性值名称" align="center">
          <template #="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 0 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200px">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateAttr(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="deleteAttr(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="!flag">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性值"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        icon="Plus"
        :disabled="!attrParams.attrName"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button @click="cancel">取消</el-button>

      <el-table
        :data="attrParams.attrValueList"
        border
        style="margin: 10px auto"
      >
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值名称"
              v-model="row.valueName"
              @blur="toLook(row, $index)"
              size="small"
            ></el-input>

            <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ row, $index }">
            <el-button
              icon="Delete"
              type="danger"
              size="small"
              @click="attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button
        type="primary"
        @click="save"
        :disabled="attrParams.attrValueList.length <= 0"
      >
        保存
      </el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttr, reqDeleteAttr } from '@/api/product/attr'
import { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, reactive, ref, watch } from 'vue'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])

watch(
  () => categoryStore.c3Id,
  () => {
    getAttr()
  },
)

const getAttr = async () => {
  attrArr.value = []
  if (!categoryStore.c3Id) return
  let { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}

let flag = ref<boolean>(true)
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c1Id,
    categoryLevel: 3,
  })
  flag.value = false
}

const updateAttr = (row: Attr) => {
  flag.value = false
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const deleteAttr = async (attrId: number | string) => {
  let result = await reqDeleteAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const cancel = () => {
  flag.value = true
}

const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    flag.value = true
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '', flag: true })
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }

  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) return item.valueName === row.valueName
  })

  if (repeat) {
    attrParams.attrValueList.splice($index, 1)

    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }

  row.flag = false
}
const toEdit = (row: AttrValue) => {
  row.flag = true
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<style scoped></style>
