<!-- 折线图 -->
<style lang="stylus" scoped>
.multipleColumn
  height 1000px
  background url('../../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>


<template>
<div class="multipleColumn">
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
      styleArr: [],
      myChart: {},
      name: '区域作业数'
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
    this.myChart = echarts.init(document.querySelector('.multipleColumn .main'))
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
        name: '日期',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        },
        axisLabel: {
          textStyle: {
            color: 'white'
          }
        },
        data: ['上海', '南京', '北京', '哈尔滨', '天津', '郑州', '成都', '杭州', '苏州', '广州', '重庆']
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
            color: ['rgba(230, 230, 230, 0.2)']
          }
        },
        axisLabel: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        name: '数量',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        }
      }],
      series: [ {
        name: '成功',
        stack: 'stack2',
        type: 'bar',
        data: [10, 13, 26, 17, 8,9,20,12,5,4,9],
        barWidth: 16,
        barGap: 0
      },  {
        name: '失败',
        stack: 'stack1',
        type: 'bar',
        data: [6.3, 2.1, 7, 11, 4,8,2,8,9,5,4],
        barWidth: 16,
        barGap: 0
      },]
    });
    this._init()
  }
}

</script>
