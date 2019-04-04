<template>
  <div class="taskMonitor">
    <div class="divGroup">
      <div class="divGroupBottom">

      </div>
      <el-row class="elrowTop">
        <el-col>
          <el-card class="elcardTopInfo">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">今日任务</span>
            </div>
            <div style="justify-content: center;display: flex;">
              <ve-pie :data="todayPieChartData"
                      style="height: 170px;width: 300px;"
                      :settings="todayPieChartSettings" :colors="todayPieColors"></ve-pie>
            </div>
          </el-card>
        </el-col>
        <el-col>
          <el-card class="elcardTopInfo">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">今日RPA机器使用情况</span>
            </div>
            <div style="justify-content: center;display: flex;">
              <ve-histogram :data="todayHistogramChartData" height="250px"
                            style="height: 170px;width: 300px;"></ve-histogram>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="divGroup">
      <div class="divGroupBottom">

      </div>
      <el-row class="elrowTop">
        <el-col>
          <el-card class="elcardTopInfo">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">历史任务</span>
            </div>
            <div style="justify-content: center;display: flex;">
              <ve-pie :data="historyPieChartData" style="height: 170px;width: 300px;"
                      :settings="historyPieChartSettings" :colors="todayPieColors"></ve-pie>
            </div>
          </el-card>
        </el-col>
        <el-col>
          <el-card class="elcardTopInfo">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">历史RPA机器使用情况</span>
            </div>
            <div style="justify-content: center;display: flex;">
              <ve-histogram :data="historyHistogramChartData" height="250px"
                            style="height: 170px;width: 300px;"></ve-histogram>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      this.todayPieColors = ['#19d4ae', '#fa6e86', '#008000', '#ffb980'],
        this.todayPieChartSettings = {
          radius: 60,
          offsetY: 100,
          level: [
            ['成功', '失败'],
            ['已完成', '待运行',]
          ]
        },
        this.historyPieChartSettings = {
          radius: 60,
          offsetY: 100,
        }
      return {
        todayPieChartData: {
          columns: ['状态', '次数'],
          rows: [
            {'状态': '已完成', '次数': 120},
            {'状态': '待运行', '次数': 30},
            {'状态': '成功', '次数': 99},
            {'状态': '失败', '次数': 21},
          ]
        },
        historyPieChartData: {
          columns: ['状态', '次数'],
          rows: [
            {'状态': '成功', '次数': 2001},
            {'状态': '失败', '次数': 102},
            {'状态': '未运行', '次数': 325},
          ]
        },
        todayHistogramChartData: {
          columns: ['机器', '次数'],
          rows: [
            {'机器': 'RPA1', '次数': 28,},
            {'机器': 'RPA2', '次数': 31},
            {'机器': 'RPA3', '次数': 2},
            {'机器': 'RPA4', '次数': 10,},
            {'机器': 'RPA5', '次数': 41,},
            {'机器': 'RPA6', '次数': 36,},
          ]
        },
        historyHistogramChartData: {
          columns: ['机器', '次数'],
          rows: [
            {'机器': 'RPA1', '次数': 405,},
            {'机器': 'RPA2', '次数': 600},
            {'机器': 'RPA3', '次数': 98},
            {'机器': 'RPA4', '次数': 106,},
            {'机器': 'RPA5', '次数': 356,},
            {'机器': 'RPA6', '次数': 789,},
          ]
        }
      }
    },
    components: {},
    created() {

    },
    methods: {},
    computed: {}
  }
</script>

<style>

  .taskMonitor {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .taskMonitor .elrowTop {
    height: 260px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .taskMonitor .el-col {
    width: calc(50% - 10px);
  }

  .taskMonitor .elcardTopInfo {
    padding: 0 10px 10px 10px;
    min-width: 230px;
    max-width: 500px;
    margin: auto;
  }

  .taskMonitor .elcardTopInfo p {
    font-size: 15px;
    font-weight: bold;
    margin-top: -10px;
  }

  .taskMonitor .elcardTopInfo ul {
    list-style: none
  }

  .taskMonitor .elcardTopInfo li {
    height: 30px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 13px;
  }

  .taskMonitor .elcardTopInfo .el-card__header {
    padding: 10px 20px;
  }

  .taskMonitor .divGroup {
    height: 100%;
    width: 49%;
    overflow: auto;
  }

  .taskMonitor .divGroupBottom {
    background-color: blue;
    height: calc(100% - 280px);
  }
</style>
