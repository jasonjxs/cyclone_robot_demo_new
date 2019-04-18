<template>
  <div class="taskMonitor">
    <div class="divGroup">
      <el-row :gutter="10">
        <el-col :span="18">
          <div>
            <div>
              <i class="el-icon-tickets"></i>
              <span class="spTitle">任务列表</span>
            </div>
            <div class="divGroupTopLeftContent">
              <div class="divGroupTopLeftSearch">
                <div>
                  <el-input
                    v-model="searchModel.taskName"
                    style="width: 150px"
                    size="small"
                    placeholder="任务名称"
                  ></el-input>
                  <el-select
                    v-model="searchModel.taskStatus"
                    style="width: 150px"
                    no-data-text="正在作业"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option key="0" label="全部" :value="0"></el-option>
                    <el-option key="1" label="作业中" :value="1"></el-option>
                    <el-option key="2" label="已完成" :value="2"></el-option>
                    <el-option key="3" label="待作业" :value="3"></el-option>
                    <el-option key="4" label="执行错误" :value="4"></el-option>
                  </el-select>
                </div>
                <el-button size="small" style="width: 70px">搜索</el-button>
              </div>
              <el-table
                :data="rpaData"
                size="small"
                style="width: 100%; overflow: hidden"
                :height="taskTableHeight"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table
                      slot="description"
                      :data="props.row.processStep"
                      :height="212"
                      :row-class-name="tableRowClassName"
                      header-cell-class-name="branchTableHeadCellClass"
                      :border="true"
                      size="mini"
                    >
                      <el-table-column prop="id" label="分支任务ID" width="100px"></el-table-column>
                      <el-table-column prop="branchTaskName" label="分支任务名" show-overflow-tooltip></el-table-column>
                      <el-table-column label="状态" width="100px">
                        <template slot-scope="scope">
                          <el-tag
                            :type="formatterStatusTag(scope.row)"
                            close-transition
                          >{{formatterStatutsName(scope.row)}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column prop="machineName" label="机器名" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="ip" label="IP" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip ></el-table-column>
                      <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip ></el-table-column>
                      <el-table-column label="完成度">
                        <template slot-scope="scope">
                          <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            status="success"
                            :percentage="scope.row.completeness"
                          ></el-progress>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="任务ID" prop="id" width="60px"></el-table-column>
                <el-table-column label="任务名" prop="taskName" show-overflow-tooltip></el-table-column>
                <el-table-column label="作业机器名" prop="machineName" show-overflow-tooltip></el-table-column>
                <el-table-column label="IP" prop="ip"></el-table-column>
                <el-table-column label="状态" width="80px">
                  <template slot-scope="scope">
                    <el-tag
                      :type="formatterStatusTag(scope.row)"
                      close-transition
                    >{{formatterStatutsName(scope.row)}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="开始时间" prop="startTime" width="80px"></el-table-column>
                <el-table-column label="结束时间" prop="endTime" width="80px"></el-table-column>
                <el-table-column label="操作" width="50" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      style="font-size: 12px"
                      @click="dialogFormVisible = true"
                    >查看</el-button>
                    <!--                  <a style="margin-left: 2px">终止</a>-->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
            <div>
              <i class="el-icon-tickets"></i>
              <span class="spTitle">任务消息</span>
            </div>
            <div class="divGroupTopRightContent">
              <div class="divGroupTopRightContentElRow">
                <el-row v-for="(item ,idx) in rpaMsgData" style="margin-top: 10px">
                  <el-col>
                    <el-card style="padding-right: 10px; height: 80px;">
                      <div style="display: flex;justify-content:flex-start;">
                        <img
                          src="../../assets/taskFaild.png"
                          v-if="item.status==4"
                          height="30"
                          width="30"
                        >
                        <img
                          src="../../assets/taskStart.png"
                          v-else-if="item.status==1"
                          height="30"
                          width="30"
                        >
                        <img
                          src="../../assets/taskSuccessed.png"
                          v-else-if="item.status==2"
                          height="30"
                          width="30"
                        >
                        <div style="margin-left: 20px ;width: 100%">
                          <span class="spMsg" maxLen="10">
                            <span>{{item.taskName}}</span> 中的
                            <span>{{ item.branchTaskName }}</span> 在
                            <span>{{item.machineName}}</span>上
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
        </el-col>
      </el-row>
      <div class="divGroupBottom">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card class="elcardBottomInfo">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">今日任务</span>
              </div>
              <div style="justify-content: center;display: flex;">
                <div ref="todayPieChart" style="height: 230px; width: 100%;"></div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="elcardBottomInfo">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">今日RPA机器使用情况</span>
              </div>
              <div style="justify-content: center;display: flex;">
              <div ref="todayBarChart" style="height: 230px; width: 100%;"></div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="elcardBottomInfo">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">历史任务</span>
              </div>
              <div style="justify-content: center;display: flex;">
                <div ref="historyPieChart" style="height: 230px; width: 100%;"></div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="elcardBottomInfo">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">历史RPA机器使用情况</span>
              </div>
              <div style="justify-content: center;display: flex;">
                <div ref="historyBarChart" style="height: 230px; width: 100%;"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog title="任务代码" width="900px" :visible.sync="dialogFormVisible">
      <div class="divDialogTaskInfo">
        <!--        <p style="margin-left: 0px">任务名：</p>-->
        <p style="margin-left: 0px">机器名：RPA1</p>
        <p>开始时间：2019-01-01 15:03:56</p>
        <p>结束时间：- -</p>
        <p>
          作业状态：
          <span style="color: blue;">作业中</span>
        </p>
        <p>
          正在执行的步骤：
          <span style="color: blue;">拉取支付宝流水</span>
        </p>
      </div>

      <div class="divDialog">
        <div class="divDialogGroup">
          <p>任务名：任务1</p>
          <el-steps direction="vertical" :active="activeRpaStepNum" style="height: 400px;">
            <div v-for="(item,idx) in taskProcessStep">
              <el-step
                :title="item.title"
                style="cursor: pointer;"
                @click.native="elStepClick(item)"
              >
                <div slot="title" class="divDialogGroupElStepTitle">
                  <div style="position: absolute;top: 8px;line-height: 30px; left: 50px;">
                    <img
                      src="../../assets/taskStepStart.png"
                      v-if="item.nodeType==1"
                      height="20"
                      width="20"
                    >
                    <img
                      src="../../assets/taskStepWorking.png"
                      v-else-if="item.nodeType==2"
                      height="20"
                      width="20"
                    >
                    <img
                      src="../../assets/taskStepEnd.png"
                      v-else-if="item.nodeType==3"
                      height="20"
                      width="20"
                    >
                  </div>
                  <span>{{ item.title }}</span>
                </div>
                <div
                  slot="description"
                  v-if="item.description.length>0"
                  :class="idx==taskProcessStep.length-1 ? 'divDialogGroupElStepDes-last': 'divDialogGroupElStepDes'"
                >
                  <span>{{ item.description }}</span>
                </div>
              </el-step>
              <div v-if="idx<taskProcessStep.length-1" class="divDialogGroupStepLine"></div>
            </div>
          </el-steps>
        </div>
        <div class="divDialogGroup">
          <p>步骤名：{{ activeRpaStepCodeOption.title }}</p>
          <el-steps direction="vertical" :active="activeRpaStepCodeOption.rpaCode.length">
            <div style v-for="(item,idx) in activeRpaStepCodeOption.rpaCode">
              <el-step :title="item.title">
                <div slot="title" class="divDialogGroupElStepTitle">
                  <span>{{ item.title }}</span>
                </div>
                <div
                  slot="description"
                  v-if="item.input.length>0"
                  :class="idx==activeRpaStepCodeOption.rpaCode.length-1 ? 'divDialogGroupElStepDes-last': 'divDialogGroupElStepDes'"
                  style="text-align: left"
                >
                  <p>{{ item.input }}</p>
                  <p>{{ item.output }}</p>
                </div>
              </el-step>
              <div
                v-if="idx < activeRpaStepCodeOption.rpaCode.length-1"
                class="divDialogGroupStepLine"
              ></div>
            </div>
          </el-steps>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      taskProcessStep: [
        {
          id: "1",
          title: "开始",
          description: "",
          rpaCode: [
            { id: 1, title: "流程开始", input: "入参@ ", output: "出参@ " }
          ],
          nodeType: 1
        },
        {
          id: "2",
          title: "预处理",
          description: "",
          rpaCode: [
            { id: 2, title: "预处理数据", input: "入参@ ", output: "出参@ " }
          ],
          nodeType: 2
        },
        {
          id: "3",
          title: "登录ERP系统",
          description: "出参（登录是否成功）",
          rpaCode: [
            {
              id: 2,
              title: "打开ERP",
              input: '入参@ {"soft"："ERP.exe"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 3,
              title: "登录ERP",
              input: '入参@ {"account"："admin","pwd"："admin"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 4,
              title: "判断登录是否成功",
              input: '入参@ {"code":200}',
              output: '出参@ {"code":200}'
            }
          ],
          nodeType: 2
        },
        {
          id: "4",
          title: "拉取支付宝流水",
          description: "出参（支付宝流水集合）",
          rpaCode: [
            {
              id: 5,
              title: "打开浏览器",
              input: '入参@ {"soft":"chrome.exe"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 6,
              title: "输入网址",
              input: '入参@ {"siteaddr"："http://auth.alipay.com"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 7,
              title: "登录支付宝",
              input: '入参@ {"account":"jason1234","pwd":"123456"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 8,
              title: "点击拉取支付宝流水",
              input: '入参@ {"oper":"alipay_water"}',
              output: '出参@ {"list":[object]}'
            },
            {
              id: 9,
              title: "存储至本地文件",
              input:
                '入参@ {"save_txt":"D:\\alipay_water\\2019-01-01 16:03:23.txt"}',
              output: '出参@ {"code":200}'
            }
          ],
          nodeType: 2
        },
        {
          id: "6",
          title: "入库",
          description: "出参（入库是否成功）",
          rpaCode: [
            {
              id: 10,
              title: "打开本地程序",
              input: '入参@ {"soft":"alipay_water.exe"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 11,
              title: "存储支付宝流水",
              input:
                '入参@ {"file_path":"D:\\alipay_water\\2019-01-01 16:03:23.txt"}',
              output: '出参@ {"code":200}'
            }
          ],
          nodeType: 2
        },
        {
          id: "7",
          title: "生成报表并Email",
          description: "出参（生成是否成功）",
          rpaCode: [
            {
              id: 12,
              title: "打开报表系统",
              input: '入参@ {"soft":"alipay_water_report.exe"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 13,
              title: "生成报表",
              input: '入参@ {"oper":"generate_report","datatime":"2019-01-01"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 14,
              title: "导出报表",
              input: '入参@ {"oper":"export_report"}',
              output:
                '出参@ {"code":200,"filePath":"D:\\alipay_water_report\\alipay_water_2019-01-01.excel"}'
            },
            {
              id: 15,
              title: "打开outlook",
              input: '入参@ {"soft":"outlook.exe"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 16,
              title: "新建邮件",
              input:
                '入参@ {"oper":"create_email","title":"2019-01-01支付宝流水","receiver":"123@cyclone-robotics.com","attachment":"alipay_water_2019-01-01.excel"}"}',
              output: '出参@ {"code":200}'
            },
            {
              id: 17,
              title: "发送邮件",
              input: '入参@ {"oper":"send_email"}',
              output: '出参@ {"code":200}'
            }
          ],
          nodeType: 2
        },
        {
          id: "9",
          title: "任务结束",
          description: "",
          rpaCode: [
            { id: 1, title: "任务结束", input: "入参@ ", output: "出参@ " }
          ],
          nodeType: 3
        }
      ],
      activeRpaStepCodeOption: [],
      activeRpaStepNum: 3,
      dialogFormVisible: false,
      searchModel: {
        taskName: "",
        taskStatus: 1
      },
      taskTableHeight: document.body.scrollHeight - 505,
      rpaMsgData: [
        {
          id: "1",
          status: 1,
          machineName: "RPA1",
          ip: "192.168.1.1",
          time: "2019-01-03 13:01:02",
          taskName: "任务1",
          branchTaskName: "分支任务1",
          msg: "正在进行"
        }
      ],
      rpaData: [
        {
          id: "1",
          taskName: "任务1",
          machineName: "RPA1",
          ip: "192.168.1.1",
          status: 1,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              statusName: "已完成",
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 1,
              statusName: "正在作业",
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "--",
              completeness: 40
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              statusName: "待作业",
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              statusName: "待作业",
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "2",
          taskName: "任务2",
          machineName: "RPA2",
          ip: "192.168.1.1",
          status: 2,
          startTime: "2019-1-1 14:09",
          endTime: "2019-1-1 15:09",
          processStep: [
            {
              id: "5",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "6",
              branchTaskName: "数据入库",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "2019-1-1 14:34",
              completeness: 100
            },
            {
              id: "7",
              branchTaskName: "生成报表",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:34",
              endTime: "2019-1-1 14:56",
              completeness: 100
            },
            {
              id: "8",
              branchTaskName: "导出并发送邮件",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:56",
              endTime: "2019-1-1 15:09",
              completeness: 100
            }
          ]
        },
        {
          id: "3",
          taskName: "任务3",
          machineName: "RPA3",
          ip: "192.168.1.1",
          status: 3,
          startTime: "--",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 3,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 3,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "4",
          taskName: "任务4",
          machineName: "RPA4",
          ip: "192.168.1.1",
          status: 4,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "2019-1-1 14:36",
              completeness: 100
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 4,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:36",
              endTime: "2019-1-1 14:45",
              completeness: 40
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "5",
          taskName: "任务5",
          machineName: "RPA5",
          ip: "192.168.1.1",
          status: 1,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 1,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "--",
              completeness: 40
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "6",
          taskName: "任务6",
          machineName: "RPA6",
          ip: "192.168.1.1",
          status: 1,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 1,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "--",
              completeness: 40
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "7",
          taskName: "任务7",
          machineName: "RPA6",
          ip: "192.168.1.1",
          status: 1,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 1,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "--",
              completeness: 40
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        },
        {
          id: "8",
          taskName: "任务8",
          machineName: "RPA6",
          ip: "192.168.1.1",
          status: 1,
          startTime: "2019-1-1 14:09",
          endTime: "--",
          processStep: [
            {
              id: "1",
              branchTaskName: "拉取支付宝流水",
              status: 2,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:09",
              endTime: "2019-1-1 14:15",
              completeness: 100
            },
            {
              id: "2",
              branchTaskName: "数据入库",
              status: 1,
              machineName: "RPA1",
              ip: "192.168.1.1",
              startTime: "2019-1-1 14:15",
              endTime: "--",
              completeness: 40
            },
            {
              id: "3",
              branchTaskName: "生成报表",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            },
            {
              id: "4",
              branchTaskName: "导出并发送邮件",
              status: 3,
              machineName: "",
              ip: "192.168.1.1",
              startTime: "--",
              endTime: "--",
              completeness: 0
            }
          ]
        }
      ]
    };
  },
  components: {},
  created() {
    this.timerInsertMsgData();
    this.activeRpaStepCodeOption = this.taskProcessStep[this.activeRpaStepNum];
  },
  mounted() {
    this.todayPieChart = echarts.init(this.$refs.todayPieChart);
    this.todayPieChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ["#19d4ae", "#fa6e86", "#008000", "#ffb980"],
      legend: {
        orient: 'horizontal',
        data: ['成功', '失败', '已完成', '待运行'],
      },
      tooltip: {
        position: ['30%', '20%']
      },
      series: [
        {
          name: '运行结果',
          type: 'pie',
          seletedMode: 'single',
          radius: [0, '30%'],
          label: {
            normal: {
              position: 'inner',
              fontSize: 10
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 99, name: '成功' },
            { value: 21, name: '失败' }
          ],
          center: ['50%', '72%']
        },
        {
          center: ['50%', '72%'],
          name: '运行状态',
          type: 'pie',
          seletedMode: 'single',
          radius: ['40%', '55%'],
          // label: {
          //   normal: {
          //     show: false
          //   }
          // },
          // labelLine: {
          //   normal: {
          //     show: false
          //   }
          // },
          data: [
            { value: 120, name: '已完成' },
            { value: 30, name: '待运行' }
          ]
        }
      ]
    });

    this.todayBarChart = echarts.init(this.$refs.todayBarChart);
    this.todayBarChart.setOption({
      color: ['#19d4ae'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          position: ['30%', 0]
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['RPA1', 'RPA2', 'RPA3', 'RPA4', 'RPA5', 'RPA6'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'次数',
              type:'bar',
              data:[28, 31, 2, 10, 41, 36],
          }
      ]
    });

    this.historyPieChart = echarts.init(this.$refs.historyPieChart);
    this.historyPieChart.setOption({
      color: ["#19d4ae", "#fa6e86", "#008000"],
      legend: {
        orient: 'horizontal',
        data: ['成功', '失败', '未运行'],
      },
      tooltip: {
        position: ['30%', '20%']
      },
      series: [
        {
          center: ['50%', '72%'],
          name: '任务状态',
          type: 'pie',
          radius: '55%',
          // label: {
          //   normal: {
          //     fontSize: 10
          //   }
          // },
          // labelLine: {
          //   normal: {
          //     show: false
          //   }
          // },
          data: [
            { value: 2001, name: '成功' },
            { value: 102, name: '失败' },
            { value: 325, name: '未运行' }
          ]
        },
      ]
    });

    this.historyBarChart = echarts.init(this.$refs.historyBarChart);
    this.historyBarChart.setOption({
      color: ['#19d4ae'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          position: ['30%', 0]
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['RPA1', 'RPA2', 'RPA3', 'RPA4', 'RPA5', 'RPA6'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'次数',
              type:'bar',
              data:[405, 600, 98, 106, 356, 789],
          }
      ]
    });
  },
  destroyed() {
    this.todayPieChart.dispose();
    this.todayBarChart.dispose();
    this.historyPieChart.dispose();
    this.historyBarChart.dispose();
  },
  methods: {
    elStepClick(row) {
      this.activeRpaStepCodeOption = {};
      this.activeRpaStepCodeOption = row;
    },
    timerInsertMsgData() {
      return setInterval(() => {
        this.insertMsgData();
      }, 5000);
    },
    insertMsgData() {
      let newStatus = this.rpaMsgData.length % 3;
      if (newStatus == 3 || newStatus == 0) newStatus = 4;
      let msg = {
        id: this.rpaMsgData.length,
        status: newStatus,
        machineName: "RPA1",
        time: "2019-01-03 13:01:02",
        taskName: "任务" + (this.rpaMsgData.length + 1),
        branchTaskName: "分支任务" + (this.rpaMsgData.length + 1),
        msg: "正在进行"
      };

      this.rpaMsgData.splice(0, 0, msg);
    },
    formatterMsg(row) {
      switch (row.status) {
        case 1:
          return "开始作业！";
        case 2:
          return "完成作业！";
        case 3:
          return "等待作业！";
        case 4:
          return "执行错误！";
      }
    },
    formatterStatutsName(row) {
      switch (row.status) {
        case 1:
          return "作 业 中";
        case 2:
          return "已 完 成";
        case 3:
          return "待 作 业";
        case 4:
          return "执行错误";
      }
    },
    formatterStatusTag(row) {
      switch (row.status) {
        case 1:
          return "";
        case 2:
          return "success";
        case 3:
          return "info";
        case 4:
          return "danger";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      switch (row.status) {
        case 1:
          return "branchTableRowWorkingClass";
        case 2:
          return "branchTableRowSuccessClass";
        case 3:
          return "branchTableRowWaitingClass";
        case 4:
          return "branchTableRowErrorClass";
      }
    }
  },
  computed: {}
};
</script>

