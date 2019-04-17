<template>
  <div style="height: 55px;background-color: #1c74d1;overflow: hidden">

<!--    background-color="#151515"-->
    <el-menu
      :default-active="onRoutes"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#151515"
      text-color="#fff"
      active-text-color="#ffd04b" theme="light" unique-opened router>
      <div style="display: inline-flex;">
        <div style="display: flex;align-items: center;color:white;margin:0px 80px 0 80px;">
          <img src="../../assets/logo.png" height="35" />
          <span style="font-weight: bold;font-size: 22px;white-space:nowrap; margin-left: 20px">机器人监管系统</span>
        </div>
        <template v-for="item in menuList">
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
      </div>
    </el-menu>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        menuList: [
          // {index: 'home', title: '首页', children: []},
          {index: 'control', title: '综合监控', children: []},
          // {index: 'process', title: '流程管理', children: []},
          // {index: 'command', title: '口令管理', children: []},
          // {index: 'machine', title: '机器管理', children: []},
          // {index: 'feedback', title: '用户反馈', children: []},
          {index: 'taskmonitor', title: '任务监控', children: []},
          {index: 'monitor', title: '资源监控', children: []},
          {
            index: 'scripthistory', title: '脚本管理', children: [
              // {index: 'scripthistory', title: '历史脚本', children: []},
              // {index: 'scriptrecovery', title: '回收策略', children: []},
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
    methods: {
      handleSelect (key, keyPath) {
        // this.$route.
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path
      }
    }
  }
</script>

<style>
  .title ul>li {
    padding-left: 2px !important;
    padding-right: 2px !important;
  }

  .el-submenu{
    margin: auto 0 auto 5px;
  }
  .el-menu-item{
    margin: auto 0 auto 5px;
  }
  .el-menu.el-menu--horizontal {
     border-bottom: 0;
  }
</style>
