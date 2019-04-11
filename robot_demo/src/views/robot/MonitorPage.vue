<template>
  <LRStructMaster>

    <div slot="slotLeftTitle">
      <i class="el-icon-tickets"></i>
      <span class="spTitle">服务器列表</span>
    </div>

    <div slot="slotLeftRefresh">
      <i class="el-icon-refresh"></i>
      <a>刷新</a>
    </div>

    <div slot="slotLeftInfo">
      <div>
        <el-input v-model="machineName" placeholder="搜索服务器" size="small"
                  style="width:250px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-row :class="item.isSelected?'elrow-class_hover':'elrow-class'"
                v-for="item in rpaMachineList" @click.native="rpaMachineClick(item.id)">
          <el-col>
            <el-card class="elcard-class">
              <ul>
                <li><img src="../../assets/computer.png" class="image"/></li>
                <li style="margin-left: 10px;padding-top: 3px">
                  <span>{{ item.title }} / {{ item.ip }} / {{ item.status }} </span>
                  <span>{{ item.sysVersion }}</span>
                  <span>{{item.sysDigit}} / {{item.storage}}</span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <div slot="slotRightTitle">
      <i class="el-icon-service"></i>
      <span class="spTitle">监控区</span>
    </div>

    <div slot="slotRightInfo">
      <div class="divRightTop">
        <p style="color: dodgerblue ;">实时监控</p>
        <div style="display: flex;justify-content: flex-start">
          <p>
            <span class="spanRapInfoVal">{{rpaMachineSelecedOption.title}}</span>
            <span class="spanRapInfoVal" style="color: red">{{rpaMachineSelecedOption.status}}</span>
          </p>
          <ul class="ulBtn">
            <li>
              <img src="../../assets/close1.jpg" @click="bindData()" title="关闭执行器"/>
            </li>
            <li>
              <img src="../../assets/restart.png" @click="clearData()" title="重启执行器"/>
            </li>
            <li>
              <img src="../../assets/close.png" title="强制关闭系统"/>
            </li>
            <li>
              <img src="../../assets/restart1.png" title="强制关闭并重启"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="divRightInfo divRightInfoGb">
        <div class="divRightInfo_contentTopLeft">
          <div style="width: 210px">
            <div class="block">
              <el-date-picker v-model="selectData"
                              type="date"
                              size="small"
                              placeholder="选择日期"
                              style="width: 180px" @change="selectDataChanged">
              </el-date-picker>
              <div style="margin-top: 30px;height: 130px">
                <ve-pie :data="dayChartData" :settings="dayChartSettings"></ve-pie>
              </div>
              <div style="margin-top: 40px;margin-left: 20px;font-weight: bold;font-size: 14px;">
                <p style="color: green">作业：{{ dayTotalWorkMinutes }}</p>
                <p style="color: #b8b81e">空闲：{{ dayTotalFreeMinutes }}</p>
                <p style="color: red">关机：{{ dayTotalCloseMinutes }}</p>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 90%;margin: 0 20px;height: 340px;">
          <ve-histogram :data="hourChartData" :settings="hourChartSettings"></ve-histogram>
        </div>
      </div>
      <div class="divChartComputer">
        <div class="divLineComputer">
          <p>CPU</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">总利用率：100%</p>
            <ve-line class="lineInfo" :data="cpuChartData" :height="lineHeight" :width="lineWidth"
                     :settings="cpuChartSettings"></ve-line>
          </div>
        </div>
        <div class="divLineComputer">
          <p>内存</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">当前可用内存：5G</p>
            <ve-line class="lineInfo" :data="storgeChartData" :height="lineHeight" :width="lineWidth"
                     :settings="storgeChartSettings"></ve-line>
          </div>
        </div>
      </div>
      <div class="divChartComputer">
        <div class="divLineComputer">
          <p>磁盘</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">磁盘总空间：502G 写入速度：800.02K/s</p>
            <p style="margin-left: 20px;margin-top: -10px">可用磁盘空间：487.09G 读取速度：0.00K/s</p>
            <ve-line class="lineInfo" :data="diskChartData" :height="lineHeight" :width="lineWidth"
                     :settings="diskChartSettings"></ve-line>
          </div>
        </div>
        <div class="divLineComputer">
          <p>网络</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">接收速度：421.64k/s 上传速度：421.93k/s</p>
            <ve-line class="lineInfo" :data="netChartData" :height="lineHeight" :width="lineWidth"
                     :settings="netChartSettings"></ve-line>
          </div>
        </div>
      </div>
      <div class="divChartComputer">
        <div class="divLineComputer">
          <p>是否连接中控</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">是否连接中控：是</p>
            <ve-line class="lineInfo" :data="linkChartData" :height="lineHeight" :width="lineWidth"
                     :settings="linkChartSettings"></ve-line>
          </div>
        </div>
        <div class="divLineComputer">
          <p>是否执行任务</p>
          <div class="divLineComputerChart">
            <p style="margin-left: 20px">是否执行任务：是</p>
            <ve-line class="lineInfo" :data="workChartData" :height="lineHeight" :width="lineWidth"
                     :settings="workChartSettings"></ve-line>
          </div>
        </div>
      </div>
    </div>
  </LRStructMaster>