<style>
.taskMonitor .branchTableRowSuccessClass {
  color: #14ce14;
}

.taskMonitor .branchTableRowWorkingClass .el-progress.is-success .el-progress-bar__inner {
  background-color: #409eff;
}

.taskMonitor .branchTableRowWorkingClass {
  color: #409eff;
  /* font-weight: bold; */
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
  list-style: none;
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
  /* overflow: auto; */
}

.taskMonitor .divGroupTop {
  height: calc(100% - 300px);
  display: flex;
  justify-content: start;
  /*padding: 10px;*/
}

.taskMonitor .divGroupTopLeft,
.taskMonitor .divGroupTopRight {
  /*padding: 0px 10px 20px 10px;*/
  /*background-color: red;*/
}

.taskMonitor .divGroupTopLeft {
  width: calc(100% - 300px);
  overflow: hidden;
}

.taskMonitor .divGroupTopRight {
  width: 300px;
  margin-left: 20px;
  overflow: hidden;
}

.taskMonitor .divGroupTopLeftContent,
.taskMonitor .divGroupTopRightContent {
  /*border: 1px solid #e5e9f2;*/
  background-color: #ffffff;
  padding: 10px 20px;
  overflow: hidden;
  height: calc(100% - 55px);
  margin-top: 10px;
}

