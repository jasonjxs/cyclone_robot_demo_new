<!-- 柱状图 -->
<style lang="stylus" scoped>
.columnChart
  height 800px
  background url('../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  color white
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
<div class="columnChart">
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
      name: '周作业次数'
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
    this.myChart = echarts.init(document.querySelector('.columnChart .main'));
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
        name: '任务',
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
        name: '任务1',
        type: 'bar',
        data: [2, 5,8,6,2,15,2],
        barWidth: 16,
        barGap: 0
      }, {
        name: '任务2',
        type: 'bar',
        data: [11, 6,9,8,4,12,5],
        barWidth: 16,
        barGap: 0
      }, {
        name: '任务3',
        type: 'bar',
        data: [2,9 ,6,5,7,12,5,],
        barWidth: 16,
        barGap: 0
      }, {
        name: '任务4',
        type: 'bar',
        data: [4, 5,6,8,12,1,6],
        barWidth: 16,
        barGap: 0
      }, {
        name: '任务5',
        type: 'bar',
        data: [5, 4,9,6,8,4,7],
        barWidth: 16,
        barGap: 0
      }]
    });
    this._init()
  },
  destroyed () {
    this.myChart.dispose();
  }
}

</script>
