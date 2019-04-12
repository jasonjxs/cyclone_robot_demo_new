<!-- 层叠柱状图 -->
<style lang="stylus" scoped>
.line
  height 1000px
  background url('../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
<div class="line">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from '../header/header'
import filter from '../filter/filter'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '周作业状态'
    }
  },
  methods: {
    _init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.line .main'));
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '产品',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: '#6a5757'
        },
        axisLabel: {
          textStyle: {
            color: '#6a5757'
          }
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['#beb2b2']
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6a5757',
            fontSize: 14
          }
        },
        name: '数量',
        type: 'value',
        nameTextStyle: {
          color: '#6a5757'
        }
      }],
      series: [{
        name: '成功',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: '失败',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },  ]
    });
    this._init()
  }
}

</script>