</template>


<script>
  import LRStructMaster from '../../components/master/LRStructMaster'

  export default {
    data() {
      this.hourChartSettings = {
        // axisSite: { right: ['关机'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['分钟数'],
        stack: {'监控': ['作业', '空闲', '关机']},
      }
      this.dayChartSettings = {
        radius: 40,
        offsetY: 100,
        level: [
          ['作业', '空闲', '关机'],
        ]
      }
      this.cpuChartSettings = {
        height: '50px',
      }
      this.storgeChartSettings = {
        height: '50px',
      }
      this.diskChartSettings = {
        height: '50px',
      }
      this.netChartSettings = {
        height: '50px',
      }
      this.linkChartSettings = {
        height: '50px',
      }
      this.workChartSettings = {
        height: '50px',
      }
      return {
        machineName: '',//搜索服务器的名字
        //左边列表rpa服务器列表数据
        rpaMachineList: [
          {
            id: 1,
            title: 'rpa1',
            ip: '192.16.1.1',
            sysVersion: 'Microsoft Windows 7旗舰版',
            sysDigit: '32-bit',
            storage: '4 G',
            status: '空闲',
            isSelected: true
          },
          {
            id: 2,
            title: 'rpa2',
            ip: '192.16.1.2',
            sysVersion: 'Microsoft Windows 10专业版',
            sysDigit: '64-bit',
            storage: '64 G',
            status: '作业',
            isSelected: false
          },
          {
            id: 3,
            title: 'rpa3',
            ip: '192.16.1.3',
            sysVersion: 'Microsoft Windows 10企业版',
            sysDigit: '64-bit',
            storage: '32 G',
            status: '关机',
            isSelected: false
          },
          {
            id: 4,
            title: 'rpa4',
            ip: '192.16.1.4',
            sysVersion: 'Microsoft Windows 10旗舰版',
            sysDigit: '32-bit',
            storage: '4 G',
            status: '作业',
            isSelected: false
          },
        ],
        rpaMachineSelecedOption: {},
        hourChartData: {
          columns: ['小时', '作业', '空闲', '关机'],
          rows: [
          ]
        },
        dayChartData: {
          columns: ['类型', '分钟数'],
          rows: []
        },
        selectData: new Date(),
        dayTotalWorkMinutes: '',
        dayTotalFreeMinutes: '',
        dayTotalCloseMinutes: '',
        lineHeight: '240px',
        lineWidth: '98%',
        cpuChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
        storgeChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
        diskChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
        netChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
        linkChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
        workChartData: {
          columns: ['时间', '使用率'],
          rows: []
        },
      }
    },
    components: {
      LRStructMaster
    },
    created() {
      this.rpaMachineSelecedOption = this.rpaMachineList[0]
      this.selectDataChanged(this.selectData)
      this.manyChartData(1);
      this.bindHourCharData(1);
    },
    methods: {
      rpaMachineClick(id) {
        for (let index in this.rpaMachineList) {
          if (this.rpaMachineList[index].id == id) {
            this.rpaMachineList[index].isSelected = true
            this.rpaMachineSelecedOption = this.rpaMachineList[index]
          } else {
            this.rpaMachineList[index].isSelected = false
          }
        }
        this.manyChartData(id);
        this.hourChartData.rows = [];
        let t = this;
        setTimeout(() => {
          t.bindHourCharData(1)
        }, 500);
      },
      bindHourCharData(id){
        this.hourChartData.rows = [];
        for (let i = 0; i < 24; i++) {
          let totalMinutes = 60;
          let workMinutes = Math.floor(Math.random() * 60)
          let freeMinutes = Math.floor(Math.random() * (totalMinutes - workMinutes))
          let closeMinutes = totalMinutes - workMinutes - freeMinutes

          this.hourChartData.rows[i] = {'小时': '0', '作业': workMinutes, '空闲': freeMinutes, '关机': closeMinutes};
        }
        this.selectDataChanged('');
      },
      manyChartData(id) {
        this.cpuChartData.rows = [];
        this.storgeChartData.rows = [];
        this.diskChartData.rows = [];
        this.netChartData.rows = [];
        this.linkChartData.rows = [];
        this.workChartData.rows = [];

        for (let index = 0; index < 60; index++) {
          this.cpuChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
          this.storgeChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
          this.diskChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
          this.netChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
          this.linkChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
          this.workChartData.rows.push({'时间': index, '使用率': Math.floor(Math.random() * 100)})
        }
      },
      selectDataChanged(val) {
        this.dayChartData.rows = []
        let dayTotalMinutes = {'作业': 0, '空闲': 0, '关机': 0,}
        for (let index in this.hourChartData.rows) {
          dayTotalMinutes['作业'] += this.hourChartData.rows[index]['作业']
          dayTotalMinutes['空闲'] += this.hourChartData.rows[index]['空闲']
          dayTotalMinutes['关机'] += this.hourChartData.rows[index]['关机']
        }
        this.dayChartData.rows.push({'类型': '作业', '分钟数': dayTotalMinutes['作业']})
        this.dayChartData.rows.push({'类型': '空闲', '分钟数': dayTotalMinutes['空闲']})
        this.dayChartData.rows.push({'类型': '关机', '分钟数': dayTotalMinutes['关机']})
        let totalMiinutes = dayTotalMinutes['作业'] + dayTotalMinutes['空闲'] + dayTotalMinutes['关机']
        this.dayTotalWorkMinutes = dayTotalMinutes['作业'] + '分钟---' + parseFloat(dayTotalMinutes['作业'] / totalMiinutes * 100).toFixed(2) + '%'
        this.dayTotalFreeMinutes = dayTotalMinutes['空闲'] + '分钟---' + parseFloat(dayTotalMinutes['空闲'] / totalMiinutes * 100).toFixed(2) + '%'
        this.dayTotalCloseMinutes = dayTotalMinutes['关机'] + '分钟---' + parseFloat(dayTotalMinutes['关机'] / totalMiinutes * 100).toFixed(2) + '%'
      }
    },
    computed: {}
  }
