<template>
  <LRStructMaster class="scriptHistory">
    <div slot="slotLeftTitle">
      <i class="el-icon-tickets"></i>
      <span class="spTitle">脚本区</span>
    </div>

    <div slot="slotLeftRefresh">
      <i class="el-icon-refresh"></i>
      <a>刷新</a>
    </div>

    <!--左边菜单内容-->
    <div slot="slotLeftInfo">
      <el-input v-model="taskName" placeholder="搜索" size="small"
                style="width:250px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-menu class="el-menu-demo" style="margin-left: -5px; margin-top: 10px"
               mode="vertical" theme="light" unique-opened @select="menuSelected">
        <template v-for="item in scriptList">
          <template>
            <el-submenu :index="item.index">
              <template slot="title">{{ item.title }}</template>
              <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </div>

    <div slot="slotRightTitle">
      <i class="el-icon-service"></i>
      <span class="spTitle">历史版本区</span>
    </div>

    <!--右边内容-->
    <div slot="slotRightInfo">
      <div class="divRightInfoTop">
        <div class="divRightInfoTopLeft">
          <i class="el-icon-d-arrow-right"></i>
          <p>所属任务：{{ selectedMenuOption.title }}</p>
        </div>
        <el-button size="small" icon="el-icon-delete" style="height: 40px">全部删除</el-button>
      </div>
      <div class="divRightInfoContent" style="height: 90px;">
        <ul>
          <li class="divRightInfoContentTableTitle">最新版本
            <img src="../../assets/taskLine.png" height="15"/></li>
          <li class="divRightInfoContentTableInfo">
            <p>
              <span>保存时间：{{ selectedMenuOption.history[0].commitTime }}</span>
              <span>脚本提交人：{{selectedMenuOption.history[0].commitPeo}}</span>
              <span>存档：
                <el-switch v-model="selectedMenuOption.history[0].isSaved"
                           active-color="#13ce66" inactive-color="#eaecf0"></el-switch>
              </span>
              <span>操作：<i class="el-icon-delete"></i></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="divRightInfoContent" style="height: calc(100vh - 325px );margin-top: 20px">
        <ul>
          <li class="divRightInfoContentTableTitle">历史版本
            <img src="../../assets/taskLine.png" height="15"/></li>
          <li class="divRightInfoContentTableInfo" >
            <el-table
              :data="selectedMenuOption.history" size="small" border
              style="width: 100%;" :height="tblHeight">
              <el-table-column label="序号" width="100">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="commitTime" label="保存时间" show-overflow-tooltip>
              </el-table-column>
              <el-table-column  prop="commitPeo" show-overflow-tooltip label="脚本提交人">
              </el-table-column>
              <el-table-column width="100" label="存档">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isSaved"
                             active-color="#13ce66" inactive-color="#eaecf0"></el-switch>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-delete"></i>
                </template>
              </el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
    </div>
  </LRStructMaster>
</template>


