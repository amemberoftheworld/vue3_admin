<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="一级分类">
          <el-select
            :disabled="!flag"
            v-model="categoryStore.c1Id"
            @change="getC2"
          >
            <el-option
              v-for="c1 in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            :disabled="!flag"
            v-model="categoryStore.c2Id"
            @change="getC3"
          >
            <el-option
              v-for="c2 in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="三级分类">
          <el-select :disabled="!flag" v-model="categoryStore.c3Id">
            <el-option
              v-for="c3 in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'

defineProps(['flag'])
let categoryStore = useCategoryStore()

const getC1 = () => {
  categoryStore.getC1()
}
const getC2 = () => {
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC2()
}
const getC3 = () => {
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  categoryStore.getC3()
}
onMounted(() => {
  getC1()
})
</script>
<script lang="ts">
export default {
  name: 'Category',
}
</script>

<style scoped lang="scss"></style>