</script>

<style>
  .image {
    width: 40px;
  }

  .elcard-class {
    width: 250px;
    height: 65px;
  }

  .divRightInfoGb {
    background-color: #E9EEF3;
  }

  .elrow-class, .elrow-class_hover {
    margin-top: 10px;
    cursor: pointer
  }

  .elrow-class:hover, .elrow-class_hover {
    border: 2px solid rgb(28, 116, 209);
  }

  .elcard-class ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: auto;
    margin-top: -10px;
  }

  .elcard-class ul li {
    float: left;

  }

  .elcard-class ul li span {
    display: table;
    font-size: 12px;
  }

  .divRightInfo_contentTopLeft {
    border-right: 3px solid white;
    display: flex;
    justify-content: space-between;
  }

  .ulBtn {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: auto;
  }

  .ulBtn li {
    width: 50px;
    height: 50px;
    text-align: center;
    padding-top: 10px;
    text-align: center;
    float: left;
  }

  .ulBtn li img {
    height: 25px;
  }

  .ulBtn li:hover {
    cursor: pointer
  }

  .ulBtn li p {
    margin-top: 5px;
    font-weight: bold;
  }

  .spanRapInfoDes {
    color: #777666;
  }

  .spanRapInfoVal {
    font-weight: bold;
    margin-right: 20px;
    font-size: 14px;
  }

  .divChartComputer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px
  }

  .divLineComputer {
    /*background-color: red;*/
    width: 49.5%;
    height: 285px;
    font-size: 13px;
    font-weight: bold;
  }

  .divLineComputerChart {
    border: 1px solid gray;
    height: 240px;
    margin: 10px 0;
  }

  .divLineComputerChart .lineInfo {
    margin-top: -10px;
    margin-left: 10px;
  }

</style>
