<template>
  <div class="left">
    <div class="tourist">
      <div class="top">
        <p class="title">实时游客：</p>
        <p class="bg"></p>
        <p class="text">可预约总数：9999人</p>
      </div>
      <div class="number">
        <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        <span>人</span>
      </div>
      <div class="TCharts" ref="TCharts"></div>
    </div>
    <div class="sex">
      <div class="top">
        <p class="title">男女比例</p>
        <p class="bg"></p>
      </div>
      <div class="avatar">
        <div class="man">
          <span>男士</span>
          <img src="../../../assets/images/man.png" alt="" srcset="" />
        </div>
        <div class="woman">
          <span>女士</span>
          <img src="../../../assets/images/woman.png" alt="" srcset="" />
        </div>
      </div>

      <div class="SCharts" ref="SCharts"></div>
    </div>
    <div class="age">
      <div class="top">
        <p class="title">年龄比率</p>
        <p class="bg"></p>
      </div>

      <div class="ACharts" ref="ACharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '@/utils/echarts.ts'
import 'echarts-liquidfill'

let people = ref('666666')
let TCharts = ref()
let SCharts = ref()
let ACharts = ref()

onMounted(() => {
  let tCharts = echarts.init(TCharts.value)
  let scharts = echarts.init(SCharts.value)
  let acharts = echarts.init(ACharts.value)

  tCharts.setOption({
    title: {
      text: '水球图',
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        type: 'liquidFill',
        data: [0, 0.5, 1],
        radius: '80%',
        outline: {
          show: true,
          borderDistance: 8,
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })

  scharts.setOption({
    title: {
      text: '条形图',
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [50],
        barWidth: 20,
        z: 2,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        z: 1,

        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })

  acharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 40,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color:'white'
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '50-90' },
          { value: 735, name: '30-50' },
          { value: 580, name: '20-30' },
          { value: 484, name: '12-20' },
          { value: 300, name: '3-12' },
        ],
      },
    ],
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.left {
  flex: 1;
  height: 1040px;
  display: flex;
  flex-direction: column;
  color: #fff;

  .tourist {
    flex: 1.5;
    background: url('../../../assets/images/dataScreen-main-lb.png');
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 10px;

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
      .text {
        text-align: right;
        margin-right: 10px;
      }
    }

    .number {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      padding: 0 10px;

      span {
        background: url('../../../assets/images/total.png');
        background-size: 100% 100%;
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        display: inline-block;
        width: 50px;
      }
    }

    .TCharts {
      width: 100%;
      height: 250px;
    }
  }
  .sex {
    flex: 1;
    background: url('../../../assets/images/dataScreen-main-cb.png');
    background-size: 100% 100%;
    margin: 20px 0;
    .top {
      margin-left: 10px;

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

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      .man {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 111px;
        height: 115px;
        background: url('../../../assets/images/man-bg.png');
        background-size: 100% 100%;
        img {
          margin-top: 25px;
        }
      }
      .woman {
        margin-left: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 111px;
        height: 115px;
        background: url('../../../assets/images/woman-bg.png');
        background-size: 100% 100%;
        img {
          margin-top: 25px;
        }
      }
    }

    .SCharts {
      width: 100%;
      height: 100px;
    }
  }
  .age {
    flex: 1;
    background: url('../../../assets/images/dataScreen-main-cb.png');
    background-size: 100% 100%;
    .top {
      margin-left: 10px;

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

    .ACharts {
      height: 260px;
    }
  }
}
</style>
