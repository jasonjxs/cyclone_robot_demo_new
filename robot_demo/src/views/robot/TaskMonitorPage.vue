<template>
  <div class="taskMonitor">
    <div class="divGroup">
      <div class="divGroupTop">
        <div class="divGroupTopLeft">
          <p>
            <i class="el-icon-tickets"></i>
            <span class="spTitle">任务列表</span>
          </p>
          <div class="divGroupTopLeftContent">
            <div class="divGroupTopLeftSearch">
              <div>
                <el-input v-model="searchModel.taskName" style="width: 150px" size="small" placeholder="任务名称"></el-input>
                <el-select v-model="searchModel.taskStatus" style="width: 150px"  no-data-text="正在作业" size="small" placeholder="请选择">
                  <el-option key="0" label="全部" :value="0"></el-option>
                  <el-option key="1" label="作业中" :value="1"></el-option>
                  <el-option key="2" label="已完成" :value="2"></el-option>
                  <el-option key="3" label="待作业" :value="3"></el-option>
                  <el-option key="4" label="执行错误" :value="4"></el-option>
                </el-select>
              </div>
              <el-button size="small" style="width: 70px">搜索</el-button>
            </div>
            <el-table :data="rpaData" size="small" style="width: 100%; overflow: hidden" :height="taskTableHeight">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table slot="description" :data="props.row.processStep" :height="212"
                            :row-class-name="tableRowClassName" header-cell-class-name="branchTableHeadCellClass"
                            :border="true" size="mini">
                    <el-table-column prop="id" label="分支任务ID" width="100px"></el-table-column>
                    <el-table-column prop="branchTaskName" label="分支任务名" show-overflow-tooltip></el-table-column>
                    <el-table-column label="状态" width="100px">
                      <template slot-scope="scope">
                        <el-tag :type="formatterStatusTag(scope.row)" close-transition>
                          {{formatterStatutsName(scope.row)}}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="machineName" label="机器名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="IP" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="startTime" label="开始时间" width="120px"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" width="120px"></el-table-column>
                    <el-table-column label="完成度">
                      <template slot-scope="scope">
                        <el-progress :text-inside="true" :stroke-width="18" status="success"
                                     :percentage="scope.row.completeness"></el-progress>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label="任务ID" prop="id" width="80px"></el-table-column>
              <el-table-column label="任务名" prop="taskName" show-overflow-tooltip></el-table-column>
              <el-table-column label="作业机器名" prop="machineName" show-overflow-tooltip></el-table-column>
              <el-table-column label="IP" prop="ip" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态" width="100px">
                <template slot-scope="scope">
                  <el-tag :type="formatterStatusTag(scope.row)" close-transition>{{formatterStatutsName(scope.row)}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="开始时间" prop="startTime" width="120px"></el-table-column>
              <el-table-column label="结束时间" prop="endTime" width="120px"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="divGroupTopRight">
          <p>
            <i class="el-icon-tickets"></i>
            <span class="spTitle">任务消息</span>
          </p>
          <div class="divGroupTopRightContent">
            <el-row v-for="(item ,idx) in rpaMsgData" style="margin-top: 10px">
              <el-col>
                <el-card style="padding: 0px;height: 80px;">
                  <div style="display: flex;justify-content:flex-start;">
                    <img src="../../assets/taskFaild.png" v-if="item.status==4" height="40" width="40"/>
                    <img src="../../assets/taskStart.png" v-else-if="item.status==1" height="40" width="40"/>
                    <img src="../../assets/taskSuccessed.png" v-else-if="item.status==2" height="40" width="40"/>
                    <div style="margin-left: 20px ;width: 100%">
                      <span class="spMsg" maxLen="10">
                        <span>{{item.taskName}}</span> 中的
                        <span>{{ item.branchTaskName }}</span> 在
                        <span>{{item.machineName}} </span>上
                        <span>{{ formatterMsg(item) }}</span>
                      </span>
                      <span class="spMsgTime">{{ item.time }}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="divGroupBottom">
        <el-row class="elrowBottom">
          <el-col style="margin-left: 0px">
            <el-card class="elcardBottomInfo">
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
            <el-card class="elcardBottomInfo">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">今日RPA机器使用情况</span>
              </div>
              <div style="justify-content: center;display: flex;">
                <ve-histogram :data="todayHistogramChartData" height="250px"
                              style="height: 170px;width: 300px;"></ve-histogram>
              </div>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="elcardBottomInfo">
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
            <el-card class="elcardBottomInfo">
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
        },
        searchModel: {
          taskName: '',
          taskStatus: 1,
        },
        taskTableHeight:document.body.scrollHeight -550,
        rpaMsgData: [
          {
            id: '1',
            status: 1,
            machineName: 'RPA1',
            ip: '192.168.1.1',
            time: '2019-01-03 13:01:02',
            taskName: '任务1',
            branchTaskName: '分支任务1',
            msg: '正在进行'
          }
        ],
        rpaData: [{
          id: '1',
          taskName: '任务1',
          machineName: 'RPA1',
          ip: '192.168.1.1',
          status: 1,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              statusName: '已完成',
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 1,
              statusName: '正在作业',
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '--',
              completeness: 40
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              statusName: '待作业',
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              statusName: '待作业',
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '2',
          taskName: '任务2',
          machineName: 'RPA2',
          ip: '192.168.1.1',
          status: 2,
          startTime: '2019-1-1 14:09',
          endTime: '2019-1-1 15:09',
          processStep: [
            {
              id: '5',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '6',
              branchTaskName: '数据入库',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '2019-1-1 14:34',
              completeness: 100
            },
            {
              id: '7',
              branchTaskName: '生成报表',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:34',
              endTime: '2019-1-1 14:56',
              completeness: 100
            },
            {
              id: '8',
              branchTaskName: '导出并发送邮件',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:56',
              endTime: '2019-1-1 15:09',
              completeness: 100
            },
          ],
        }, {
          id: '3',
          taskName: '任务3',
          machineName: 'RPA3',
          ip: '192.168.1.1',
          status: 3,
          startTime: '--',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 3,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 3,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '4',
          taskName: '任务4',
          machineName: 'RPA4',
          ip: '192.168.1.1',
          status: 4,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '2019-1-1 14:36',
              completeness: 100
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 4,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:36',
              endTime: '2019-1-1 14:45',
              completeness: 40
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '5',
          taskName: '任务5',
          machineName: 'RPA5',
          ip: '192.168.1.1',
          status: 1,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 1,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '--',
              completeness: 40
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '6',
          taskName: '任务6',
          machineName: 'RPA6',
          ip: '192.168.1.1',
          status: 1,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 1,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '--',
              completeness: 40
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '7',
          taskName: '任务7',
          machineName: 'RPA6',
          ip: '192.168.1.1',
          status: 1,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 1,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '--',
              completeness: 40
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        }, {
          id: '8',
          taskName: '任务8',
          machineName: 'RPA6',
          ip: '192.168.1.1',
          status: 1,
          startTime: '2019-1-1 14:09',
          endTime: '--',
          processStep: [
            {
              id: '1',
              branchTaskName: '拉取支付宝流水',
              status: 2,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:09',
              endTime: '2019-1-1 14:15',
              completeness: 100
            },
            {
              id: '2',
              branchTaskName: '数据入库',
              status: 1,
              machineName: 'RPA1',
              ip: '192.168.1.1',
              startTime: '2019-1-1 14:15',
              endTime: '--',
              completeness: 40
            },
            {
              id: '3',
              branchTaskName: '生成报表',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
            {
              id: '4',
              branchTaskName: '导出并发送邮件',
              status: 3,
              machineName: '',
              ip: '192.168.1.1',
              startTime: '--',
              endTime: '--',
              completeness: 0
            },
          ],
        },]
      }
    },
    components: {},
    created() {
      this.timerInsertMsgData();
    },
    methods: {
      timerInsertMsgData() {
        return setInterval(() => {
          this.insertMsgData()
        }, 5000)
      },
      insertMsgData() {
        let newStatus = this.rpaMsgData.length % 3;
        if (newStatus == 3 || newStatus == 0) newStatus = 4;
        let msg = {
          id: this.rpaMsgData.length,
          status: newStatus,
          machineName: 'RPA1',
          time: '2019-01-03 13:01:02',
          taskName: '任务' + (this.rpaMsgData.length + 1),
          branchTaskName: '分支任务' + (this.rpaMsgData.length + 1),
          msg: '正在进行'
        }

        this.rpaMsgData.splice(0, 0, msg);
      },
      formatterMsg(row) {
        switch (row.status) {
          case 1:
            return "开始作业！"
          case 2:
            return "完成作业！"
          case 3:
            return "等待作业！"
          case 4:
            return "执行错误！"
        }
      },
      formatterStatutsName(row) {
        switch (row.status) {
          case 1:
            return '作 业 中';
          case 2:
            return '已 完 成';
          case 3:
            return '待 作 业';
          case 4:
            return '执行错误';
        }
      },
      formatterStatusTag(row) {
        switch (row.status) {
          case 1:
            return '';
          case 2:
            return 'success';
          case 3:
            return 'info';
          case 4:
            return 'danger';
        }
      },
      tableRowClassName({row, rowIndex}) {
        switch (row.status) {
          case 1:
            return 'branchTableRowWorkingClass';
          case 2:
            return 'branchTableRowSuccessClass';
          case 3:
            return 'branchTableRowWaitingClass';
          case 4:
            return 'branchTableRowErrorClass';
        }
      }
    },
    computed: {}
  }
