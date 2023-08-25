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
            <el-tag v-for="item in row.attrValueList" :key="item.id">
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
              @click="updateAttr"
            ></el-button>
            <el-button type="primary" icon="Delete" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="!flag">
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性值"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="Plus">添加属性值</el-button>
      <el-button @click="cancel">取消</el-button>

      <el-table border style="margin: 10px auto">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>

      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import { Attr, AttrResponseData } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ref, watch } from 'vue'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])

watch(
  () => categoryStore.c3Id,
  async () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    let { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
      attrArr.value = result.data
    }
  },
)

let flag = ref<boolean>(true)
const addAttr = () => {
  flag.value = false
}

const updateAttr = () => {
  flag.value = false
}

const cancel = () => {
  flag.value = true
}
</script>
<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<style scoped></style>
