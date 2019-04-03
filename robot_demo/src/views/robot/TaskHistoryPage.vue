<template>
  <LRStructMaster>

    <div slot="slotLeftTitle">
      <i class="el-icon-tickets"></i>
      <span>任务区</span>
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
      <el-menu
        class="el-menu-demo"
        mode="vertical" theme="light"  >
          <template v-for="item in menuList" >
            <template v-if="item.children&&item.children.length>0">
              <el-submenu :index="item.index">
                <template slot="title">{{ item.title }}</template>
                <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index">
                {{ item.title }}
              </el-menu-item>
            </template>
          </template>
      </el-menu>
    </div>

    <div slot="slotRightTitle">
      <i class="el-icon-service"></i>
      <span>历史版本区</span>
    </div>

    <!--右边内容-->
    <div slot="slotRightInfo">

    </div>
  </LRStructMaster>
</template>


<script>
  import LRStructMaster from '../../components/master/LRStructMaster'

  export default {
    data () {
      return {
        taskName: '',
        menuList: [
          {index: 'home', title: '首页', children: []},
          {index: 'process', title: '流程管理', children: []},
          // {index: 'command', title: '口令管理', children: []},
          // {index: 'machine', title: '机器管理', children: []},
          // {index: 'feedback', title: '用户反馈', children: []},
          {index: 'monitor', title: '资源监控', children: []},
          {
            index: 'task', title: '任务管理', children: [
              {index: 'taskhistory', title: '历史任务', children: []},
              {index: 'taskrecovery', title: '回收策略', children: []},
            ]
          },
          // {
          //   index: 'user', title: '用户权限', children: [
          //     {index: 'usermanage', title: '用户管理', children: []},
          //     {index: 'userrole', title: '角色管理', children: []},
          //   ]
          // }
        ]
      }
    },
    components: {
      LRStructMaster
    },
    created () {

    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    computed: {}
  }
</script>