.taskMonitor .divGroupTopRightContentElRow {
  /* margin-bottom: 10px; */
  height: calc(100vh - 450px);
  overflow: auto;
  padding-right: 10px;
  width: 100%;
}

.taskMonitor .divGroupTopRightContentElRow .el-card img {
  margin-top: -5px;
}

.taskMonitor .divGroupTopLeftSearch {
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e9f2;
}

.taskMonitor .spMsg {
  font-size: 10px;
  display: block;
  position: absolute;
  top: 9px;
  /*right: 10px;*/
  margin-right: 10px;
}

.taskMonitor .spMsg span {
  color: red;
  font-weight: bold;
}

.taskMonitor .spMsgTime {
  display: block;
  position: absolute;
  right: 20px;
  bottom: 4px;
  font-size: 11px;
  color: #a5a7a9;
}

.taskMonitor .divDialog {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;
}

.taskMonitor .divDialogGroup {
  width: 47%;
  height: 90%;
  padding: 20px 10px;
  overflow-x: hidden;
  border: 1px solid #e5e9f2;
}

.taskMonitor .el-step__main {
  width: 200px;
}
.taskMonitor .el-steps {
  height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.taskMonitor .el-step__title.is-finish,
.taskMonitor .el-step__description.is-finish {
  color: #333333;
}
.taskMonitor .el-step__title.is-process,
.taskMonitor .el-step__description.is-process {
  color: red;
}

.taskMonitor .divDialogGroup .el-step__head {
  display: none;
}

.taskMonitor .divDialogGroupElStepTitle {
  background-color: #c4c7c9;
  padding: 5px 10px;
  font-size: 13px;
  display: flex;
  justify-content: center;
}

.taskMonitor .divDialogTaskInfo {
  display: flex;
  justify-content: flex-start;
}
.taskMonitor .divDialogTaskInfo p {
  margin-left: 30px;
}

.taskMonitor .divDialogGroupElStepDes,
.taskMonitor .divDialogGroupElStepDes-last {
  width: 100%;
  /*height: 25px;*/
  border: 1px solid #ebecee;
  text-align: center;
  margin-bottom: 3px;
}

.taskMonitor .divDialogGroupElStepDes {
  padding: 5px 17px;
}

.taskMonitor .divDialogGroupElStepDes-last {
  padding: 5px 0;
}

.taskMonitor .divDialogGroupStepLine {
  height: 30px;
  width: 2px;
  background-color: #c1c1c1;
  margin: 0 0 2px 200px;
}

.taskMonitor .divGroupBottom {
  margin-top: 20px;
}

.divGroupBottom .el-card>.el-card__header {
  padding: 5px 20px;
}

.divGroupTopLeftContent .el-tag {
  padding-left: 4px;
  padding-right: 4px;
}

.divGroupBottom .el-card__body {
  padding: 5px;
}

</style>