</script>

<style>

  .taskMonitor .branchTableRowSuccessClass {
    color: #14ce14;
  }

  .taskMonitor .branchTableRowWorkingClass {
    color: #409EFF;
    font-weight: bold;
  }

  .taskMonitor .branchTableRowWaitingClass {
    color: #b4b5b8;
  }

  .taskMonitor .branchTableRowErrorClass {
    color: #d14525;
  }

  .taskMonitor .branchTableHeadCellClass {
    color: #1c74d1;

  }

  .taskMonitor {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .taskMonitor .elrowBottom {
    height: 270px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .taskMonitor .elrowBottom .el-col {
    /*width: calc(50% - 10px);*/
    margin-left: 20px;
  }

  .taskMonitor .elrowBottom .elcardBottomInfo {
    padding: 0 10px 10px 10px;
    min-width: 230px;
    max-width: 500px;
    margin: auto;
  }

  .taskMonitor .elrowBottom .elcardBottomInfo p {
    font-size: 15px;
    font-weight: bold;
    margin-top: -10px;
  }

  .taskMonitor .elrowBottom .elcardBottomInfo ul {
    list-style: none
  }

  .taskMonitor .elrowBottom .elcardBottomInfo li {
    height: 20px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 13px;
  }

  .taskMonitor .elrowBottom .elcardBottomInfo .el-card__header {
    padding: 10px 20px;
  }

  .taskMonitor .divGroup {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .taskMonitor .divGroupTop {
    height: calc(100% - 300px);
    display: flex;
    justify-content: start;
    background-color: #ffffff;
    padding: 10px;
  }

  .taskMonitor .divGroupTopLeft, .taskMonitor .divGroupTopRight {
    padding: 0 10px 20px 10px;
  }

  .taskMonitor .divGroupTopLeft {
    width: calc(100% - 350px);
    overflow: hidden;
  }

  .taskMonitor .divGroupTopRight {
    width: 350px;
    margin-left: 10px;
  }

  .taskMonitor .divGroupTopLeftContent, .taskMonitor .divGroupTopRightContent {
    border: 1px solid #e5e9f2;
    padding: 10px 20px;
    overflow: auto;
    height: calc(100% - 50px);
  }

  .taskMonitor .divGroupTopLeftSearch {
    margin-bottom: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e9f2;
  }

  .taskMonitor .spMsg {
    font-size: 12px;
    display: block;
  }

  .taskMonitor .spMsg span {
    color: red;
    font-weight: bold;
  }

  .taskMonitor .spMsgTime {
    display: block;
    position: absolute;
    right: 20px;
    top: 60px;
    font-size: 11px;
    color: #a5a7a9;
  }
</style>
