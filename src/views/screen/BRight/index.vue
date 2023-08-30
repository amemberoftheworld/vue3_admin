<template>
  <div class="right">
    <div class="rank">
      <div class="top">
        <p class="title">景区排行</p>
        <p class="bg"></p>
      </div>
      <div class="RCharts" ref="RCharts"></div>
    </div>
    <div class="year"></div>
    <div class="counter"></div>
  </div>
</template>

<script setup lang="ts">
import echarts from '@/utils/echarts'
import { onMounted, ref } from 'vue'

let RCharts = ref()
onMounted(() => {
  let rcharts = echarts.init(RCharts.value)
  rcharts.setOption({
    xAxis: {
      type: 'category',
      data: [
        '景区一',
        '景区二',
        '景区三',
        '景区四',
        '景区五',
        '景区六',
        '景区七',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
  .rank {
    flex: 1.5;
    background: url('../../../assets/images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 10px;

      > p:nth-child(1) {
        margin-top: 30px;
      }
      > p {
        margin-top: 10px;
      }
      .title {
        font-size: 20px;
      }
      .bg {
        width: 68px;
        height: 7px;
        background: url('../../../assets/images/dataScreen-title.png');
        background-size: 100% 100%;
      }
    }

    .RCharts {
      height: 300px;
    }
  }

  .year {
    flex: 1;
    background: url('../../../assets/images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .counter {
    flex: 1;
    background: url('../../../assets/images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
}
</style>