<script>
  import LRStructMaster from '../../components/master/LRStructMaster'

  export default {
    data() {
      return {
        taskName: '',
        scriptList: [
          {
            index: '1',
            title: '文书上网',
            history: [{commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true}],
            children: [
              {
                index: '1-1',
                title: '文书提起0116',
                id: '1',
                history: [{commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: true},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},
                  {commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: false},],
                children: []
              },
              {
                index: '1-2',
                title: '文书提起0115',
                id: '2',
                history: [{commitPeo: '张三',commitTime: '2019-01-04 14:22:43', isSaved: true},
                  {commitPeo: '张三',commitTime: '2019-01-04 14:22:43', isSaved: true},],
                children: []
              },
              {
                index: '1-3',
                title: '文书提起0117',
                id: '3',
                history: [{commitPeo: '李四',commitTime: '2019-01-05 10:23:43', isSaved: true},
                  {commitPeo: '李四',commitTime: '2019-01-05 10:23:43', isSaved: true},],
                children: []
              },
              {
                index: '1-4',
                title: '文书提起0114',
                id: '4',
                history: [{commitPeo: '王五',commitTime: '2019-01-03 14:45:43', isSaved: true,},
                  {commitPeo: '王五',commitTime: '2019-01-03 14:45:43', isSaved: true,}],
                children: []
              },
              {
                index: '1-5',
                title: '文书提起0103',
                id: '5',
                history: [{commitPeo: 'jason',commitTime: '2019-02-03 06:22:43',isSaved: true,},
                  {commitPeo: 'jason',commitTime: '2019-02-03 06:22:43',isSaved: true,}],
                children: []
              },
              {
                index: '1-6',
                title: '文书提起0109',
                id: '6',
                history: [{commitPeo: 'tom',commitTime: '2018-05-03 08:17:43', isSaved: true},
                  {commitPeo: 'tom',commitTime: '2018-05-03 08:17:43', isSaved: true},],
                children: []
              },
            ]
          },
          {
            index: '2', title: '测试用',history: [{ commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true},], children: [
              {
                index: '2-1',
                title: '一定不会报错的流程',
                history: [{ commitPeo: '张三',commitTime: '2019-02-03 14:22:43',isSaved: true,},
                  { commitPeo: '张三',commitTime: '2019-02-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '2-2',
                title: '文书敏捷',
                history: [{ commitPeo: '张三', commitTime: '2019-03-03 14:22:43',isSaved: true,},
                  { commitPeo: '张三', commitTime: '2019-03-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '2-3',
                title: '不会报错的流程',
                history: [{commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: true,},
                  { commitPeo: '张三',commitTime: '2019-01-03 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          },
          {
            index: '3', title: '结案回填', history: [{commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true,},], children: [
              {
                index: '3-1',
                title: '结案回填（案号抓包）0116',
                history: [{commitPeo: 'sam',commitTime: '2019-01-03 14:22:43',isSaved: true,},
                  {commitPeo: 'sam',commitTime: '2019-01-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '3-2',
                title: '结案回填（案号抓包）0115',
                history: [{commitPeo: '张三',commitTime: '2017-01-03 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2017-01-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '3-3',
                title: '结案回填（案号抓包）0117',
                history: [{commitPeo: '张三',commitTime: '2016-01-03 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '3-4',
                title: '结案回填（案号抓包）0114',
                history: [{commitPeo: '张三',commitTime: '2018-01-03 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2018-01-03 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          },
          {
            index: '4', title: '文书上网',history: [{commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true,},], children: [
              {
                index: '4-1',
                title: '文书提起0116',
                history: [{commitPeo: '张三',commitTime: '2016-01-03 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-03 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '4-2',
                title: '文书提起0115',
                history: [{commitPeo: '张三',commitTime: '2016-01-02 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-02 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '4-3',
                title: '文书提起0117',
                history: [{commitPeo: '张三',commitTime: '2016-01-01 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-01 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '4-4',
                title: '文书提起0114',
                history: [{commitPeo: '张三',commitTime: '2016-01-04 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-04 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '4-5',
                title: '文书提起0103',
                history: [{commitPeo: '张三',commitTime: '2016-01-16 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-16 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '4-6',
                title: '文书提起0109',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          },
          {
            index: '5', title: '测试用', history: [{commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true,},], children: [
              {
                index: '5-1',
                title: '一定不会报错的流程',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '5-2',
                title: '文书敏捷',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43', isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43', isSaved: true,},],
                children: []
              },
              {
                index: '5-3',
                title: '不会报错的流程',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          },
          {
            index: '6', title: '结案回填', commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true, children: [
              {
                index: '6-1',
                title: '结案回填（案号抓包）0116',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '6-2',
                title: '结案回填（案号抓包）0115',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '6-3',
                title: '结案回填（案号抓包）0117',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '6-4',
                title: '结案回填（案号抓包）0114',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          }, {
            index: '7', title: '文书上网',  history: [{commitPeo: '张三', commitTime: '2016-01-21 14:22:43', isSaved: true,},], children: [
              {
                index: '7-1',
                title: '文书提起0116',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '7-2',
                title: '文书提起0115',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
              {
                index: '7-3',
                title: '文书提起0117',
                history: [{commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},
                  {commitPeo: '张三',commitTime: '2016-01-21 14:22:43',isSaved: true,},],
                children: []
              },
            ]
          }
        ],
        selectedMenuOption: {},
        tblHeight: document.body.scrollHeight -380
      }
    },
    components: {
      LRStructMaster
    },
    created() {
      this.selectedMenuOption = this.scriptList[0].children[0]
    },
    methods: {
      menuSelected(index, indexPath) {
        for (let index in this.scriptList) {
          if (this.scriptList[index].index == indexPath[0]) {
            for (let childIndex in this.scriptList[index].children) {
              if (this.scriptList[index].children[childIndex].index == indexPath[1]) {
                this.selectedMenuOption = this.scriptList[index].children[childIndex];
                break;
              }
            }
            break;
          }
        }
      }
    },
    computed: {}
  }
</script>

<style>
  .scriptHistory .el-menu {
    border: 0px;
  }

  .scriptHistory .el-table__row {
    height: 80px;
    font-size: 18px;
  }

  .scriptHistory .el-submenu {
    border: 2px solid darkgray;
    margin-top: 5px;
    font-size: 15px;
    background-color: #e9eef3;
  }

  .scriptHistory .el-submenu__title {
    font-size: 15px;
  }

  .scriptHistory .el-submenu ul {
    border-top: 1px solid gray;
    background-color: #eae9f3;
  }

  .scriptHistory .el-submenu li {
    margin: 0;
    font-size: 13px;
  }

  .scriptHistory .el-submenu .el-menu-item {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
  }

  .scriptHistory .divRightInfoTop {
    margin-top: -12px;
    display: flex;
    justify-content: space-between;
  }

  .scriptHistory .divRightInfoTopLeft {
    display: flex;
    justify-content: flex-start;
  }

  .scriptHistory .el-icon-d-arrow-right {
    line-height: 43px;
    margin-right: 10px;
    color: #1c74d1;
    font-weight: bold;
  }

  .scriptHistory .divRightInfoTopLeft p {
    font-size: 13px;
  }

  .scriptHistory .divRightInfoContent {
    background-color: #E9EEF3;
    margin-top: 5px;
    padding-top: 5px;
  }

  .scriptHistory .divRightInfoContent ul {
    list-style: none;
    margin: 0px;
    padding: 5px 0 0 0;
  }

  .scriptHistory .divRightInfoContentTableTitle {
    font-size: 13px;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
    border-left: 2px solid #3a81cc;
    padding-left: 10px;
    color: #3a81cc;
  }

  .scriptHistory .divRightInfoContentTableInfo {
    margin: 10px 20px 0 20px;
    background-color: #ffffff;
    height: 40px;
    justify-content: center;
  }

  .scriptHistory .el-icon-delete {
    color: red;
  }

  .scriptHistory .el-icon-delete:hover {
    cursor: pointer;
  }

  .scriptHistory .divRightInfoContentTableInfo p {
    justify-content: space-between;
    display: flex;
    padding: 12px 10px;
  }

</style>

